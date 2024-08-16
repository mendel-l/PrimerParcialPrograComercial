'use strict';

const db = require('../models');
const Proyectos = db.Proyecto;

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
            const { nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_completado } = req.body;

            // Validaciones adicionales pueden añadirse aquí si es necesario

            const nuevoProyecto = await Proyectos.create({
                nombre,
                descripcion,
                fecha_inicio,
                fecha_fin,
                porcentaje_completado
            });

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

            proyecto.nombre = nombre || proyecto.nombre;
            proyecto.descripcion = descripcion || proyecto.descripcion;
            proyecto.fecha_inicio = fecha_inicio || proyecto.fecha_inicio;
            proyecto.fecha_fin = fecha_fin || proyecto.fecha_fin;
            proyecto.porcentaje_completado = porcentaje_completado || proyecto.porcentaje_completado;

            await proyecto.save();

            res.status(200).json({ message: 'Proyecto actualizado correctamente', proyecto });
        } catch (error) {
            console.error('Error al actualizar el proyecto:', error);
            res.status(500).json({ error: 'Error al actualizar el proyecto' });
        }
    }
};
