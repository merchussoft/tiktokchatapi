const { emitToClient } = require('../services/emitToClient');

module.exports = {
    name: "social",
    execute: ({io, displayType, uniqueId}) => {

        console.log('estamos mirando la data ===== ', displayType);
        //let comment = 'compartió la transmisión!';
    //emitToClient(io, 'share', {comment, nickname, profilePictureUrl, uniqueId})

        
    }
}