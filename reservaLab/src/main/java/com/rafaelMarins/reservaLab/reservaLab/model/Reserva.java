package com.rafaelMarins.reservaLab.reservaLab.model;
import jakarta.persistence.*;
import java.time.*;

@Entity
@Table(name = "reserva")

public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private boolean disponivel;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private LocalTime horario_inicial;

    @Column(nullable = false)
    private LocalTime horario_fim;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "laboratorio_id")
    private Laboratorio laboratorio;
}
