package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.entidades.Odontologo;
import com.example.ClinicaOdontologica.entidades.Paciente;
import com.example.ClinicaOdontologica.entidades.UpdatePasswordRequest;
import com.example.ClinicaOdontologica.entidades.Users;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.repository.OdontologoRepository;
import com.example.ClinicaOdontologica.repository.PacienteRepository;
import com.example.ClinicaOdontologica.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.hibernate.sql.Update;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
@AllArgsConstructor
public class UsersService {
    private UsersRepository usersRepository;
    private PacienteRepository pacienteRepository;
    private OdontologoRepository odontologoRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveUser(Users user) throws ExistenteException {
        if(usersRepository.existsUsersByEmail(user.getEmail())) throw new ExistenteException("El usuario ya esta registrado");
        Users u = new Users();
        u.setNombre(user.getNombre());
        u.setApellido(user.getApellido());
        u.setEmail(user.getEmail());
        u.setPassword(passwordEncoder.encode(user.getPassword()));
        u.setRol(user.getRol());

        Users savedUser = usersRepository.save(u);

        switch (savedUser.getRol()) {
            case PACIENTE -> {
                Paciente paciente = new Paciente();
                paciente.setUsers(savedUser);
                paciente.setFechaDeAlta(new Date(System.currentTimeMillis()));
                pacienteRepository.save(paciente);
            }
            case ODONTOLOGO -> {
                Odontologo odontologo = new Odontologo();
                odontologo.setUsers(savedUser);
                odontologoRepository.save(odontologo);
            }
        }
    }

    public Users findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }

    public void updatePassword(UpdatePasswordRequest u) throws NotFoundException {
        Users user = usersRepository.findByEmail(u.getEmail());
        if (user == null ) {
            throw new NotFoundException("Usuario no encontrado");
        }

        if (!passwordEncoder.matches(u.getOldPassword(), user.getPassword())) {
            throw new NotFoundException("Contraseña incorrecta");
        }

        user.setPassword(passwordEncoder.encode(u.getNewPassword()));
        usersRepository.save(user);
    }

}
