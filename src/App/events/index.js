const chatEvent = require('./chat');
const disconectedEvent = require('./disconnected');
const likeEvent = require('./like');
const shareEvent = require('./share');
//const socialEvent = require('./social');
const gifOneEvent = require('./giftOne');


module.exports = {
    chatEvent,
    disconectedEvent,
    likeEvent,
    shareEvent,
    gifOneEvent
}