package com.rafaelMarins.reservaLab.reservaLab.service;


import com.rafaelMarins.reservaLab.reservaLab.model.Usuario;
import com.rafaelMarins.reservaLab.reservaLab.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;


    public Usuario logar(String email, String senha)  {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));
        System.out.println(senha);
        System.out.println(usuario.getSenha());
        if (!usuario.getSenha().equals(senha)) {
            throw new RuntimeException("Email ou senha inválidos");
        }
        String token = UUID.randomUUID().toString();
        usuario.setToken(token);
        usuarioRepository.save(usuario);
        return usuario;
    }

    public Usuario registrar(String nome, String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Registro inválido"));
        return usuario;
    }

    public Usuario validarToken(String token) {
        return usuarioRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido ou expirado"));
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com esse id: " + id));
    }

    public Usuario salvar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void deletar(Long id) {

        usuarioRepository.deleteById(id);
    }
}
