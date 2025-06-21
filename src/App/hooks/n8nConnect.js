const axios = require('axios');

const n8nCennect = async (params) => {

    try {
        //return await axios.post('https://n8n-wldy.onrender.com/webhook-test/tiktokstatus', params);
        return await axios.post(process.env.LINK_N8N_FACEBOOK_POST, params)
    } catch (error) {
        return {};
    }
   
    
}


module.exports = {
    n8nCennect
}