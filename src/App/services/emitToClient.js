const emitToClient = (io, event, data) => {
    if (io) {
        io.emit(event, data);
    } else {
        console.error('Socket.io no está inicializado.');
    }
}


module.exports = {
    emitToClient
}