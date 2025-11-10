package com.example.ClinicaOdontologica.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record OdontologoDTO(
        Integer id,

        @NotBlank(message = "El teléfono del odontólogo es obligatorio")
        String telefono,

        @Size(message = "La matrícula debe tener entre 6 y 20 caracteres", min = 6, max = 20)
        @NotBlank(message = "La matrícula es obligatoria")
        String matricula,

        @Size(message = "La descripción debe tener máximo 255 caracteres", max = 255)
        @NotBlank(message = "La descripción es obligatoria")
        String descripcion,

        UserUpdateDTO users
) {
}
