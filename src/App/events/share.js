const { emitToClient } = require('../services/emitToClient');

module.exports = {
    name: "share",
    execute: ({io, nickname, profilePictureUrl, uniqueId}) => {
        let comment = '[Share] compartió la transmisión!';
        emitToClient(io, 'share', {comment, nickname, profilePictureUrl, uniqueId})
    }
}