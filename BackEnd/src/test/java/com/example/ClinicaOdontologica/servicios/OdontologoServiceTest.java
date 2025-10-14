package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.repository.OdontologoRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


public class OdontologoServiceTest {

    @DisplayName("Probamos la excepcion del metodo buscar")
    @Test
    public void buscarOdontologo(){
        var repository = mock(OdontologoRepository.class);
        when(repository.findById(anyInt())).thenReturn(Optional.empty());
        var service = new OdontologoService(repository);

        assertThrows(NotFoundException.class, ()-> service.buscar(5));
    }

}