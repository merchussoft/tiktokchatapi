const { emitToClient } = require('../services/emitToClient');


// Captura el evento cuando un viewer envia multiples regalos
module.exports = {
    name: "gift",
    execute: ({io, uniqueId, giftName, repeatCount, profilePictureUrl, giftType, repeatEnd}) => {
        let comment = (repeatEnd === 1) ? `[regalo] ${uniqueId} envio el regalo ${giftName} X${repeatCount}` : '';
    
        emitToClient(io, 'gift_multiple', {comment, profilePictureUrl, uniqueId})
    }
}