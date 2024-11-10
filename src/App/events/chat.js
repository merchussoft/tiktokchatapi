const { emitToClient } = require('../services/emitToClient');
const logger = require('../services/logger');

module.exports = {
    name: "chat",
    execute: ({io, comment, nickname, profilePictureUrl, uniqueId}) => {
        console.log(`[chat] Nuevo mensaje en el chat de ${uniqueId}: ${comment}`);
        logger.info({
            event: 'chat',
            nickname,
            profilePictureUrl,
            uniqueId,
            comment
        })
        emitToClient(io, 'chat', {comment, nickname, profilePictureUrl, uniqueId});
    }
}