package com.rafaelMarins.reservaLab.reservaLab.repository;

import com.rafaelMarins.reservaLab.reservaLab.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
