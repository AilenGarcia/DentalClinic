package com.example.ClinicaOdontologica.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdateDTO(
        Integer id,

        @Size(message = "El nombre del usuario debe tener máximo 50 caracteres", max = 50)
        @NotBlank(message = "El nombre del usuario es obligatorio")
        String nombre,

        @Size(message = "El apellido del usuario debe tener máximo 50 caracteres", max = 50)
        @NotBlank(message = "El apellido del usuario es obligatorio")
        String apellido,

        @Email(message = "Debe proporcionar un correo electrónico válido")
        @Size(message = "El email debe tener máximo 100 caracteres", max = 100)
        @NotBlank(message = "El email del usuario es obligatorio")
        String email
) {
}
