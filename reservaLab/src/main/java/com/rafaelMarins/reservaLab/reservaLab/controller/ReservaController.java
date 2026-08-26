package com.rafaelMarins.reservaLab.reservaLab.controller;

import com.rafaelMarins.reservaLab.reservaLab.model.Reserva;
import com.rafaelMarins.reservaLab.reservaLab.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public List<Reserva> listarTodos() {
        return reservaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Reserva buscarPorId(@PathVariable Long id) {
        return reservaService.buscarPorId(id);
    }

    @PostMapping
    public Reserva salvar(@RequestBody Reserva novaReserva) {
        System.out.println(novaReserva.getHorarioInicio());
        return reservaService.salvar(novaReserva);
    }

    @DeleteMapping("/{id}")
    public void deletar(Long id) {
        reservaService.deletar(id);
    }

}
