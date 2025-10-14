package com.example.ClinicaOdontologica.controller;

import com.example.ClinicaOdontologica.entidades.Odontologo;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.servicios.OdontologoService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@AllArgsConstructor
@RequestMapping(value = "/odontologos")
public class OdontologoController {
    private OdontologoService odontologoService;

    @GetMapping("/mostrar")
    public ResponseEntity<List<Odontologo>> listar() {
        if(odontologoService.listar().isEmpty()) return new ResponseEntity<>(null,null,HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(odontologoService.listar(),null,HttpStatus.OK);
    }

    @GetMapping("/buscar/{id}")
    public ResponseEntity<Odontologo> buscar(@PathVariable Integer id) throws NotFoundException {
        return new ResponseEntity<>(odontologoService.buscar(id), null, HttpStatus.OK);
    }

    @GetMapping("/finByName/{nombre}")
    public ResponseEntity<List<Odontologo>> findByName(@PathVariable String nombre) {
        return new ResponseEntity<>(odontologoService.findByName(nombre), null, HttpStatus.OK);
    }

    @PostMapping("/agregar")
    public ResponseEntity<String> agregar(@RequestBody Odontologo odontologo) throws ExistenteException, NotFoundException, BadRequestException {
        odontologoService.guardarOdontologo(odontologo);
        return new ResponseEntity<>("Odontologo agregado correctamente",null, HttpStatus.CREATED);
    }

    @Transactional
    @PutMapping("/modificar/{matricula}/{id}")
    public ResponseEntity<String> modificar(@PathVariable String matricula,@PathVariable Integer id) throws NotFoundException {
        odontologoService.modificar(matricula, id);
        return new ResponseEntity<>("Odontologo modificado con exito", null, HttpStatus.OK);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Integer id) throws NotFoundException {

        odontologoService.eliminarOdontologo(id);
        return new ResponseEntity<>("Odontologo eliminado con exito", null, HttpStatus.OK);
    }
}
