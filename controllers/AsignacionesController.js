'use strict';

const db = require('../models');
const Asignaciones = db.Asignacion;
const Empleados = db.Empleado;
const Proyectos = db.Proyecto;

module.exports = {
    // GET ALL
    async getAll(req, res) {
        try {
            const asignaciones = await Asignaciones.findAll({
                include: [
                    { model: Empleados, as: 'empleado' },
                    { model: Proyectos, as: 'proyecto' }
                ]
            });
            
            res.status(200).json(asignaciones);
        } catch (error) {
            console.error('Error al obtener las asignaciones:', error);
            res.status(500).json({ error: 'Error al obtener las asignaciones' });
        }
    },

    // POST
    async create(req, res) {
        try {
            const { empleado_id, proyecto_id, fecha_asignacion, fecha_liberacion } = req.body;

            if (!empleado_id || !proyecto_id || !fecha_asignacion) {
                return res.status(400).json({ error: 'Empleado ID, Proyecto ID y Fecha de Asignación son requeridos' });
            }

            const empleado = await Empleados.findByPk(empleado_id);
            const proyecto = await Proyectos.findByPk(proyecto_id);

            if (!empleado) {
                return res.status(404).json({ error: 'Empleado no encontrado' });
            }
            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            const asignacionActual = await Asignaciones.findOne({
                where: {
                    empleado_id: empleado_id,
                    fecha_liberacion: null
                }
            });

            if (asignacionActual) {
                return res.status(400).json({ error: 'El empleado ya está asignado a otro proyecto' });
            }

            const nuevaAsignacion = await Asignaciones.create({
                empleado_id,
                proyecto_id,
                fecha_asignacion,
                fecha_liberacion
            });

            res.status(201).json(nuevaAsignacion);
        } catch (error) {
            console.error('Error al crear una nueva asignación:', error);
            res.status(500).json({ error: 'Error al crear una nueva asignación' });
        }
    },

    // PUT
    async update(req, res) {
        try {
            const id = req.params.id;
            const { fecha_liberacion } = req.body;
            const asignacion = await Asignaciones.findByPk(id);

            if (!asignacion) {
                return res.status(404).json({ message: 'Asignación no encontrada' });
            }

            if (fecha_liberacion) {
                asignacion.fecha_liberacion = fecha_liberacion;

                const asignacionActiva = await Asignaciones.findOne({
                    where: {
                        empleado_id: asignacion.empleado_id,
                        fecha_liberacion: null
                    }
                });

                if (!asignacionActiva) {
                    return res.status(400).json({ error: 'El empleado no está asignado a ningún proyecto activo' });
                }
            } else {
                return res.status(400).json({ error: 'La fecha de liberación es requerida para actualizar la asignación' });
            }

            await asignacion.save();

            res.status(200).json({ message: 'Asignación actualizada correctamente', asignacion });
        } catch (error) {
            console.error('Error al actualizar la asignación:', error);
            res.status(500).json({ error: 'Error al actualizar la asignación' });
        }
    }
};
