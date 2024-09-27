const { app, server } = require('./src/server');
const {initSocket} = require('./src/App/services/socketService');


initSocket(server);

server.listen(app.get('port'), () => console.log(`Servidor Express escuchando por el puerto ${app.get('port')}`));