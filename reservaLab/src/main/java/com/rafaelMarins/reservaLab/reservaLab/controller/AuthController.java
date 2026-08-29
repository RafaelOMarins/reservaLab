package com.rafaelMarins.reservaLab.reservaLab.controller;

import com.rafaelMarins.reservaLab.reservaLab.model.LoginRequest;
import com.rafaelMarins.reservaLab.reservaLab.model.Usuario;
import com.rafaelMarins.reservaLab.reservaLab.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public Usuario logar(@RequestBody LoginRequest loginRequest) {
        return usuarioService.logar(loginRequest.getEmail(), loginRequest.getSenha());
    }

    @PostMapping("/registro")
    public Usuario registrar(@RequestBody Usuario usuario) {
        return usuarioService.salvar(usuario);
    }

    @GetMapping("/me")
    public Usuario me(@RequestHeader("Authorization") String token) {
        return usuarioService.validarToken(token);
    }
}