package com.example.ClinicaOdontologica.repository;

import com.example.ClinicaOdontologica.entidades.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UsersRepository extends JpaRepository<Users, Integer> {
    @Query(value= "select * from users where email=?1", nativeQuery = true)
    Users findByEmail (@Param("email") String email);
}

