const { emitToClient } = require('../services/emitToClient');

module.exports = {
    name: "disconnected",
    execute: ({io, connectionState }) => {
        console.log('Desconectado del chat en vivo...');
        connectionState.is_connected = false;  // Cambia la propiedad del objeto global de estado
        emitToClient(io, 'disconnected', { message: 'Desconectado del chat en vivo...' });
    }
}