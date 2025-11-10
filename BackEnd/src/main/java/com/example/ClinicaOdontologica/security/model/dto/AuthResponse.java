package com.example.ClinicaOdontologica.security.model.dto;

public record AuthResponse(
        String accessToken,
        Integer userId,
        String email,
        String role) {}