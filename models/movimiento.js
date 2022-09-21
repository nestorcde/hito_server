const { Schema, model} = require('mongoose');



const MovimientoSchema = Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    idPais: {
        type: Schema.Types.ObjectId,
        ref: 'Paises',
        required: true
    },
    tipoIngreso: {
        type: Schema.Types.Number,
        required: true,
    },
    importe: {
        type: Schema.Types.Number,
        required: true,
    },
    fchHra: {
        type: Schema.Types.Date,
        required: true,
        default: Date.now()
    },
    cantidad: {
        type: Schema.Types.Number,
        required: true,
    }
},{
    timestamps: true
});

MovimientoSchema.method('toJSON', function(){
    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Movimientos', MovimientoSchema);