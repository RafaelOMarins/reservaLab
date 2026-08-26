package com.rafaelMarins.reservaLab.reservaLab.repository;

import com.rafaelMarins.reservaLab.reservaLab.model.Laboratorio;
import com.rafaelMarins.reservaLab.reservaLab.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    List<Reserva> findByLaboratorioAndData(Laboratorio laboratorio, LocalDate data);
}