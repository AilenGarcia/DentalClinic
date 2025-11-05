package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.model.entity.Odontologo;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.repository.OdontologoRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
@AllArgsConstructor
public class OdontologoService {
    private OdontologoRepository odontologoRepository;

    public void modificar(String matricula, Integer id) throws NotFoundException{
        if(buscar(id) == null) throw new NotFoundException("No se puede modificar un odontologo inexistente");
        odontologoRepository.actualizar(matricula, id); }
    public Odontologo buscar(Integer id) throws NotFoundException {
        return odontologoRepository.findById(id).orElseThrow(() -> new NotFoundException("Odontologo no encontrado"));}

    public List<Odontologo> listar(){ return odontologoRepository.findAll();}
    public void update(Odontologo odontologo) throws NotFoundException {
        if (!odontologoRepository.findById(odontologo.getId()).isPresent()) throw new NotFoundException("Odontologo no encontrado");
        odontologoRepository.save(odontologo);
    }

}

