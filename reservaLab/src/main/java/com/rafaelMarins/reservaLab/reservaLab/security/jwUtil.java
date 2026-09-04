package com.rafaelMarins.reservaLab.reservaLab.security;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.sql.Date;
import java.util.Base64;
import io.jsonwebtoken.Claims;


@Component
public class jwUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("{jwt.expiration}")
    private long expiration;

    byte[] keyBytes = Base64.getDecoder().decode(secret);

    Key hmacKey = new SecretKeySpec(keyBytes, "HmacSHA256");

    String jwt = Jwts.builder().subject("email").signWith(hmacKey).compact();

    public String gerarToken(String email) {
        Date agora = new Date();
        Date expiracao = new Date(System.currentTimeMillis() + expiration);

        return Jwts.builder().subject(email).issuedAt(agora).expiration(expiracao).signWith(hmacKey).compact();
    }

    public String extrairEmail(String jwt) {
        Claims claims = Jwts.parser().verifyWith(hmacKey).build().parseSignedClaims(jwt).getPayload();
        return claims.getSubject();
    }

}
