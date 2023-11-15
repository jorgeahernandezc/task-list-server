const fs= require("fs");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.post("/crearTarea",(req,res)=>{
    try {
        console.log(req.body);
        const data = JSON.parse(fs.readFileSync('./src/listaTareas.json'));
        data.push(req.body);
        fs.writeFileSync('./src/listaTareas.json', JSON.stringify(data, null, 2));
         res.status(200).send("Tarea Ingresada con exito")
      } catch (error) {
        console.error('Error al leer el archivo:', error.message);
        res.sendStatus(500);
      }
});

router.delete("/eliminarTarea/:id",(req,res)=>{
    try {
        const id = req.params.id;
        const data = JSON.parse(fs.readFileSync('./src/listaTareas.json'));
        const indiceABorrar = data.findIndex((element)=>element.id===id);
        console.log(indiceABorrar)
if( indiceABorrar !== -1){
    data.splice(indiceABorrar,1);
    fs.writeFileSync('./src/listaTareas.json', JSON.stringify(data, null, 2));
    res.status(200).send("Tarea borrada con exito")
}       
      } catch (error) {
        console.error('Error al leer el archivo:', error.message);
        res.sendStatus(500);
      }
});


router.put("/editarTarea",(req,res)=>{
    try {
        console.log(req.body);
        const data = JSON.parse(fs.readFileSync('./src/listaTareas.json'));
        const id = req.body.id;
        const elementoAModificar = data.find((element) => element.id === id);
        if (elementoAModificar) {
            elementoAModificar.isCompleted = req.body.isCompleted;
            elementoAModificar.description = req.body.description;
            try {
                fs.writeFileSync('./src/listaTareas.json', JSON.stringify(data, null, 2));
                res.status(200).send('Archivo actualizado con éxito.');
              } catch (error) {
                res.status(400).send('Error al escribir en el archivo:', error.message);
              };
          } else {
            console.error('Elemento no encontrado para modificar.');
          }
        }
      catch (error) {
        console.error('Error al leer el archivo:', error.message);
        res.sendStatus(500);
      }
});

module.exports = router;