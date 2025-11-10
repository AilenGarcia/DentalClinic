package com.example.ClinicaOdontologica.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record PacienteDTO(
        Integer id,

        @NotBlank(message = "El teléfono es obligatorio")
        String telefono,

        @Size(message = "La dni debe tener entre 8 y 10 caracteres", min = 6, max = 10)
        @NotBlank(message = "La dni es obligatorio")
        String dni,

        @Size(message = "El domicilio debe tener máximo 100 caracteres", max = 100)
        @NotBlank(message = "El domicilio es obligatorio")
        String domicilio,

        UserUpdateDTO users
) {

}
