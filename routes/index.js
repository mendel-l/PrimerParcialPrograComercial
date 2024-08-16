const { Router } = require('express');
const router = Router();
const EmpleadosController = require('../controllers/EmpleadosController');
const ProyectosController = require('../controllers/ProyectosController');
const AsignacionesController = require('../controllers/AsignacionesController');

// Rutas para empleados
router.get('/empleados', EmpleadosController.getAll);
router.get('/empleados/:id', EmpleadosController.getById);
router.post('/empleados', EmpleadosController.create);
router.put('/empleados/:id', EmpleadosController.update);
router.delete('/empleados/:id', EmpleadosController.delete);

// Rutas para proyectos
router.get('/proyectos', ProyectosController.getAll);
router.get('/proyectos/:id', ProyectosController.getById);
router.post('/proyectos', ProyectosController.create);
router.put('/proyectos/:id', ProyectosController.update);

// Rutas para asignaciones
router.get('/asignaciones', AsignacionesController.getAll);
router.post('/asignaciones', AsignacionesController.create);
router.put('/asignaciones/:id', AsignacionesController.update);

module.exports = (app) => {
    app.use('/', router);
};
