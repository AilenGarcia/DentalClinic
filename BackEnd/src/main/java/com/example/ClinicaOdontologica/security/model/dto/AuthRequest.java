package com.example.ClinicaOdontologica.security.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthRequest(
        @NotBlank(message = "El email es obligatorio")
        @Email(message = "Email inválido")
        @JsonProperty("username")
        String username,
        @NotBlank(message = "La contraseña es obligatoria")
        @JsonProperty("password")  //
        String password) {
}