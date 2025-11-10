package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.model.entity.Turno;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.servicios.TurnoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Turnos", description = "Operaciones relacionadas con los turnos")
@RestController
@AllArgsConstructor
@RequestMapping(value = "/api/turnos")
public class TurnoController {
    private TurnoService turnoService;

    /**
     * Función para listar turnos.
     * @return Respuesta HTTP con una lista de turnos.
     */
    @Operation(summary = "Listar turnos", description = "Lista los turnos de la base de datos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Turnos listados exitosamente"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @GetMapping("/list")
    public ResponseEntity<List<Turno>> listar() {
        if(turnoService.listar().isEmpty()) return new ResponseEntity<>(null,null, HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(turnoService.listar(),null,HttpStatus.OK);
    }

    /**
     * Función para obtener un turno por su ID.
     * @param id del turno a buscar.
     * @return Respuesta HTTP con el turno encontrado.
     * @throws NotFoundException Si no se encuentra el turno con el ID proporcionado.
     */
    @Operation(summary = "Obtener un turno por ID", description = "Recibe un ID y devuelve el turno correspondiente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el turno correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el turno con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @GetMapping("/find/{id}")
    public ResponseEntity<Turno> buscar(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(turnoService.buscar(id), null, HttpStatus.OK);
    }

    /**
     * Función para crear turno.
     * @return Respuesta HTTP con un mensaje de éxito.
     */
    @Operation(summary = "Crear un turno nuevo", description = "Recibe un turno y lo guarda en la base de datos. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Turno creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> agregar(@RequestBody Turno turno) throws ExistenteException, BadRequestException {
        turnoService.agregarTurno(turno);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Turno creado con exito");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Función para eliminar un turno.
     * @param id del turno a eliminar.
     * @return Respuesta HTTP con un mensaje de éxito.
     * @throws NotFoundException Si no se encuentra el restaurante con el ID proporcionado.
     */
    @Operation(summary = "Eliminar un turno", description = "Recibe un id de turno y lo elimina en la base de datos.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Elimina el turno correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el turno con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Integer id) throws NotFoundException {
        turnoService.eliminarTurno(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Turno eliminado con exito");
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Función para obtener una lista de turnos por el id del odontologo.
     * @param id del odontologo.
     * @return Respuesta HTTP con los turnos encontrados.
     * @throws NotFoundException Si no se encuentra el odontologo con el ID proporcionado.
     */
    @Operation(summary = "Obtener una lista de turnos por ID odontologo", description = "Recibe un ID y devuelve la lista de turnos correspondientes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve una lista de turnos correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el odontologo con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @GetMapping("/findByOd/{id}")
    public ResponseEntity<List<Turno>> buscarPorOdontologo(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(turnoService.buscarPorOdontologo(id), null, HttpStatus.OK);
    }

    /**
     * Función para obtener una lista de turnos por el id del paciente.
     * @param id del paciente.
     * @return Respuesta HTTP con los turnos encontrados.
     * @throws NotFoundException Si no se encuentra el paciente con el ID proporcionado.
     */
    @Operation(summary = "Obtener una lista de turnos por ID paciente", description = "Recibe un ID y devuelve la lista de turnos correspondientes")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve una lista de turnos correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el paciente con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasAnyAuthority('ROLE_ODONTOLOGOS', 'ROLE_PACIENTES')")
    @GetMapping("/findByPa/{id}")
    public ResponseEntity<List<Turno>> buscarPorPaciente(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(turnoService.buscarPorPaciente(id), null, HttpStatus.OK);
    }


}
