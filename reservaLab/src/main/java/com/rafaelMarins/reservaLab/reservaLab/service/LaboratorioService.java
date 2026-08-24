package com.rafaelMarins.reservaLab.reservaLab.service;

import com.rafaelMarins.reservaLab.reservaLab.model.Laboratorio;
import com.rafaelMarins.reservaLab.reservaLab.repository.LaboratorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LaboratorioService {
    @Autowired
    private LaboratorioRepository laboratorioRepository;

    public List<Laboratorio> listarTodos() {
        return laboratorioRepository.findAll();
    }

    public Laboratorio buscarPorId(Long id) {
        return laboratorioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Laboratório não encontrado com o id: " + id));
    }

    public Laboratorio salvar(Laboratorio laboratorio) {
        return  laboratorioRepository.save(laboratorio);
    }

    public void deletar(Long id) {
        laboratorioRepository.deleteById(id);
    }
}
