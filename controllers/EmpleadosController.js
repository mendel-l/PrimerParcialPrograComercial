'use strict';

const db = require('../models');
const Empleados = db.Empleado;

module.exports = {
    // GET ALL
    async getAll(req, res) {
        try {
            const empleados = await Empleados.findAll();
            
            res.status(200).json(empleados);
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
            res.status(500).json({ error: 'Error al obtener los empleados' });
        }
    },

    // GET ID
    async getById(req, res) {
        try {
            const empleadoId = req.params.id;
            const empleado = await Empleados.findByPk(empleadoId);

            if (!empleado) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }

            res.status(200).json(empleado);
        } catch (error) {
            console.error('Error al obtener el empleado:', error);
            res.status(500).json({ error: 'Error al obtener el empleado' });
        }
    },

    // POST
    async create(req, res) {
        try {
            const { nombre, correo, telefono, direccion, fecha_nacimiento, fecha_contratacion, puesto, salario } = req.body;

            // Validaciones adicionales pueden añadirse aquí si es necesario

            const nuevoEmpleado = await Empleados.create({
                nombre,
                correo,
                telefono,
                direccion,
                fecha_nacimiento,
                fecha_contratacion,
                puesto,
                salario
            });

            res.status(201).json(nuevoEmpleado);
        } catch (error) {
            console.error('Error al crear un nuevo empleado:', error);
            res.status(500).json({ error: 'Error al crear un nuevo empleado' });
        }
    },

    // PUT
    async update(req, res) {
        try {
            const id = req.params.id;
            const { nombre, correo, telefono, direccion, fecha_nacimiento, fecha_contratacion, puesto, salario } = req.body;
            const empleado = await Empleados.findByPk(id);

            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }

            empleado.nombre = nombre || empleado.nombre;
            empleado.correo = correo || empleado.correo;
            empleado.telefono = telefono || empleado.telefono;
            empleado.direccion = direccion || empleado.direccion;
            empleado.fecha_nacimiento = fecha_nacimiento || empleado.fecha_nacimiento;
            empleado.fecha_contratacion = fecha_contratacion || empleado.fecha_contratacion;
            empleado.puesto = puesto || empleado.puesto;
            empleado.salario = salario || empleado.salario;

            await empleado.save();

            res.status(200).json({ message: 'Empleado actualizado correctamente', empleado });
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
            res.status(500).json({ error: 'Error al actualizar el empleado' });
        }
    },

    // DELETE
    async delete(req, res) {
        try {
            const id = req.params.id;
            const empleado = await Empleados.findByPk(id);

            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }

            const empleadoEliminado = {
                id: empleado.id,
                nombre: empleado.nombre,
                correo: empleado.correo,
                telefono: empleado.telefono,
                puesto: empleado.puesto
            };

            await empleado.destroy();

            res.status(200).json({ message: 'Empleado eliminado correctamente', deletedEmpleado: empleadoEliminado });
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
            res.status(500).json({ error: 'Error al eliminar el empleado' });
        }
    }
};
