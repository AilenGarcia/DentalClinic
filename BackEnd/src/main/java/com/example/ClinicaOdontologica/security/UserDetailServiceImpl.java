package com.example.ClinicaOdontologica.security;

import com.example.ClinicaOdontologica.model.entity.Users;
import com.example.ClinicaOdontologica.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Users> user = usersRepository.findByEmailWithRol(email);
        if(user.isEmpty()) {
            throw new UsernameNotFoundException("Usuario o password inválidos");
        }
        return new UserDetailsImpl(user.get());
    }
}
