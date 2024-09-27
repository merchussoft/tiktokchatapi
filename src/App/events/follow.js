const { emitToClient } = require('../services/emitToClient');

module.exports = {
    name: "follow",
    execute: ({io, profilePictureUrl, uniqueId}) => {
        let comment = '[Follow] Nuevo seguidor: ';
        emitToClient(io, 'follow', {comment, nickname, profilePictureUrl, uniqueId})
    }
}