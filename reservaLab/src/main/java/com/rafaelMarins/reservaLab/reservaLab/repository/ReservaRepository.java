package com.rafaelMarins.reservaLab.reservaLab.repository;

import com.rafaelMarins.reservaLab.reservaLab.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
}
