package com.example.ClinicaOdontologica.repository;

import com.example.ClinicaOdontologica.entidades.Turno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Integer> {
    @Query(value = "select * from turnos where odontologo_id= ?1", nativeQuery = true)
    List<Turno> findByOdontologo(Integer id);

    @Query(value = "select * from turnos where paciente_id= ?1", nativeQuery = true)
    List<Turno> findByPaciente(Integer id);
}
