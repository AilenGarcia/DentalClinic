package com.example.ClinicaOdontologica.entidades;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    private String name;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Rol rol;

    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    @JsonBackReference
    private Set<Turno> turnos = new HashSet<>();


    public Users(String name, String email, String password, Rol rol) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.rol = rol;
    }
    public Users(){};

}
