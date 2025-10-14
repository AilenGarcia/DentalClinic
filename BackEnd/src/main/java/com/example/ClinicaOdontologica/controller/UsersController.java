package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.entidades.Users;
import com.example.ClinicaOdontologica.servicios.UsersService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping(value = "/users")
public class UsersController {
    private UsersService usersService;

    @PostMapping("/save")
    public ResponseEntity<String> save(@RequestBody Users users){
        usersService.saveUser(users);
        return new ResponseEntity<>("saved users",null, HttpStatus.CREATED);

    }

    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) {
        return ResponseEntity.ok(usersService.findByEmail(email));
    }

}
