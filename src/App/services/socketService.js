const socketIo = require('socket.io');
const { connectToTiktok } = require('./tiktokService');

const  io = null;

const initSocket = (server) => {

    const io = socketIo(server, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', socket => {
        console.log('nuevo cliente conectado');
    
        socket.on('connectToTiktok', async (username) => {
            console.log(`Recibido el usuario: ${username}`);
            let res_ip = await fetch('https://ipinfo.io', { headers: { "Accept": "application/json"}});
            let json_ip = await res_ip.json();
            let ip_connected = json_ip.ip.replace(/\./g, "");
            
    
            socket.join(`${username}_${ip_connected}`);
            await connectToTiktok(io, username);
        });
    
    
        socket.on('disconnect', () => {
            console.log('Cliente desconectado')
        })
    })
}


module.exports = {
    initSocket
}