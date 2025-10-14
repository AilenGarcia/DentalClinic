package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.entidades.Odontologo;
import com.example.ClinicaOdontologica.entidades.Paciente;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.repository.PacienteRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class PacienteService {

    private PacienteRepository pacienteRepository;
    public void guardarPaciente(Paciente paciente) throws ExistenteException, BadRequestException {
        if(Objects.isNull(paciente.getDni())) throw new BadRequestException("El campo dni esta vacio");
        if(pacienteRepository.exists(Example.of(paciente))) throw new ExistenteException("El paciente ya esta registrado");
        pacienteRepository.save(paciente);}
    public void eliminarPaciente(Integer id) throws NotFoundException {
        if(buscar(id) == null) throw new NotFoundException("No se puede eliminar un paciente inexistente");
        pacienteRepository.deleteById(id);}
    public void modificar(String domicilio, Integer id) throws NotFoundException {
        if(buscar(id) == null) throw new NotFoundException("No se puede modificar un paciente inexistente");
        pacienteRepository.actualizar(domicilio, id); }
    public Paciente buscar(Integer id) throws NotFoundException {
        return pacienteRepository.findById(id).orElseThrow(() -> new NotFoundException("Paciente no encontrado"));}
    public List<Paciente> findByName(String nombre){
        return pacienteRepository.findByName(nombre);
    }
    public List<Paciente> listar(){return pacienteRepository.findAll();}
}
