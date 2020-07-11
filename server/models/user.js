const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}



const userSchema = new Schema({
    //aca van los datos que quiero que tengan mis tareas con sus tipos de dato como se van a almacenar en la db
    name: {
        type: String,
        required: [true, "El nombre es necesario"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "El mail es necesario"]
    },
    password: {
        type: String,
        required: [true, "La password es necesaria"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

/* El metodo toJSON se llama siempre que se quiere imprimir un objeto.
Lo vamos a usar para no hacer visible la pass en el objeto usuario. Es decir, cuando se imprima o consulte
un objeto user, se van a mostrar todos los atributos menos el password */

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}


userSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('User', userSchema);