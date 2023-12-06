const verifyBody = (req, res, next) => {
    if ((req.method === "POST") || (req.method === "PUT")) {
      if (Object.keys(req.body).length === 0) {
        return res.status(400).json({mensaje:"La solicitud está vacía"});
      }else if(Object.keys(req.body).length!=3){
        return res.status(400).json({mensaje:"Falta un argumento en la solicitud"});
      }else if(typeof req.body.id != "number"){
        return res.status(400).json({mensaje:"El argumento de id es invalido"});
      }else if(typeof req.body.isCompleted != "boolean"){
        return res.status(400).json({mensaje:"El argumento de isCompleted es invalido"});
      }else if(typeof req.body.description != "string"){
        return res.status(400).json({mensaje:"El argumento de description es invalido"});
      }
    }
    next();
  };

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
      return res.status(400).json({mensaje:"El metodo de la solicitud http no es valido"});
    }
  };

  const verifyParams = (req, res, next) => {
    const id = req.params.id;
  
    if (isNaN(parseInt(id))) {
      return res.status(400).json( {mensaje:'El parámetro id debe ser un número.'} );
    }
    next(); 
  };
  

  module.exports = {verifyBody,typeMethod,verifyParams};