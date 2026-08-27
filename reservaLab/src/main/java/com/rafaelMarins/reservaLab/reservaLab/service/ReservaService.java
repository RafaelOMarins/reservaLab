package com.rafaelMarins.reservaLab.reservaLab.service;

import com.rafaelMarins.reservaLab.reservaLab.model.Reserva;
import com.rafaelMarins.reservaLab.reservaLab.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

   public List<Reserva> listarTodos() {
       return reservaRepository.findAll();
   }

   public Reserva buscarPorId(Long id) {
       return reservaRepository.findById(id)
               .orElseThrow(() -> new RuntimeException("Não foi encontrado um usuário com esse id: " + id));
   }

    public Reserva salvar(Reserva novaReserva) { /*VER A LÓGICA DESSA VERIFICAÇÃO, VER NÃO REVER E REVISAR PRA ENTENDER MELHOR */
        if (!novaReserva.getHorarioInicio().isBefore(novaReserva.getHorarioFim())) {
            throw new RuntimeException("Horário de início deve ser antes do horário de fim.");
        }

        List<Reserva> reservasDoDia = reservaRepository.findByLaboratorioAndData(
                novaReserva.getLaboratorio(),
                novaReserva.getData()
        );

        for (Reserva existente : reservasDoDia) {
            boolean colide = existente.getHorarioInicio().isBefore(novaReserva.getHorarioFim())
                    && novaReserva.getHorarioInicio().isBefore(existente.getHorarioFim());

            if (colide) {
                throw new RuntimeException("Conflito de horário: já existe uma reserva nesse laboratório nesse período.");
            }
        }

        return reservaRepository.save(novaReserva);
    }

   public void deletar(Long id) {
       reservaRepository.deleteById(id);
   }

}
