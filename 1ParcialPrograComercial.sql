CREATE DATABASE recursos_humanos;

-- Crear la tabla empleados
CREATE TABLE empleados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT,
    fecha_nacimiento DATE,
    fecha_contratacion DATE,
    puesto VARCHAR(100),
    salario DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear la tabla proyectos
CREATE TABLE proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    porcentaje_completado DECIMAL(5, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Crear la tabla asignaciones
CREATE TABLE asignaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    empleado_id INT NOT NULL,
    proyecto_id INT NOT NULL,
    fecha_asignacion DATE NOT NULL,
    fecha_liberacion DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (empleado_id) REFERENCES empleados(id) ON DELETE CASCADE,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id) ON DELETE CASCADE,
    CONSTRAINT unique_empleado_proyecto UNIQUE (empleado_id, proyecto_id, fecha_liberacion)
);

-- ALERTAS
CREATE TABLE `Alertas` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `proyecto_id` INTEGER NOT NULL,
  `mensaje` VARCHAR(255) NOT NULL,
  `fecha_fin` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`proyecto_id`) REFERENCES `Proyectos` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
