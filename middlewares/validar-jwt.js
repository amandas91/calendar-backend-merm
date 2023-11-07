const {response} = require('express');
var jwt = require('jsonwebtoken');

const ValidarJWT = (req, res=response, next) =>{
    //x-token headers
    const token = req.header('x-token');
    // 
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la petición'
        });
    }

    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SED
        );
        const {uid, name} = payload;
        //console.log(payload);
        req.uid = uid;
        req.name = name;
        

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token no valido'
        });
    }

    next();
}

module.exports = {
    ValidarJWT
}