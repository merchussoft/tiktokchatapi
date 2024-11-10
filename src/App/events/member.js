const { emitToClient } = require('../services/emitToClient');
const logger = require('../services/logger');

module.exports = {
    name: "member",
    execute: ({io, uniqueId}) => {
        let comment = `[member] se une a la transmisión`;
        
        
        logger.info({
            event: 'member',
            uniqueId,
            comment
        })
        
        emitToClient(io, 'roomUser', {comment, uniqueId})
    }
}