const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router")
const port= 3000; 


app.use('/listaTareas',listViewRouter);
app.use('/litarTareas',listEditRouter);


app.listen(port,()=>{
    console.log(`Servidor ejecutandose exitosamente en el puerto ${port}`)
});

