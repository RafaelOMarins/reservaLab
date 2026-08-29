package com.rafaelMarins.reservaLab.reservaLab.controller;

import com.rafaelMarins.reservaLab.reservaLab.model.Reserva;
import com.rafaelMarins.reservaLab.reservaLab.model.Usuario;
import com.rafaelMarins.reservaLab.reservaLab.service.ReservaService;
import com.rafaelMarins.reservaLab.reservaLab.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaController {
    @Autowired
    private ReservaService reservaService;
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Reserva> listarTodos() {
        return reservaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Reserva buscarPorId(@PathVariable Long id) {
        return reservaService.buscarPorId(id);
    }

    @PostMapping
    public Reserva salvar(@RequestBody Reserva novaReserva, @RequestHeader("Authorization") String token) {
        Usuario professor = usuarioService.validarToken(token);
        novaReserva.setProfessor(professor);
        return reservaService.salvar(novaReserva);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id, @RequestHeader("Authorization")String token) {
        Usuario usuario = usuarioService.validarToken(token);
        if (usuario.getRole() != Usuario.Role.ADMIN) {
            throw new RuntimeException("Acesso negado!");
        }
        reservaService.deletar(id);
    }

}
