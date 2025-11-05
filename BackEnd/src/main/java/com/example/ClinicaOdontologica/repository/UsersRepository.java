package com.example.ClinicaOdontologica.repository;

import com.example.ClinicaOdontologica.model.entity.Rol;
import com.example.ClinicaOdontologica.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    @Query(value= "select * from users where email=?1", nativeQuery = true)
    Users findByEmail (@Param("email") String email);

    Boolean existsUsersByEmail (@Param("email") String email);

    @Query("SELECT u FROM Users u JOIN FETCH u.rol WHERE u.email = :email")
    Optional<Users> findByEmailWithRol(@Param("email") String email);
}

