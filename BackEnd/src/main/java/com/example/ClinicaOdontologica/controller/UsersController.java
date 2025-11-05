package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.entidades.UpdatePasswordRequest;
import com.example.ClinicaOdontologica.entidades.Users;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
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
    public ResponseEntity<String> save(@RequestBody Users users) throws ExistenteException {
        usersService.saveUser(users);
        return new ResponseEntity<>("saved users",null, HttpStatus.CREATED);
    }

    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) {
        return ResponseEntity.ok(usersService.findByEmail(email));
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest users) throws ExistenteException, NotFoundException {
        usersService.updatePassword(users);
        return new ResponseEntity<>("Password updated",null, HttpStatus.OK);
    }

}
