package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.model.entity.Turno;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.repository.TurnoRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class TurnoService {
    private TurnoRepository turnoRepository;

    public void eliminarTurno(Integer id) throws NotFoundException {
        if(buscar(id) == null) throw new NotFoundException("No se puede eliminar un turno inexistente");
        turnoRepository.deleteById(id);}

    public Turno buscar(Integer id)throws NotFoundException{
        return turnoRepository.findById(id).orElseThrow(() -> new NotFoundException("turno no encontrado"));}

    public void agregarTurno(Turno turno) throws ExistenteException, BadRequestException {
        if(Objects.isNull(turno.getFechaTurno())) throw new BadRequestException("El campo fecha esta vacio");
        if(turnoRepository.exists(Example.of(turno))) throw new ExistenteException("El turno ya esta registrado");
        turnoRepository.save(turno);}

    public List<Turno> listar(){return turnoRepository.findAll();}

    public List<Turno> buscarPorOdontologo(Integer id) throws NotFoundException{
        List<Turno> turnos =  turnoRepository.findByOdontologo(id);
        if (turnos.isEmpty()) {
            throw new NotFoundException("No hay turnos para el paciente con ID: " + id);
        }
        return turnos;
    }

    public List<Turno> buscarPorPaciente(Integer id) throws NotFoundException {
        List<Turno> turnos = turnoRepository.findByPaciente(id);
        if (turnos.isEmpty()) {
            throw new NotFoundException("No hay turnos para el paciente con ID: " + id);
        }
        return turnos;
    }
}
