# ¿COMO INICIAR EL PROYECTO?
1. npm install | npm i
2. npm install --save sequelize-cli
2. 1 para la migracion ejecutar este comando: npx sequelize-cli db:migrate

3. npm start

# PRIMER PARCIAL DE PROGRA COMERCIAL
aqui se enlistaran todas las peticiones y cuerpo JSON que se usaron:

## EMPLEADOS
1. GET
http://localhost:3000/empleados
http://localhost:3000/empleados/{id}

2. POST
http://localhost:3000/empleados

{
    "nombre": "empleado1",
    "correo": "mail@gmail.com",
    "telefono": "55512342",
    "direccion": "address",
    "fecha_nacimiento": "1985-06-15",
    "fecha_contratacion": "2023-08-01",
    "puesto": "Desarrollador Backend",
    "salario": 50000
}

3. PUT
http://localhost:3000/empleados/{id}

{
    "nombre": "empleado1 - edit",
    "direccion": "address - edit",
    "telefono": "555-5678",
    "puesto": "Líder de Proyecto"
}

// se puede editar solo una parte del JSON o todo el JSON

4. DELETE
http://localhost:3000/empleados/{id}

## ####################################################

## PROYECTOS
1. GET
http://localhost:3000/proyectos
http://localhost:3000/proyectos/{id}

2. POST
http://localhost:3000/proyectos

{
    "nombre": "proyecto1",
    "descripcion": "des1",
    "fecha_inicio": "2023-08-01",
    "fecha_fin": "2024-01-01",
    "porcentaje_completado": 20.5
}

3. PUT
http://localhost:3000/proyectos/{id}

{
    "nombre": "proyecto - edit",
    "descripcion": "desc - edit",
    "fecha_fin": "2024-06-01",
    "porcentaje_completado": 50.0
}

## ####################################################

## PROYECTOS
1. GET
http://localhost:3000/asignaciones

2. POST
http://localhost:3000/asignaciones

{
    "empleado_id": 1,
    "proyecto_id": 2,
    "fecha_asignacion": "2024-01-15"
}


3. PUT
http://localhost:3000/asignaciones/{id}

{
    "fecha_liberacion": "2024-06-30"
}
