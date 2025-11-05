package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.model.dto.UpdatePasswordRequest;
import com.example.ClinicaOdontologica.model.dto.Userdto;
import com.example.ClinicaOdontologica.model.entity.Users;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.servicios.UsersService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Usuarios", description = "Operaciones relacionadas con los usuarios")
@RestController
@AllArgsConstructor
@RequestMapping(value = "/api/users")
public class UsersController {
    private UsersService usersService;

    /**
     * Función para crear usuario.
     * @return Respuesta HTTP con un mensaje de éxito.
     * @throws NotFoundException Si no se encuentra el rol proporcionado.
     * @throws ExistenteException Si se encuentra el usuario proporcionado.
     */
    @Operation(summary = "Crear un usuario nuevo", description = "Recibe un usuario y lo guarda en la base de datos. " +
            "**Se pueden crear 2 tipos de usuarios: paciente o odontologo**")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Usuario creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Userdto users) throws ExistenteException, NotFoundException {
        usersService.saveUser(users);
        return new ResponseEntity<>("saved users",null, HttpStatus.CREATED);
    }

    /**
     * Función para obtener un usuario por su email.
     * @param email del usuario a buscar.
     * @return Respuesta HTTP con el DTO del restaurante encontrado.
     * @throws NotFoundException Si no se encuentra el usuario con el email proporcionado.
     */
    @Operation(summary = "Obtener un usuario por email", description = "Recibe un email y devuelve el usuario correspondiente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",description = "Devuelve el usuario correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el usuario con el email proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) throws NotFoundException {
        return ResponseEntity.ok(usersService.findByEmail(email));
    }

    /**
     * Función para actualizar contraseña.
     * @return Respuesta HTTP con un mensaje de éxito.
     * @throws NotFoundException Si no se encuentra el usuario con el email proporcionado.
     */
    @Operation(summary = "Actualizar contraseña", description = "Recibe contraseña vieja, contraseña nueva y email " +
            "y lo guarda en la base de datos. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201",description = "Contraseña actualizada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "404", description = "No se encontró el usuario con el email proporcionado"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest users) throws NotFoundException {
        usersService.updatePassword(users);
        return new ResponseEntity<>("Password updated",null, HttpStatus.OK);
    }

    /**
     * Función para eliminar usuario por su id.
     * @param id del usuario a eliminar.
     * @return Respuesta HTTP con un mensaje de éxito.
     * @throws NotFoundException Si no se encuentra el usuario con el ID proporcionado.
     */
    @Operation(summary = "Eliminar usuario por ID", description = "Recibe un id de un usuario y lo borra. ")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Elimina el usuario correspondiente"),
            @ApiResponse(responseCode = "404", description = "No se encontró el usuario con el ID proporcionado"),
            @ApiResponse(responseCode = "400", description = "Error en los datos proporcionados"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @SecurityRequirement(name = "bearerAuth")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) throws NotFoundException{
        usersService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
