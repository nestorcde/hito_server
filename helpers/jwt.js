const jwt = require('jsonwebtoken');


const generarJWT = ( uid ) => {
    return new Promise( ( resolve, reject)=>{
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY,{
            //expiresIn: '$ne'
            expiresIn: "24h"
        }, (err, token) => {
            if(err){
                reject('No se pudo crear el JWT');
            }else{
                resolve(token);
            }
        });
    });
};


module.exports = {
    generarJWT
};