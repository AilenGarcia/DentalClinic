package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.entidades.Odontologo;
import com.example.ClinicaOdontologica.exception.ExistenteException;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.exception.BadRequestException;
import com.example.ClinicaOdontologica.repository.OdontologoRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;


@Service
@AllArgsConstructor
public class OdontologoService {
    private OdontologoRepository odontologoRepository;

    public void guardarOdontologo(Odontologo odontologo) throws ExistenteException, BadRequestException {
        if(Objects.isNull(odontologo.getMatricula())) throw new BadRequestException("El campo matricula esta vacio");
        if(odontologoRepository.exists(Example.of(odontologo))) throw new ExistenteException("El odontologo ya esta registrado");
        odontologoRepository.save(odontologo);}
    public void eliminarOdontologo(Integer id) throws NotFoundException{
        if(buscar(id) == null) throw new NotFoundException("No se puede eliminar un odontologo inexistente");
        odontologoRepository.deleteById(id);}
    public void modificar(String matricula, Integer id) throws NotFoundException{
        if(buscar(id) == null) throw new NotFoundException("No se puede modificar un odontologo inexistente");
        odontologoRepository.actualizar(matricula, id); }
    public Odontologo buscar(Integer id) throws NotFoundException {
        return odontologoRepository.findById(id).orElseThrow(() -> new NotFoundException("Odontologo no encontrado"));}

    public List<Odontologo> findByName(String nombre){
        return odontologoRepository.findByName(nombre);
    }
    public List<Odontologo> listar(){ return odontologoRepository.findAll();}


}

