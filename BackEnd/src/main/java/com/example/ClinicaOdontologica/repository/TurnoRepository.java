package com.example.ClinicaOdontologica.repository;

import com.example.ClinicaOdontologica.model.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Integer> {
    boolean existsByFechaTurnoAndHoraTurnoAndOdontologo_Id(LocalDate fechaTurno, LocalTime horaTurno, Integer odontologoId);
    List<Turno> findByOdontologoId(Integer odontologoId);
    List<Turno> findByPacienteId(Integer pacienteId);
    @Query("SELECT t.horaTurno FROM Turno t WHERE t.fechaTurno = :fecha AND t.odontologo.id = :odontologoId")
    List<LocalTime> findHorasOcupadas(LocalDate fecha, Integer odontologoId);
}
