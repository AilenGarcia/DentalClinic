package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.model.entity.Paciente;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.servicios.PacienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Pacientes", description = "Operaciones relacionadas con los pacientes")
@RestController
@AllArgsConstructor
@RequestMapping(value = "/api/pacientes")
public class PacienteController {
    private PacienteService pacienteService;

    /**
     * Función para listar pacientes.
     * @return Respuesta HTTP con una lista de turnos.
     */
    @Operation(summary = "Listar pacientes", description = "Lista los pacientes de la base de datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Pacientes listados exitosamente"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAuthority('ROLE_ODONTOLOGOS')")
    @GetMapping("/list")
    public ResponseEntity<List<Paciente>> listar() throws NotFoundException{
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("Usuario: " + auth.getName());
        System.out.println("Authorities: " + auth.getAuthorities());
        return new ResponseEntity<>(pacienteService.listar(),null,HttpStatus.OK);
    }

    /**
     * Función para obtener un paciente por su ID.
     * @param id del paciente a buscar.
     * @return Respuesta HTTP con el paciente encontrado.
     * @throws NotFoundException Si no se encuentra el paciente con el ID proporcionado.
     */
    @Operation(summary = "Obtener un paciente por ID", description = "Recibe un ID y devuelve el paciente correspondiente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el paciente correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el paciente con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @GetMapping("/find/{id}")
    public ResponseEntity<Paciente> buscar(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(pacienteService.buscar(id), null, HttpStatus.OK);
    }

    /**
     * Función para actualizar un paciente.
     * @param paciente con los datos actualizados del paciente.
     * @return Respuesta HTTP con un mensaje de éxito.
     * @throws NotFoundException Si no se encuentra el restaurante con el ID proporcionado.
     */
    @Operation(summary = "Actualizar paciente", description = "Recibe un paciente y lo actualiza en la base de datos. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Actualiza el paciente correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el paciente con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAuthority('ROLE_PACIENTES)")
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody @Valid Paciente paciente) throws NotFoundException {
        pacienteService.update(paciente);
        return ResponseEntity.ok("El paciente se actualizo exitosamente");
    }

}
