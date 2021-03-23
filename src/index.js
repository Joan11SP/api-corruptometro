var express = require('express');
var app = express();
var cors = require('cors')
require('./Database/mysql');
var morgan = require('morgan');
var routes = require('./Routes/routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/api-corruptometro',routes);

var port = process.env.PORT || 3005;

app.listen(port,(err) => {
    if (err) throw err;
    console.log('conectado al puerto ',port)
});
