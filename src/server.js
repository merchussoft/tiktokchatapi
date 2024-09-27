const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');



const app = express();
const server = http.createServer(app);


app.set('port', process.env.PORT || 3000);


app.use(cors());
app.use(morgan('dev'));



module.exports = { app, server}
