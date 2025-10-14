package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.entidades.Turno;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.servicios.TurnoService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping(value = "/turnos")
public class TurnoController {
    private TurnoService turnoService;

    @GetMapping("/mostrar")
    public ResponseEntity<List<Turno>> listar() {
        if(turnoService.listar().isEmpty()) return new ResponseEntity<>(null,null, HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(turnoService.listar(),null,HttpStatus.OK);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Turno> buscar(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(turnoService.buscar(id), null, HttpStatus.OK);
    }

    @PostMapping("/agregar")
    public ResponseEntity<String> agregar(@RequestBody Turno turno) throws ExistenteException, BadRequestException {
        turnoService.agregarTurno(turno);
        return new ResponseEntity<>("Turno agregado correctamente",null, HttpStatus.CREATED);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Integer id) throws NotFoundException {
        turnoService.eliminarTurno(id);
        return new ResponseEntity<>("Turno eliminado con exito", null, HttpStatus.OK);
    }

}
