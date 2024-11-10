const { emitToClient } = require('../services/emitToClient');
const logger = require('../services/logger');

module.exports = {
    name: "follow",
    execute: ({io, profilePictureUrl, uniqueId}) => {
        let comment = '[Follow] Nuevo seguidor: ';

        logger.info({
            event: 'follow',
            nickname,
            profilePictureUrl,
            uniqueId,
            comment
        })

        emitToClient(io, 'follow', {comment, nickname, profilePictureUrl, uniqueId})
    }
}