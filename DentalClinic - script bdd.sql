USE `dentalclinic`;

-- Desactivar verificaciones temporalmente
SET FOREIGN_KEY_CHECKS=0;

-- Limpiar datos existentes
TRUNCATE TABLE `turno`;
TRUNCATE TABLE `odontologo`;
TRUNCATE TABLE `paciente`;
TRUNCATE TABLE `users`;
TRUNCATE TABLE `roles`;

-- Reactivar verificaciones
SET FOREIGN_KEY_CHECKS=1;

-- ============================================
-- INSERTAR ROLES
-- ============================================

INSERT INTO roles (nombre) VALUES
  ('ROLE_PACIENTES'),
  ('ROLE_ODONTOLOGOS');


-- ============================================
-- INSERTAR USUARIOS
-- ============================================

-- Usuarios para Odontólogos (rol_id = 2: ROLE_ODONTOLOGOS)
INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `password`, `rol_id`) VALUES
(1, 'María', 'González', 'maria.gonzalez@dentalclinic.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 2),
(2, 'Carlos', 'Rodríguez', 'carlos.rodriguez@dentalclinic.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 2),
(3, 'Ana', 'Martínez', 'ana.martinez@dentalclinic.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 2),
(4, 'Luis', 'Fernández', 'luis.fernandez@dentalclinic.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 2),
(5, 'Patricia', 'López', 'patricia.lopez@dentalclinic.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 2);

-- Usuarios para Pacientes (rol_id = 1: ROLE_PACIENTES)
INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `password`, `rol_id`) VALUES
(6, 'Juan', 'Pérez', 'juan.perez@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(7, 'Laura', 'Sánchez', 'laura.sanchez@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(8, 'Diego', 'Torres', 'diego.torres@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(9, 'Sofía', 'Ramírez', 'sofia.ramirez@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(10, 'Miguel', 'Flores', 'miguel.flores@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(11, 'Valentina', 'Castro', 'valentina.castro@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(12, 'Sebastián', 'Morales', 'sebastian.morales@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(13, 'Camila', 'Herrera', 'camila.herrera@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(14, 'Martín', 'Vargas', 'martin.vargas@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1),
(15, 'Isabella', 'Romero', 'isabella.romero@email.com', '$2a$10$0gVwJXpQ0QR3a4DvuFFoM.6o3F/2XZEDrl6r1kV9PiXLnN4Pe9HMm', 1);

-- ============================================
-- INSERTAR ODONTÓLOGOS
-- ============================================

INSERT INTO `odontologo` (`id`, `matricula`, `descripcion`, `telefono`, `users_id`) VALUES
(1, 'MP-12345', 'Odontología General y Estética', '541145678901', 1),
(2, 'MP-23456', 'Ortodoncia y Ortopedia Maxilar', '541145678902', 2),
(3, 'MP-34567', 'Endodoncia y Periodoncia', '541145678903', 3),
(4, 'MP-45678', 'Cirugía Oral y Maxilofacial', '541145678904', 4),
(5, 'MP-56789', 'Odontopediatría', '541145678905', 5);

-- ============================================
-- INSERTAR PACIENTES
-- ============================================

INSERT INTO `paciente` (`id`, `dni`, `domicilio`, `telefono`, `fecha_de_alta`, `users_id`) VALUES
(1, '35123456', 'Av. Corrientes 1234, CABA', '541156781234', '2024-01-15 10:30:00', 6),
(2, '36234567', 'Calle Florida 567, CABA', '541156782345', '2024-02-20 14:15:00', 7),
(3, '37345678', 'Av. Santa Fe 890, CABA', '541156783456', '2024-03-10 09:45:00', 8),
(4, '38456789', 'Calle Lavalle 234, CABA', '541156784567', '2024-04-05 16:20:00', 9),
(5, '39567890', 'Av. Rivadavia 456, CABA', '541156785678', '2024-05-12 11:00:00', 10),
(6, '40678901', 'Calle Belgrano 789, CABA', '541156786789', '2024-06-18 13:30:00', 11),
(7, '41789012', 'Av. Callao 321, CABA', '541156787890', '2024-07-22 15:45:00', 12),
(8, '42890123', 'Calle Maipu 654, CABA', '541156788901', '2024-08-30 10:15:00', 13),
(9, '43901234', 'Av. Pueyrredón 987, CABA', '541156789012', '2024-09-14 12:00:00', 14),
(10, '44012345', 'Calle Junín 147, CABA', '541156780123', '2024-10-25 14:30:00', 15);

-- ============================================
-- INSERTAR TURNOS
-- ============================================

INSERT INTO `turno` (`id`, `fecha_turno`, `hora_turno`, `odontologo_id`, `paciente_id`) VALUES
-- Turnos pasados
(1, '2024-11-01', '09:00:00', 1, 1),
(2, '2024-11-01', '10:00:00', 2, 2),
(3, '2024-11-05', '14:00:00', 3, 3),
(4, '2024-11-08', '16:00:00', 4, 4),
(5, '2024-11-10', '11:00:00', 5, 5),
(16, '2024-11-01', '09:00:00', 1, 1),
(17, '2024-11-01', '09:00:00', 1, 1),
(18, '2024-11-01', '09:00:00', 1, 1),
(19, '2024-11-01', '09:00:00', 1, 1),
(20, '2024-11-01', '09:00:00', 1, 1),

-- Turnos futuros
(6, '2025-11-18', '09:00:00', 1, 6),
(7, '2025-11-18', '10:30:00', 2, 7),
(8, '2025-11-19', '14:00:00', 3, 8),
(9, '2025-11-20', '15:00:00', 4, 9),
(10, '2025-11-21', '11:00:00', 5, 10),
(11, '2025-11-22', '09:30:00', 1, 1),
(12, '2025-11-22', '16:00:00', 2, 2),
(13, '2025-11-25', '10:00:00', 3, 3),
(14, '2025-11-26', '13:00:00', 4, 4),
(15, '2025-11-27', '14:30:00', 5, 5);

-- ============================================
-- VERIFICACIÓN DE DATOS INSERTADOS
-- ============================================

SELECT '=== RESUMEN DE DATOS INSERTADOS ===' AS '';
SELECT COUNT(*) AS 'Total Usuarios' FROM users;
SELECT COUNT(*) AS 'Total Odontólogos' FROM odontologo;
SELECT COUNT(*) AS 'Total Pacientes' FROM paciente;
SELECT COUNT(*) AS 'Total Turnos' FROM turno;
