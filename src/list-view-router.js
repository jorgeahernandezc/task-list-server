const fs = require("fs");
const express = require("express");
const router = express.Router();

const veerifyParams = (req, res, next) => {
  const id = req.params.id;

  if (isNaN(parseInt(id))) {
    return res.status(400).json( 'El parámetro id debe ser un número.' );
  }

  next(); 
};


router.get("/listar", (req, res) => {
  try {
    const data = fs.readFileSync("./src/listaTareas.json");
    const jsonData = JSON.parse(data);
    const arrayTask = [];
    if (Object.keys(req.query).length === 1) {
      if (req.query.isCompleted=="true") {
          jsonData.forEach((element) => {
            if(element.isCompleted===true){
              arrayTask.push(element);
              console.log(element)
            }
        });
        res.send(arrayTask);
        }else{
          jsonData.forEach((element) => {
            if(element.isCompleted===false){
              arrayTask.push(element);
            }
          });
          res.send(arrayTask);
      }
    } else {
      res.send(JSON.parse(data));
    }
  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
    res.sendStatus(500);
  }
});

router.get("/tarea/:id",veerifyParams,(req, res) => {
  const id = req.params.id;
  console.log(id)
  try {
    const data = fs.readFileSync("./src/listaTareas.json");
    const jsonData = JSON.parse(data);

    let tareaEncontrada = false;
    let tarea;

    jsonData.forEach((element) => {
      if (element.id == id) {
        tarea = element;
        tareaEncontrada = true;
      }
    });

    if (tareaEncontrada) {
      res.send(tarea);
    } else {
      res.send("Tarea no encontrada");
    }

  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
