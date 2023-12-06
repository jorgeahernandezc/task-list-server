const fs= require("fs");
const express = require("express");
const router = express.Router();
const jwt = require ("jsonwebtoken");
const {verifyBody} = require("./middlewares/verify-request.js");
const {auth} = require("./middlewares/auth.js");



router.use(express.json());
router.use(auth,verifyBody);

router.post("/crearTarea", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./src/listaTareas.json'));
    data.push(req.body);
    fs.writeFileSync('./src/listaTareas.json', JSON.stringify(data, null, 2));
    res.status(200).json({mensaje:"Tarea ingresada con éxito"});
  } catch (error) {
    res.status(500).json({mensaje: error.message});
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
    res.status(200).json({mensaje:"Tarea borrada con exito"})
}       
      } catch (error) {
        res.status(500).json({mensaje: error.message});
      }
});


router.put("/editarTarea",(req,res)=>{
    try {
        const data = JSON.parse(fs.readFileSync('./src/listaTareas.json'));
        const id = req.body.id;
        const elementoAModificar = data.find((element) => element.id === id);
        if (elementoAModificar) {
            elementoAModificar.isCompleted = req.body.isCompleted;
            elementoAModificar.description = req.body.description;
            try {
                fs.writeFileSync('./src/listaTareas.json', JSON.stringify(data, null, 2));
                res.status(200).json({mensaje:'Archivo actualizado con éxito.'});
              } catch (error) {
                res.status(400).json({mensaje: error.message});
              };
          } else {
            res.status(400).json({mensaje:'Elemento no encontrado para modificar.'});
          }
        }
      catch (error) {
        res.status(500).json({mensaje: error.message});
      }
});

module.exports = router;