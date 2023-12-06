const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ mensaje: "No se ha encontrado el token" });
  } else {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ mensaje: "El token es invalido" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = { auth };
