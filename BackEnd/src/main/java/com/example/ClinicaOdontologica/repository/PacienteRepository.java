package com.example.ClinicaOdontologica.repository;

import com.example.ClinicaOdontologica.model.entity.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Integer> {

    @Modifying
    @Query(value = "update paciente p set p.domicilio= ?1 where id = ?2", nativeQuery = true)
    void actualizar(@Param("domicilio") String domicilio, @Param("id") Integer id);

    @Query(value = "select * from paciente where nombre= ?1", nativeQuery = true)
    List<Paciente> findByName(String nombre);

    @Query(value = "select * from paciente where users_id= ?1", nativeQuery = true)
    Paciente findByIdUsuario(Integer id);

    @Query("SELECT p FROM Paciente p WHERE p.users.id = :userId")
    Optional<Paciente> findByUserId(@Param("userId") Integer userId);

}
