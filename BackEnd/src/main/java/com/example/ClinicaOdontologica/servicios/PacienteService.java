package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.model.dto.OdontologoDTO;
import com.example.ClinicaOdontologica.model.dto.PacienteDTO;
import com.example.ClinicaOdontologica.model.entity.Odontologo;
import com.example.ClinicaOdontologica.model.entity.Paciente;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.model.entity.Turno;
import com.example.ClinicaOdontologica.repository.PacienteRepository;
import com.example.ClinicaOdontologica.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class PacienteService {

    private PacienteRepository pacienteRepository;
    private TurnoService turnoService;
    private UsersRepository usersRepository;

    public Paciente buscar(Integer id) throws NotFoundException {
        return pacienteRepository.findByUserId(id).orElseThrow(() -> new NotFoundException("Paciente no encontrado"));}
    public List<Paciente> listar(){return pacienteRepository.findAll();}
    public void update(PacienteDTO dto) throws NotFoundException {
        // 1️⃣ Buscar el odontólogo existente
        var pacienteOpt = pacienteRepository.findById(dto.id());
        if (pacienteOpt.isEmpty()) {
            throw new NotFoundException("Paciente no encontrado");
        }

        Paciente paciente = pacienteOpt.get();

        // 2️⃣ Actualizar campos simples
        paciente.setTelefono(dto.telefono());
        paciente.setDni(dto.dni());
        paciente.setDomicilio(dto.domicilio());

        // 3️⃣ Actualizar datos del usuario (sin rol ni pass)
        if (dto.users() != null) {
            var user = paciente.getUsers();
            user.setNombre(dto.users().nombre());
            user.setApellido(dto.users().apellido());
            user.setEmail(dto.users().email());
            usersRepository.save(user);
        }

        // 4️⃣ Guardar el odontólogo actualizado
        pacienteRepository.save(paciente);
    }

    public void delete(Integer id) throws NotFoundException {
        Paciente paciente = buscar(id);

        List<Turno> turnos = turnoService.buscarPorPaciente(id);

        boolean tieneTurnosFuturos = turnos.stream()
                .anyMatch(t -> !t.getFechaTurno().isBefore(LocalDate.now()));

        if (tieneTurnosFuturos) {
            throw new NotFoundException("No se puede eliminar el paciente con turnos futuros o del día de hoy");
        }

        pacienteRepository.delete(paciente);
    }

    public Paciente findByUserId(Integer userId) {
        return pacienteRepository.findByIdUsuario(userId);
    }
}
