const jwt = require('jsonwebtoken');

//=====================
//VERIFICAR TOKEN
//=====================

let tokenVerify = (req, res, next) => {

    //Para obtener la info de los headers se usa el req.get('nombredelparametro')
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Token no valido"
                }
            });
        }

        //para obtener información de cada usuario
        req.usuario = decoded.usuario;

        //Para que una vez que se aplica el middleware, se continúe con el código normalmente 
        next();

    })

    //console.log(token);

};

//=====================
//VERIFICAR ADMIN ROL
//=====================

let adminVerify = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        res.json({
            ok: false,
            err: {
                message: "El usuario no es Admin"
            }
        })

    }
}


module.exports = {
    tokenVerify,
    adminVerify
}