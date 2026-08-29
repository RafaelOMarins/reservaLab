package com.rafaelMarins.reservaLab.reservaLab.controller;

import com.rafaelMarins.reservaLab.reservaLab.model.Usuario;
import com.rafaelMarins.reservaLab.reservaLab.repository.UsuarioRepository;
import com.rafaelMarins.reservaLab.reservaLab.service.UsuarioService;
import org.antlr.v4.runtime.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    @GetMapping
    public List<Usuario> listarTodos(@RequestHeader("Authorization")String token) {
        Usuario usuario = usuarioService.validarToken(token);
        if (usuario.getRole() != Usuario.Role.ADMIN) {
            throw new RuntimeException("Acesso negado!");
        }
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable Long id,@RequestHeader("Authorization")String token) {
        Usuario usuario = usuarioService.validarToken(token);
        if(usuario.getRole() != Usuario.Role.ADMIN) {
            throw new RuntimeException("Acesso negado!");
        }
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    public Usuario salvar(@RequestBody Usuario usuario, @RequestHeader("Authorization")String token) {
        usuarioService.validarToken(token);
        if (usuario.getRole() != Usuario.Role.ADMIN) {
            throw new RuntimeException("Acesso negado!");
        }
        return usuarioService.salvar(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id, @RequestHeader("Authorization")String token) {
        Usuario usuario = usuarioService.validarToken(token);
        if (usuario.getRole() != Usuario.Role.ADMIN) {
            throw new RuntimeException("acesso negado");
        }
        usuarioService.deletar(id);

    }



}
