if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router");
const listEditRouter = require("./list-edit-router");
const PORT = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const users = require("./users.json");

const typeMethod = (req, res, next) => {
  metodo = req.method;
  if (
    metodo === "GET" ||
    metodo === "POST" ||
    metodo === "PUT" ||
    metodo === "DELETE"
  ) {
    next();
  } else {
    return res.status(400).send("El metodo de la solicitud http no es valido");
  }
};

app.use(typeMethod);
app.use(express.json());
app.use("/listaTareas", listViewRouter);
app.use("/listaTareas", listEditRouter);

app.post("/login", (req, res) => {
  const {email, password,username} = req.body;
  const user = users.find((u) => {
    return u.email === email && u.password === password;
  });
  if (user) {
    const token = jwt.sign(
      {
        username: username,
        email: email,
      },
      process.env.SECRET_KEY
    );
    res.status(200).json({ token: token });
  } else {
    res.status(401).send("Usuario o contraseña incorrecta");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutandose exitosamente en el puerto ${PORT}`);
});
