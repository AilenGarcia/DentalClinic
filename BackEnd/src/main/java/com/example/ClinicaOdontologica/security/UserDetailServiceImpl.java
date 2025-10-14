package com.example.ClinicaOdontologica.security;

import com.example.ClinicaOdontologica.entidades.Users;
import com.example.ClinicaOdontologica.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = usersRepository.findByEmail(email);
        if(user == null) {
            throw new UsernameNotFoundException("Usuario o password inválidos");
        }
        return new UserDetailsImpl(user);
    }
}
