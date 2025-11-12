package com.example.ClinicaOdontologica.repository;

import com.example.ClinicaOdontologica.model.entity.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Integer> {

    List<Turno> findByOdontologoId(Integer odontologoId);
    List<Turno> findByPacienteId(Integer pacienteId);
}
