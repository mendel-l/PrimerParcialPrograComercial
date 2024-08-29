'use strict';

const db = require('../models');
const Alertas = db.Alerta;
const Proyectos = db.Proyecto;

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const calculateDaysDifference = (date1, date2) => {
    const timeDifference = date2.getTime() - date1.getTime();
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
};

module.exports = {
    // GET
    async getAlertas(req, res) {
        try {
            const alertas = await Alertas.findAll({
                include: [{
                    model: Proyectos,
                    as: 'Proyecto'
                }]
            });
            res.status(200).json(alertas);
        } catch (error) {
            console.error('Error al obtener alertas:', error);
            res.status(500).json({ error: 'Error al obtener alertas' });
        }
    },

    // POST: Obtener la información del proyecto y el mensaje sobre la fecha de finalización
    async obtenerInformacionProyecto(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Se requiere id del proyecto' });
            }

            const proyecto = await Proyectos.findByPk(id);
            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            const fechaFin = new Date(proyecto.fecha_fin);
            const hoy = new Date();
            const diffInDays = calculateDaysDifference(hoy, fechaFin);

            let mensaje;
            let mensaje_tiempo;
            if (diffInDays <= 7 && diffInDays >= 0) {
                mensaje = 'ESTE PROYECTO ESTÁ POR FINALIZAR';
                mensaje_tiempo = `A ESTE PROYECTO LE FALTAN ${diffInDays} DÍA(S) PARA TERMINAR`;
            } else {
                mensaje = 'Este proyecto no está cerca de finalizar';
                mensaje_tiempo = `A ESTE PROYECTO LE FALTAN ${diffInDays} DÍA(S) PARA TERMINAR`;
            }

            res.status(200).json({
                proyecto: {
                    ...proyecto.toJSON(),
                    fecha_inicio: formatDate(new Date(proyecto.fecha_inicio)),
                    fecha_fin: formatDate(new Date(proyecto.fecha_fin))
                },
                mensaje,
                mensaje_tiempo
            });
        } catch (error) {
            console.error('Error al obtener la información del proyecto:', error);
            res.status(500).json({ error: 'Error al obtener la información del proyecto' });
        }
    },

    // PUT: Actualizar la fecha_fin de un proyecto y modificar la alerta
    async actualizarAlerta(req, res) {
        try {
            const { id } = req.params;
            const { nueva_fecha_fin } = req.body;

            if (!nueva_fecha_fin) {
                return res.status(400).json({ error: 'Se requiere nueva_fecha_fin' });
            }

            const nuevaFecha = new Date(nueva_fecha_fin + 'T00:00:00.000Z');

            const proyecto = await Proyectos.findByPk(id);
            if (!proyecto) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            const alerta = await Alertas.findOne({ where: { proyecto_id: id } });
            if (!alerta) {
                return res.status(404).json({ error: 'Alerta no encontrada' });
            }

            const fechaAnterior = new Date(proyecto.fecha_fin);
            await proyecto.update({ fecha_fin: nuevaFecha });

            const diffInDays = Math.ceil((nuevaFecha - fechaAnterior) / (1000 * 60 * 60 * 24));

            let mensaje = `ESTE PROYECTO FUE ATRASADO ${diffInDays} DÍA(S)`;
            if (diffInDays <= 7) {
                mensaje = 'ESTE PROYECTO ESTÁ POR FINALIZAR';
            }

            await alerta.update({
                fecha_fin: nuevaFecha,
                mensaje
            });

            res.status(200).json({ proyecto, alerta });
        } catch (error) {
            console.error('Error al actualizar la alerta:', error);
            res.status(500).json({ error: 'Error al actualizar la alerta' });
        }
    }
};