package com.rafaelMarins.reservaLab.reservaLab.controller;


import com.rafaelMarins.reservaLab.reservaLab.model.Laboratorio;
import com.rafaelMarins.reservaLab.reservaLab.service.LaboratorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("laboratorio")
public class LaboratorioController {

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
    public Laboratorio criar(@RequestBody Laboratorio laboratorio) {
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
