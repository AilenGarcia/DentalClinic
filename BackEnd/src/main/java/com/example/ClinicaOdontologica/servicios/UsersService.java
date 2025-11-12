package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.model.dto.UpdatePasswordRequest;
import com.example.ClinicaOdontologica.model.dto.Userdto;
import com.example.ClinicaOdontologica.model.entity.*;
import com.example.ClinicaOdontologica.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor
public class UsersService {
    private RolRepository rolRepository;
    private UsersRepository usersRepository;
    private PacienteRepository pacienteRepository;
    private OdontologoRepository odontologoRepository;
    private TurnoRepository turnoRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveUser(Userdto user) throws ExistenteException, NotFoundException {
        if(usersRepository.existsUsersByEmail(user.email())) throw new ExistenteException("El usuario ya esta registrado");
        System.out.println(user.rolId());

        Optional<Rol> rol = rolRepository.findById(user.rolId());
        System.out.println(rol);

        if(rol.isEmpty()) throw new NotFoundException("Rol no encontrado");
        Users u = new Users();
        u.setNombre(user.nombre());
        u.setApellido(user.apellido());
        u.setEmail(user.email());
        u.setPassword(passwordEncoder.encode(user.password()));
        u.setRol(rol.get());

        Users savedUser = usersRepository.save(u);
        System.out.println(rol.get().getNombre());
        switch (rol.get().getNombre()) {
            case  "ROLE_PACIENTES"-> {
                Paciente paciente = new Paciente();
                paciente.setUsers(savedUser);
                paciente.setFechaDeAlta(new Date(System.currentTimeMillis()));
                pacienteRepository.save(paciente);
            }
            case "ROLE_ODONTOLOGOS" -> {
                Odontologo odontologo = new Odontologo();
                odontologo.setUsers(savedUser);
                odontologoRepository.save(odontologo);
            }
        }
    }

    public void deleteUser(Integer id) throws NotFoundException {
        var usuario = usersRepository.findById(id);
        if (usuario.isEmpty()) throw new NotFoundException("El usuario no existe");
        if("ROLE_PACIENTES".equals(usuario.get().getRol().getNombre())){
            var paciente = pacienteRepository.findByIdUsuario(usuario.get().getId());

            List<Turno> turnos = turnoRepository.findByPacienteId(paciente.getId());

            boolean tieneTurnosFuturos = turnos.stream()
                    .anyMatch(t -> !t.getFechaTurno().isBefore(LocalDate.now()));

            if (tieneTurnosFuturos) {
                throw new NotFoundException("No se puede eliminar el pacientes con turnos futuros o del día de hoy");
            }

            if(paciente != null){
                pacienteRepository.delete(paciente);
            }
        }
        if("ROLE_ODONTOLOGOS".equals(usuario.get().getRol().getNombre())){
            var odontologo = odontologoRepository.findByIdUsuario(usuario.get().getId());

            List<Turno> turnos = turnoRepository.findByOdontologoId(odontologo.getId());

            boolean tieneTurnosFuturos = turnos.stream()
                    .anyMatch(t -> !t.getFechaTurno().isBefore(LocalDate.now()));

            if (tieneTurnosFuturos) {
                throw new NotFoundException("No se puede eliminar el odontólogo con turnos futuros o del día de hoy");
            }

            if(odontologo != null){
                odontologoRepository.delete(odontologo);            }
        }

        usersRepository.delete(usuario.get());
    }

    public Users findByEmail(String email) throws NotFoundException {
        if (!usersRepository.existsUsersByEmail(email)) throw new NotFoundException("El usuario no existe");
        return usersRepository.findByEmail(email);
    }

    public void updatePassword(UpdatePasswordRequest u) throws NotFoundException {
        Users user = usersRepository.findByEmail(u.email());
        if (user == null ) {
            throw new NotFoundException("Usuario no encontrado");
        }

        if (!passwordEncoder.matches(u.oldPassword(), user.getPassword())) {
            throw new NotFoundException("Contraseña incorrecta");
        }

        user.setPassword(passwordEncoder.encode(u.newPassword()));
        usersRepository.save(user);
    }

}
