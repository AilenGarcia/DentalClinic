package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.entidades.Users;
import com.example.ClinicaOdontologica.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UsersService {
    private UsersRepository usersRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveUser(Users user) {
        Users users = new Users();
        users.setName(user.getName());
        users.setEmail(user.getEmail());
        users.setPassword(passwordEncoder.encode(user.getPassword()));
        users.setRol(user.getRol());
        usersRepository.save(users);
    }

    public Users findByEmail(String email) {
        return usersRepository.findByEmail(email);
    }
}
