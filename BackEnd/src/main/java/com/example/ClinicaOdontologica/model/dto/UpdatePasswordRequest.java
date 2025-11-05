package com.example.ClinicaOdontologica.model.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UpdatePasswordRequest (
        @NotBlank(message = "El email del usuario es obligatorio")
        String email,
        @NotBlank(message = "La contraseña actual no puede estar vacía")
        String oldPassword,
        @Pattern(
                regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,72}$",
                message = "La contraseña debe tener 8-72 caracteres, con al menos una mayúscula, una minúscula, un número y un caracter especial"
        )
        @NotNull(message = "El contraseña del usuario es obligatoria")
        String newPassword
){ }
