package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.model.entity.Paciente;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.repository.PacienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PacienteService {

    private PacienteRepository pacienteRepository;

    public Paciente buscar(Integer id) throws NotFoundException {
        return pacienteRepository.findById(id).orElseThrow(() -> new NotFoundException("Paciente no encontrado"));}
    public List<Paciente> listar(){return pacienteRepository.findAll();}
    public void update(Paciente paciente) throws NotFoundException {
        if (!pacienteRepository.findById(paciente.getId()).isPresent()) throw new NotFoundException("Paciente no encontrado");
        pacienteRepository.save(paciente);
    }
}
