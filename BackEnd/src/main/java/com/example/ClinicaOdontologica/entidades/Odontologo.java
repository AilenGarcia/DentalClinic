package com.example.ClinicaOdontologica.entidades;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
public class Odontologo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    private String nombre;
    private String apellido;
    private String matricula;
    private Rol rol;

    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "odontologo_id")
    @JsonBackReference
    private Set<Turno> turnos = new HashSet<>();

    @Override
    public String toString(){
        return this.id + " " + this.nombre + " " + this.apellido + " : " + this.matricula;
    }

}
