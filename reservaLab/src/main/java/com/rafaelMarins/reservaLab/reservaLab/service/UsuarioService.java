package com.rafaelMarins.reservaLab.reservaLab.service;


import com.rafaelMarins.reservaLab.reservaLab.model.Usuario;
import com.rafaelMarins.reservaLab.reservaLab.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> listarTodos() {
        return UsuarioRepository.findAll();
    }

    public Usuario buscarPorId(Long id) {
        return UsuarioRepository.findById()
                .orElseThrow() -> new RuntimeException("Usuário não encontrado com id: " + id);
    }

    public Usuario salvar(Usuario usuario) {
        return UsuarioRepository.save(Usuario);
    }

    public void deletar(Long id) {
        UsuarioRepository.deleteById(id);
    }
}
