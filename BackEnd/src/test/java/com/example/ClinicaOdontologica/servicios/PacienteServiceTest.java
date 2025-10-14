package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.entidades.Paciente;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.repository.OdontologoRepository;
import com.example.ClinicaOdontologica.repository.PacienteRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class PacienteServiceTest {
    @DisplayName("Probamos la excepcion del metodo buscar")
    @Test
    public void buscarPaciente(){
        var repository = mock(PacienteRepository.class);
        when(repository.findById(anyInt())).thenReturn(Optional.empty());
        var service = new PacienteService(repository);

        assertThrows(NotFoundException.class, ()-> service.buscar(5));
    }
}