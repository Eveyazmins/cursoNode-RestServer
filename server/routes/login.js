const express = require('express');
const User = require('../models/user');
const bycript = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const router = express.Router();

router.post('/login', (req, res) => {
    //let body = req.body;
    let { email, password } = req.body;

    User.findOne({ email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "email no valido"
                }
            });
        }

        /** Encripta la contraseña ingresada y compara contraseñas encriptadas. 
         * En este caso encripta la contraseña ingresada y la compara con la password de mi objeto 
         * usuario recuperado con el email
         */
        if (!bycript.compareSync(password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "password no valida"
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });
});


module.exports = router;