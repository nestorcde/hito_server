const { Schema, model} = require('mongoose');
const paises = require('./paises');



const ParametroSchema = Schema({
    precioLocal: {
        type: Schema.Types.Number,
        required: true,
    },
    plusMercosur: {
        type: Schema.Types.Number,
        required: true,
    },
    plusNoMercosur: {
        type: Schema.Types.Number,
        required: true,
    },
    plusFinde: {
        type: Schema.Types.Number,
        required: true,
    },
    descMenores: {
        type: Schema.Types.Number,
        required: true,
    },
    descMayores: {
        type: Schema.Types.Number,
        required: true,
    },
    paises: {
        type: Schema.Types.ObjectId,
        ref: 'Paises',
        required: true
    },
    ingresoSinImpresora: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

ParametroSchema.method('toJSON', function(){
    const { __v, _id,  createdAt, updatedAt, ...object} = this.toObject();
    object.uid = _id;
    object.paises.uid= paises._id;
    return object;
});

module.exports = model('Parametro', ParametroSchema);