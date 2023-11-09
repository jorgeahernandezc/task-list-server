const express = require("express");
const app = express();
const port= 3000; 

let listaTareas={};

app.get("/",(req,res)=>{
    res.json({
        "id":123456,
        "isCompleted":false,
        "description":"Walk the dog",
    });
});


app.listen(port,()=>{
    console.log(`Servidor ejecutandose exitosamente en el puerto ${port}`)
});