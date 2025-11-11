package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.model.dto.OdontologoDTO;
import com.example.ClinicaOdontologica.model.entity.Odontologo;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.servicios.OdontologoService;
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
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Odontologos", description = "Operaciones relacionadas con los odontologos")
@RestController
@AllArgsConstructor
@RequestMapping(value = "/api/odontologos")
public class OdontologoController {
    private OdontologoService odontologoService;

    /**
     * Función para listar odontologos.
     * @return Respuesta HTTP con una lista de odontologos.
     */
    @Operation(summary = "Listar odontologos", description = "Lista los odontologos de la base de datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Odontologos listados exitosamente"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAuthority('ROLE_PACIENTES')")
    @GetMapping("/list")
    public ResponseEntity<List<Odontologo>> listar() {
        if(odontologoService.listar().isEmpty()) return new ResponseEntity<>(null,null,HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(odontologoService.listar(),null,HttpStatus.OK);
    }

    /**
     * Función para obtener un odontologo por su ID.
     * @param id del odontologo a buscar.
     * @return Respuesta HTTP con el odontologo encontrado.
     * @throws NotFoundException Si no se encuentra el odontologo con el ID proporcionado.
     */
    @Operation(summary = "Obtener un odontologo por ID", description = "Recibe un ID y devuelve el odontologo correspondiente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el odontologo correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el odontologo con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @GetMapping("/findBy/{id}")
    public ResponseEntity<Odontologo> buscar(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(odontologoService.buscar(id), null, HttpStatus.OK);
    }

    /**
     * Función para actualizar un odontologo.
     * @param odontologo con los datos actualizados del odontologo.
     * @return Respuesta HTTP con un mensaje de éxito.
     * @throws NotFoundException Si no se encuentra el odontologo con el ID proporcionado.
     */
    @Operation(summary = "Actualizar odontologo", description = "Recibe un odontologo y lo actualiza en la base de datos. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Actualiza el odontologo correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el odontologo con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAuthority('ROLE_ODONTOLOGOS')")
    @PutMapping("/update")
    public ResponseEntity<Map<String, String>> update(@RequestBody @Valid OdontologoDTO odontologo) throws NotFoundException {
        odontologoService.update(odontologo);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Datos del odontologo actualizados");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Función para eliminar un odontologo.
     * @param id del odontologo a eliminar.
     * @return Respuesta HTTP con un mensaje de éxito.
     * @throws NotFoundException Si no se encuentra el odontologo con el ID proporcionado.
     */
    @Operation(summary = "Eliminar un odontologo", description = "Recibe un id de odontologo, verifica que no tiene turnos" +
            "pendientes y lo elimina en la base de datos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Elimina el odontologo correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el odontologo con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAuthority('ROLE_ODONTOLOGOS')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Integer id) throws NotFoundException {
        odontologoService.delete(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Odontologo eliminado con exito");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
