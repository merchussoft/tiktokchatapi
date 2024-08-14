const { app, server, io , connectToTiktok } = require('./src/app');



io.on('connection', socket => {
    console.log('nuevo cliente conectado');


    socket.on('connectToTiktok', async (username) => {
        console.log(`Recibido el usuario: ${username}`);
        await connectToTiktok(username);
    });


    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
})

server.listen(app.get('port'), () => console.log(`Servidor Express escuchando por el puerto ${app.get('port')}`));