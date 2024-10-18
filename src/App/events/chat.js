const { emitToClient } = require('../services/emitToClient');

module.exports = {
    name: "chat",
    execute: ({io, comment, nickname, profilePictureUrl, uniqueId}) => {
        console.log(`[chat] Nuevo mensaje en el chat de ${uniqueId}: ${comment}`);
        emitToClient(io, 'chat', {comment, nickname, profilePictureUrl, uniqueId})
    }
}