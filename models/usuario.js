const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    
    idUsuario: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    chPassword: {
        type: Boolean,
        required: true,
        default: true
    },
    tipo: {
        type: String,
        required: true,
    }
});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, createdAt, updatedAt, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Usuario', UsuarioSchema);