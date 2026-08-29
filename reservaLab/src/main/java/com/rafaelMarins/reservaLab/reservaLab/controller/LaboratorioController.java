package com.rafaelMarins.reservaLab.reservaLab.controller;


import com.rafaelMarins.reservaLab.reservaLab.model.Laboratorio;
import com.rafaelMarins.reservaLab.reservaLab.model.Usuario;
import com.rafaelMarins.reservaLab.reservaLab.service.LaboratorioService;
import com.rafaelMarins.reservaLab.reservaLab.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("laboratorios")
public class LaboratorioController {

    UsuarioService usuarioService;
    Usuario usuario;

    @Autowired
    private LaboratorioService laboratorioService;

    @GetMapping
    public List<Laboratorio> listarTodos() {
        return laboratorioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Laboratorio buscarPorId(@PathVariable Long id) {
        return laboratorioService.buscarPorId(id);
    }

    @PostMapping
    public Laboratorio criar(@RequestBody Laboratorio laboratorio, @RequestHeader("Authorization")String token) {
        usuarioService.validarToken(token);
        if (usuario.getRole() != Usuario.Role.ADMIN ) {
            throw new RuntimeException("Acesso negado!");
        }
        return laboratorioService.salvar(laboratorio);
    }

    @PutMapping("/{id}")
    public Laboratorio atualizar(@PathVariable Long id, @RequestBody Laboratorio laboratorioAtualizado) {
        laboratorioAtualizado.setId(id);
        return laboratorioService.salvar(laboratorioAtualizado);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        laboratorioService.deletar(id);
    }


}
