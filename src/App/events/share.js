const { emitToClient } = require('../services/emitToClient');
const logger = require('../services/logger');

module.exports = {
    name: "share",
    execute: ({io, nickname, profilePictureUrl, uniqueId}) => {
        let comment = '[Share] compartió la transmisión!';

        logger.info({
            event: 'share',
            nickname,
            profilePictureUrl,
            uniqueId,
            comment
        })

        emitToClient(io, 'share', {comment, nickname, profilePictureUrl, uniqueId})
    }
}