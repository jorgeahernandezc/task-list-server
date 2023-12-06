const express = require("express");
const router = express.Router();
const fs = require("fs");
const {verifyParams} = require("./middlewares/verify-request.js");

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
            }
        });
        res.status(200).json(arrayTask);
        }else{
          jsonData.forEach((element) => {
            if(element.isCompleted===false){
              arrayTask.push(element);
            }
          });
          res.status(200).json(arrayTask);
      }
    } else {
      res.status(200).json(JSON.parse(data));
    }
  } catch (error) {
    res.status(500).json({ mensaje: error.message});
  }
});

router.get("/tarea/:id",verifyParams,(req, res) => {
  const id = req.params.id;
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
      res.status(200).json(tarea);
    } else {
      res.status(404).json({mensaje:"Tarea no encontrada"});
    }

  } catch (error) {
    res.status(500).json({ mensaje: error.message});
  }
});

module.exports = router;
