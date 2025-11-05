package com.example.ClinicaOdontologica.entidades;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Paciente {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;
    private String telefono;
    private String domicilio;
    private String dni;
    private Date fechaDeAlta;

    @OneToMany( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    @JsonBackReference
    private Set<Turno> turnos = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "users_id")
    private Users users;
}
