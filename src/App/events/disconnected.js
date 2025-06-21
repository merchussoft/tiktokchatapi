const { emitToClient } = require('../services/emitToClient');
const { n8nCennect } = require('../hooks/n8nConnect');

module.exports = {
    name: "disconnected",
    execute: async ({io, connectionState }) => {
        console.log('Desconectado del chat en vivo...');
        connectionState.is_connected = false;  // Cambia la propiedad del objeto global de estado
        await n8nCennect({ message: 'gracias por todo el live ah terminado hasta una proxima...', link: ''})
        emitToClient(io, 'disconnected', { message: 'Desconectado del chat en vivo...' });
    }
}