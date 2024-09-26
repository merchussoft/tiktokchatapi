const express = require('express');
const { WebcastPushConnection } = require('tiktok-live-connector');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');



const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
})

app.set('port', process.env.PORT || 3000);


app.use(cors());
app.use(morgan('dev'));

let tiktok_live_connection = null;
let is_connected = false;
let user_likes = {};
let viewerCount = 0;


const emitToClient = (event, data) => {
    io.emit(event, data)
}


const connectToTiktok = async (username) => {
    if (is_connected) {
        console.log(`ya este conectado a la sala de ${username}`);
        return;
    }

    tiktok_live_connection = new WebcastPushConnection(username);

    try {
        let {roomId} = await tiktok_live_connection.connect();
        is_connected = true;
        console.log(`Conectado a la transmision en vivo de ${username}.`);
        emitToClient('connected', {message: `@${username} connected to roomId ${roomId}`});

        tiktok_live_connection.on('disconnected', () => {
            console.log('desconectado del chat en vivo...');
            is_connected = false;
            emitToClient('disconnected', {message: 'desconectado del chat en vivo...'})
        });

	tiktok_live_connection.on('streamEnd', () =>{
	    console.log('La transmision ha terminado');
	    is_connected = false;
	    emitToClient('streamEnd', {message: 'La transmision ha terminado'});
	})


        tiktok_live_connection.on('chat', ({comment, nickname, profilePictureUrl, uniqueId}) => {
            emitToClient('chat', {comment, nickname, profilePictureUrl, uniqueId})
        });


        tiktok_live_connection.on('like', ({likeCount, totalLikeCount, nickname, profilePictureUrl, uniqueId}) => {
            const user_id = uniqueId; // obtenemos el ID del usuario que ah dado like
            let data_return = {totalLikeCount}

            // verificamos si el usuario ya envio un like
            if(!user_likes[user_id]){
                user_likes[user_id] = true;
                let comment = 'le dio me gusta al LIVE'
                data_return = {likeCount, totalLikeCount, nickname, profilePictureUrl, comment, uniqueId}
            }

            emitToClient('like', data_return)
        });

        tiktok_live_connection.on('member', ({ nickname, profilePictureUrl, uniqueId }) => {
            let comment = `${uniqueId} se unió a la transmision`
            emitToClient('member', {comment, nickname, profilePictureUrl, uniqueId})
        });

        tiktok_live_connection.on('roomUser', data => {
            console.log('roomUser', data);
        });

        tiktok_live_connection.on('follow', (data) => {
            console.log('follow', data);
            console.log(data.uniqueId, "followed!");
        });

        tiktok_live_connection.on('share', ({nickname, profilePictureUrl, uniqueId}) => {
            let comment = 'compartió la transmisión!';
            emitToClient('share', {comment, nickname, profilePictureUrl, uniqueId})
        });

        tiktok_live_connection.on('subscribe', (data) => {
            console.log('subscribe', data);
            console.log(data.uniqueId, "subscribed!");
        });

    } catch (error) {
        console.log('Error al conectarse al tiktok-live-connector', error)
        emitToClient('error', {message: 'Error al conectarse a la sala'});
    }

}

module.exports = { app, server, io, connectToTiktok}
