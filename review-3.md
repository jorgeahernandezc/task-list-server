# ¿Qué es mi producto y para que sirve?
---
- La siguiente app es una API que permite es sus distintos endpoints un CRUD para el manejo de un listado de tareas cumpliendo los limites de la arquitectura de API REST.

# ¿Cuáles son las funcionalidades más importantes y porque los usuarios las usarían?
---
- El usuario podra manipular un .json y generar data persistente
- El ususario podra consultar todas las tareas, filtrarlas por id, y estatus en el correspondiente endpoint, asi como crear
eliminar y editar tareas
- Mediante el uso de middlewares de Express se permite la verificacion previa de que los body de los metodos Post y Put sean correctos 
- Mediante middlewares se verifica que los metodos http sean validos
- Mediante middlewares se verifica que los parametros http sean validos 
- Contiene un inicio de sesion autenticado por token (JWT) mediante el cual se protege rutas sensibles


 # ¿Qué tecnologías usaste y por qué?
---
- Como parte del requerimiento se utilzo npm, node.js, javaScript,express, Json web token y git

# Endpoints
- /login  
Al enviar los datos correctos generara un token de autenticación
- /listarTareas/listar
Lista todas las tareas existentes
- /listarTareas/tarea/:id 
Lista una tarea especifica por id 
- /listaTareas/listar?isCompleted=true  o /listaTareas/listar?isCompleted=false
Lista tareas completadas o por completar respectivamente
- /listaTareas/crearTares
Crea una tarea
- /listaTareas/eliminarTarea/:id 
Elimina una tarea por id
- /listaTareas/editarTarea
Edita una tarea 