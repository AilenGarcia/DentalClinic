package com.example.ClinicaOdontologica.repository;

import com.example.ClinicaOdontologica.model.entity.Odontologo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OdontologoRepository extends JpaRepository<Odontologo, Integer> {
    @Modifying
    @Query(value = "update odontologo o set o.matricula= ?1 where id = ?2", nativeQuery = true)
    void actualizar(@Param("matricula") String matricula, @Param("id") Integer id);

    @Query(value = "select * from odontologo where users_id= ?1", nativeQuery = true)
    Odontologo findByIdUsuario(Integer id);
}
