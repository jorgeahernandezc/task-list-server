const fs = require("fs");
const express = require("express");
const router = express.Router();

router.get("/listar", (req, res) => {
  try {
    const data = fs.readFileSync("./src/listaTareas.json");
    const jsonData = JSON.parse(data);
    const arrayTask = [];
    if (Object.keys(req.query).length === 1) {
      if (req.query.isCompleted===true) {
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
      console.log("Me salte lo demas");
      res.send(JSON.parse(data));
    }
  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
    res.sendStatus(500);
  }
});

router.get("/tarea/:id", (req, res) => {
  const id = req.params.id;
  try {
    const data = fs.readFileSync("./src/listaTareas.json");
    const jsonData = JSON.parse(data);
    jsonData.forEach((element) => {
      if (element.id == id) {
        res.send(element);
      }
    });
  } catch (error) {
    console.error("Error al leer el archivo:", error.message);
    res.sendStatus(500);
  }
});

module.exports = router;
