const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router")
const port= 3000; 

const typeMethod = (req,res,next)=>{
    metodo = req.method;
    if(metodo === "GET" || metodo === "POST" || metodo === "PUT" || metodo === "DELETE"){
        next();
    }else{
        return res.status(400).send("El metodo de la solicitud http no es valido")
    }
};


app.use(typeMethod);
app.use('/listaTareas',listEditRouter);
app.use('/listaTareas',listViewRouter);


app.listen(port,()=>{
    console.log(`Servidor ejecutandose exitosamente en el puerto ${port}`)
});

