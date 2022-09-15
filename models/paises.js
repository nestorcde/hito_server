const { Schema, model} = require('mongoose');



const PaisSchema = Schema({
    idPais: {
        type: Schema.Types.Number,
        required: true,
    },
    nombre: {
        type: Schema.Types.String,
        required: true,
    },
    mercosur: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    }
},{
    timestamps: true
});

PaisSchema.method('toJSON', function(){
    const { __v, _id, createdAt, updatedAt, ...object} = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Paises', PaisSchema);