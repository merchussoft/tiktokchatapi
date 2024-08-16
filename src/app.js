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


const emitToClient = (event, data) => {
    io.emit(event, data)
}


const connectToTiktok = async (username) => {
    if (is_connected) {
        console.log(`ya este conectado a la sala de ${username}`);
        return;
    }

    tiktok_live_connection = new WebcastPushConnection(username, {
        processInitialData: false,
        enableExtendedGiftInfo: true,
        enableWebsocketUpgrade: true,
    });

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

        tiktok_live_connection.on('streamEnd', (actionId) => {
            if (actionId === 3) {
                console.log('Stream ended by user');
            }
            if (actionId === 4) {
                console.log('Stream ended by platform moderator (ban)');
            }
        })



        tiktok_live_connection.on('chat', ({comment, nickname, profilePictureUrl}) => {
            emitToClient('chat', {comment, nickname, profilePictureUrl})
        });


        tiktok_live_connection.on('like', ({likeCount, totalLikeCount, nickname, profilePictureUrl}) => {
            let comment = `${nickname} le dio me gusta al LIVE`
            emitToClient('like', {likeCount, totalLikeCount, nickname, profilePictureUrl, comment})
        });

        tiktok_live_connection.on('member', data => {
            console.log(data);
        });

        tiktok_live_connection.on('roomUser', data => {
            console.log(data);
        });

        tiktok_live_connection.on('follow', (data) => {
            console.log(data);
            console.log(data.uniqueId, "followed!");
        });

        tiktok_live_connection.on('share', (data) => {
            console.log(data);
            console.log(data.uniqueId, "shared the stream!");
        });

        tiktok_live_connection.on('subscribe', (data) => {
            console.log(data);
            console.log(data.uniqueId, "subscribed!");
        });

        tiktok_live_connection.on('liveIntro', (msg) => {
            console.log(msg);
        })

    } catch (error) {
        console.log('Error al conectarse al tiktok-live-connector', error)
        emitToClient('error', {message: 'Error al conectarse a la sala'});
    }

}

module.exports = { app, server, io, connectToTiktok}