const { app, server, io , connectToTiktok } = require('./src/app');



io.on('connection', socket => {
    console.log('nuevo cliente conectado');


    socket.on('connectToTiktok', async (username) => {
        console.log(`Recibido el usuario: ${username}`);
        let res_ip = await fetch('https://ipinfo.io', { headers: { "Accept": "application/json"}});
        let json_ip = await res_ip.json();
        let ip_connected = json_ip.ip.replace(/\./g, "");
        

        socket.join(`${username}_${ip_connected}`);
        await connectToTiktok(username);
    });


    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
})

server.listen(app.get('port'), () => console.log(`Servidor Express escuchando por el puerto ${app.get('port')}`));