const { WebcastPushConnection } = require('tiktok-live-connector');
const { emitToClient } = require('./emitToClient');
const events = require('../events');


let tiktok_live_connection = null;
let connectionState = { is_connected: false };

const connectToTiktok = async (io, username) => {

    if (connectionState.is_connected) {
        console.log(`ya este conectado a la sala de ${username}`);
        return;
    }

    tiktok_live_connection = new WebcastPushConnection(username);


    try {

        let {roomId} = await tiktok_live_connection.connect();
        connectionState.is_connected = true;
        console.log(`Conectado a la transmision en vivo de ${username}.`);
        emitToClient(io, 'connected', {message: `@${username} connected to roomId ${roomId}`});

        Object.keys(events).forEach(event_key => {
            let event = events[event_key];
            tiktok_live_connection.on(event.name, (data) => {
                event.execute({
                    io,
                    connectionState,
                    ...data
                })
            });
        })

    } catch (error) {
        console.log('Error al conectarse al tiktok-live-connector ====== ', error)
        emitToClient(io, 'error', {message: 'Error al conectarse a la sala'});
    }
}


module.exports = {
    connectToTiktok
}