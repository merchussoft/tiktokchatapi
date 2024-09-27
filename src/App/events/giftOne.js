const { emitToClient } = require('../services/emitToClient');

module.exports = {
    name: "gift",
    execute: ({io, uniqueId, giftName, repeatCount, profilePictureUrl, giftType, repeatEnd}) => {
        let comment = `[regalo] ${uniqueId} envio el regalo ${giftName} X${repeatCount}`;
        let coment_especial = (giftType === 1 && repeatEnd) ? `${uniqueId} ha enviado un regalo especial` : '';
    
        emitToClient(io, 'gift_one', {comment, coment_especial, profilePictureUrl, uniqueId})
    }
}