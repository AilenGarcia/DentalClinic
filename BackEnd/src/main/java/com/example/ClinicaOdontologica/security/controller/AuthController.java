package com.example.ClinicaOdontologica.security.controller;

import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.model.entity.Users;
import com.example.ClinicaOdontologica.security.UserDetailsImpl;
import com.example.ClinicaOdontologica.security.model.dto.AuthRequest;
import com.example.ClinicaOdontologica.security.utils.JwtUtil;
import com.example.ClinicaOdontologica.security.UserDetailServiceImpl;
import com.example.ClinicaOdontologica.security.model.dto.AuthResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
@Tag(name = "Usuarios", description = "Operaciones relacionadas a la autenticación y autorización de usuarios")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserDetailServiceImpl userDetailsService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    /**
     * Endpoint para autenticar un usuario y generar un token JWT.
     * @return Un objeto AuthenticationResponse que contiene el token JWT.
     */
    @Operation(summary = "Autenticar usuario", description = "Permite a un usuario autenticarse y obtener un token JWT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Token JWT generado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Credenciales inválidas"),
            @ApiResponse(responseCode = "500", description = "Error interno del servidor")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody @Valid AuthRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse) throws NotFoundException {

        // Autenticar
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        // Cargar UserDetails
        UserDetails userDetails = userDetailsService.loadUserByUsername(request.username());

        // Cast a UserDetailsImpl
        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) userDetails;

        // Obtener el usuario completo desde UserDetailsImpl
        Users usuario = userDetailsImpl.getUser();

        // Generar access token
        String accessToken = JwtUtil.createToken(
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol().getNombre()
        );

        return ResponseEntity.ok(new AuthResponse(
                accessToken,
                usuario.getId(),
                usuario.getEmail(),
                usuario.getRol().getNombre()
        ));
    }
}