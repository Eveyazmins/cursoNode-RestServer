const express = require('express');
const User = require('../models/user');
const bycript = require('bcrypt');
const _ = require('underscore');
const { tokenVerify, adminVerify } = require('../middlewares/authentication');
const router = express.Router();
const app = express();

//El segundo parametro es la aplicación del middleware personalizado para verificar token.
router.get('/user', tokenVerify, async(req, res) => {

    /* PAGINADO:
    .skip() hace que se muestren los registros desde el indice que le paso por parametro opcional en la
    URL.
    .limit() hace que me muestre una cantidad determinada de registros */

    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 3;
    limit = Number(limit);

    /* Si en el .find al lado de las {} pongo , 'atributo1 atributo2' puedo filtrar los campos
    que quiero ver en el return  */
    const users = await User.find({})
        .skip(from)
        .limit(limit)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            User.count({}, (err, conteo) => {
                res.json({
                    usuarios,
                    cant: conteo
                });

            });


        });

});


router.post('/user', [tokenVerify, adminVerify], async(req, res) => {
    const { name, email, password, img, role, status, google } = req.body;
    const user = new User({
        name,
        email,
        password: bycript.hashSync(password, 10),
        img,
        role,
        status,
        google
    });
    console.log(user);
    await user.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            status: 'user saved',
            ok: true,
            usuario: usuarioDB
        });
    });
});


router.put('/user/:id', [tokenVerify, adminVerify], async(req, res) => {

    let id = req.params.id;
    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);
    //console.log(newUser);
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await User.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            status: 'user modified',
            ok: true,
            usuario: usuarioDB
        });

    });

});

/*
router.delete('/user/:id', async(req, res) => {
    await User.findByIdAndRemove(req.params.id, (err, userDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!userDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "User doesn't exist!"
                }
            })

        }

        res.json({
            status: 'user deleted',
            ok: true,
            usuario: userDeleted
        });


    });

});

*/


/** Para que al enviar un delete cambie el estado de true a false (eliminación lógica - deshabilitar) */
router.delete('/user/:id', [tokenVerify, adminVerify], async(req, res) => {

    let id = req.params.id;
    let changeStatus = {
        estado: false
    };
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await User.findByIdAndUpdate(id, changeStatus, { new: true, context: 'query' }, (err, userDeleted) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        res.json({
            status: 'user deleted',
            ok: true,
            usuario: userDeleted
        });

    });

});




module.exports = router;