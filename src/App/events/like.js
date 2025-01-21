const { emitToClient } = require('../services/emitToClient');
const logger = require('../services/logger');
const axios = require('axios');
let user_likes = {};

module.exports = {
    name: "like",
    execute: ({io, likeCount, totalLikeCount, nickname, profilePictureUrl, uniqueId }) => {
        
        let data_return = {totalLikeCount}

        if(!user_likes[uniqueId]){
            user_likes[uniqueId] = true;
            let comment = '[Like] le dio me gusta al LIVE'
            data_return = {likeCount, totalLikeCount, nickname, profilePictureUrl, comment, uniqueId}
        }

        
        logger.info({
            event: 'like',
            data_return
        })

        emitToClient(io, 'like', data_return)
    }
}