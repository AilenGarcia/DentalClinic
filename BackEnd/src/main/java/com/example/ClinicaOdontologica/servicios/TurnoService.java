package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.model.entity.Turno;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.repository.TurnoRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
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

        if (turno.getFechaTurno() == null)
            throw new BadRequestException("El campo fecha está vacío");

        if (turno.getHoraTurno() == null)
            throw new BadRequestException("El campo hora está vacío");

        boolean existe = turnoRepository.existsByFechaTurnoAndHoraTurnoAndOdontologo_Id(
                turno.getFechaTurno(),
                turno.getHoraTurno(),
                turno.getOdontologo().getId()
        );

        if (existe) {
            throw new ExistenteException("El odontólogo ya tiene un turno asignado en ese horario");
        }

        turnoRepository.save(turno);
    }


    public List<Turno> listar(){return turnoRepository.findAll();}

    public List<Turno> buscarPorOdontologo(Integer id) {
        List<Turno> turnos =  turnoRepository.findByOdontologoId(id);
        return turnos;
    }

    public List<Turno> buscarPorPaciente(Integer id)  {
        List<Turno> turnos = turnoRepository.findByPacienteId(id);
        return turnos;
    }

    public List<LocalTime> obtenerHorasOcupadas(LocalDate fecha, Integer odontologoId) {
        return turnoRepository.findHorasOcupadas(fecha, odontologoId);
    }

}
