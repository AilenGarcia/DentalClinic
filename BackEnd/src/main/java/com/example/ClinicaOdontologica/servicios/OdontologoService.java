package com.example.ClinicaOdontologica.servicios;

import com.example.ClinicaOdontologica.model.dto.OdontologoDTO;
import com.example.ClinicaOdontologica.model.entity.Odontologo;
import com.example.ClinicaOdontologica.exception.NotFoundException;
import com.example.ClinicaOdontologica.model.entity.Turno;
import com.example.ClinicaOdontologica.repository.OdontologoRepository;
import com.example.ClinicaOdontologica.repository.UsersRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@AllArgsConstructor
public class OdontologoService {
    private OdontologoRepository odontologoRepository;
    private TurnoService turnoService;
    private UsersRepository usersRepository;

    public void modificar(String matricula, Integer id) throws NotFoundException{
        if(buscar(id) == null) throw new NotFoundException("No se puede modificar un odontologo inexistente");
        odontologoRepository.actualizar(matricula, id); }
    public Odontologo buscar(Integer id) throws NotFoundException {
        return odontologoRepository.findByUserId(id).orElseThrow(() -> new NotFoundException("Odontologo no encontrado"));}

    public List<Odontologo> listar(){ return odontologoRepository.findAll();}
    public void update(OdontologoDTO dto) throws NotFoundException {
        // 1️⃣ Buscar el odontólogo existente
        var odontologoOpt = odontologoRepository.findById(dto.id());
        if (odontologoOpt.isEmpty()) {
            throw new NotFoundException("Odontólogo no encontrado");
        }

        Odontologo odontologo = odontologoOpt.get();

        // 2️⃣ Actualizar campos simples
        odontologo.setTelefono(dto.telefono());
        odontologo.setMatricula(dto.matricula());
        odontologo.setDescripcion(dto.descripcion());

        // 3️⃣ Actualizar datos del usuario (sin rol ni pass)
        if (dto.users() != null) {
            var user = odontologo.getUsers();
            user.setNombre(dto.users().nombre());
            user.setApellido(dto.users().apellido());
            user.setEmail(dto.users().email());
            usersRepository.save(user);
        }

        // 4️⃣ Guardar el odontólogo actualizado
        odontologoRepository.save(odontologo);
    }

    public void delete(Integer id) throws NotFoundException {
        Odontologo odontologo = buscar(id);

        List<Turno> turnos = turnoService.buscarPorOdontologo(id);

        boolean tieneTurnosFuturos = turnos.stream()
                .anyMatch(t -> !t.getFechaTurno().isBefore(LocalDate.now()));

        if (tieneTurnosFuturos) {
            throw new NotFoundException("No se puede eliminar el odontólogo con turnos futuros o del día de hoy");
        }

        odontologoRepository.delete(odontologo);
    }


}

