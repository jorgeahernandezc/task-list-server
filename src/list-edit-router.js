const fs= require("fs");
const express = require("express");
const router = express.Router();



const verifyBody = (req, res, next) => {
  if ((req.method === "POST") || (req.method === "PUT")) {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).send("La solicitud está vacía");
    }else if(Object.keys(req.body).length!=3){
      return res.status(400).send("Falta un argumento en la solicitud");
    }else if(typeof req.body.id != "number"){
      return res.status(400).send("El argumento de id es invalido");
    }else if(typeof req.body.isCompleted != "boolean"){
      return res.status(400).send("El argumento de isCompleted es invalido");
    }else if(typeof req.body.description != "string"){
      return res.status(400).send("El argumento de description es invalido");
    }
  }
  next();
};

router.use(express.json());
router.use(verifyBody);

router.post("/crearTarea", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync('./src/listaTareas.json'));
    data.push(req.body);
    fs.writeFileSync('./src/listaTareas.json', JSON.stringify(data, null, 2));
    res.status(200).send("Tarea ingresada con éxito");
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
            res.status(400).send('Elemento no encontrado para modificar.');
          }
        }
      catch (error) {
        res.status(500).send('Error al leer el archivo:', error.message);
      }
});

module.exports = router;