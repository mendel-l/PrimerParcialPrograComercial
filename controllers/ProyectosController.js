'use strict';

const db = require('../models');
const Proyectos = db.Proyecto;
const Alertas = db.Alerta;

module.exports = {
    // GET ALL
    async getAll(req, res) {
        try {
            const proyectos = await Proyectos.findAll();
            res.status(200).json(proyectos);
        } catch (error) {
            console.error('Error al obtener los proyectos:', error);
            res.status(500).json({ error: 'Error al obtener los proyectos' });
        }
    },

    // GET ID
    async getById(req, res) {
        try {
            const proyectoId = req.params.id;
            const proyecto = await Proyectos.findByPk(proyectoId);

            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            res.status(200).json(proyecto);
        } catch (error) {
            console.error('Error al obtener el proyecto:', error);
            res.status(500).json({ error: 'Error al obtener el proyecto' });
        }
    },

    // POST
    async create(req, res) {
        try {
            const { nombre, descripcion, fecha_inicio, fecha_fin } = req.body;

            if (!nombre || !fecha_inicio || !fecha_fin) {
                return res.status(400).json({ error: 'Nombre, fecha de inicio y fecha de fin son requeridos' });
            }

            const nuevoProyecto = await Proyectos.create({
                nombre,
                descripcion,
                fecha_inicio,
                fecha_fin,
                porcentaje_completado: 0
            });

            const diffInDays = Math.ceil((new Date(fecha_fin) - new Date()) / (1000 * 60 * 60 * 24));

            if (diffInDays <= 7 && diffInDays >= 0) {
                await Alertas.create({
                    proyecto_id: nuevoProyecto.id,
                    mensaje: 'ESTE PROYECTO ESTÁ POR FINALIZAR',
                    fecha_fin: nuevoProyecto.fecha_fin
                });
            }

            res.status(201).json(nuevoProyecto);
        } catch (error) {
            console.error('Error al crear un nuevo proyecto:', error);
            res.status(500).json({ error: 'Error al crear un nuevo proyecto' });
        }
    },

    // PUT
    async update(req, res) {
        try {
            const id = req.params.id;
            const { nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_completado } = req.body;
            const proyecto = await Proyectos.findByPk(id);

            if (!proyecto) {
                return res.status(404).json({ message: 'Proyecto no encontrado' });
            }

            const fechaFinAnterior = proyecto.fecha_fin;
            proyecto.nombre = nombre || proyecto.nombre;
            proyecto.descripcion = descripcion || proyecto.descripcion;
            proyecto.fecha_inicio = fecha_inicio || proyecto.fecha_inicio;
            proyecto.fecha_fin = fecha_fin || proyecto.fecha_fin;
            proyecto.porcentaje_completado = porcentaje_completado || proyecto.porcentaje_completado;

            await proyecto.save();

            if (fecha_fin && new Date(fecha_fin) !== new Date(fechaFinAnterior)) {
                const diffInDays = Math.ceil((new Date(fecha_fin) - new Date()) / (1000 * 60 * 60 * 24));

                if (diffInDays <= 7) {
                    await Alertas.upsert({
                        proyecto_id: proyecto.id,
                        mensaje: 'ESTE PROYECTO ESTÁ POR FINALIZAR',
                        fecha_fin: proyecto.fecha_fin,
                    });
                } else if (diffInDays > 7) {
                    const diasAtraso = Math.ceil((new Date(fecha_fin) - new Date(fechaFinAnterior)) / (1000 * 60 * 60 * 24));
                    await Alertas.upsert({
                        proyecto_id: proyecto.id,
                        mensaje: `ESTE PROYECTO FUE ATRASADO ${diasAtraso} DÍA(S)`,
                        fecha_fin: proyecto.fecha_fin,
                    });
                }
            }

            res.status(200).json({ message: 'Proyecto actualizado correctamente', proyecto });
        } catch (error) {
            console.error('Error al actualizar el proyecto:', error);
            res.status(500).json({ error: 'Error al actualizar el proyecto' });
        }
    }
};
