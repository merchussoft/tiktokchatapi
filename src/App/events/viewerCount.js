const { emitToClient } = require('../services/emitToClient');

module.exports = {
    name: "roomUser",
    execute: ({io, viewerCount}) => {
        let comment = `[viewers_count] ${viewerCount}`;
        emitToClient(io, 'roomUser', {comment})
    }
}