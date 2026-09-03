package com.rafaelMarins.reservaLab.reservaLab.security;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;


@Component
public class jwUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("{jwt.expiration}")
    private long expiration;

    byte[] keyBytes = Base64.getDecoder().decode(secret);

    Key hmacKey = new SecretKeySpec(keyBytes, "HmacSHA256");

    String jwt = Jwts.builder().subject("user123").signWith(hmacKey).compact();
}
