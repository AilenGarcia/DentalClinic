package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.entidades.Odontologo;
import com.example.ClinicaOdontologica.entidades.Paciente;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.servicios.PacienteService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping(value = "/pacientes")
public class PacienteController {
    private PacienteService pacienteService;

    @GetMapping("/mostrar")
    public ResponseEntity<List<Paciente>> listar() throws NotFoundException{
        return new ResponseEntity<>(pacienteService.listar(),null,HttpStatus.OK);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Paciente> buscar(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(pacienteService.buscar(id), null, HttpStatus.OK);
    }

    @GetMapping("/finByName/{nombre}")
    public ResponseEntity<List<Paciente>> findByName(@PathVariable String nombre) {
        return new ResponseEntity<>(pacienteService.findByName(nombre), null, HttpStatus.OK);
    }

    @PostMapping("/agregar")
    public ResponseEntity<String> agregar(@RequestBody Paciente paciente) throws ExistenteException, BadRequestException {
        pacienteService.guardarPaciente(paciente);
        return new ResponseEntity<>("Paciente agregado correctamente",null, HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/modificar/{domicilio}/{id}")
    public ResponseEntity<String> modificar(@PathVariable String domicilio, @PathVariable Integer id) throws NotFoundException {
        pacienteService.modificar(domicilio, id);
        return new ResponseEntity<>("Paciente modificado con exito", null, HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Integer id) throws NotFoundException {

        pacienteService.eliminarPaciente(id);
        return new ResponseEntity<>("Paciente eliminado con exito", null, HttpStatus.OK);
    }

}
