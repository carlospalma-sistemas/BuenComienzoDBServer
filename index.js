const express = require('express');
const morgan = require('morgan');
const mongoose = require('./connection');
const app = express();

//Configuración
app.set('port', 3000)
app.use(morgan('dev'))
app.use(express.json())

//Lista de rutas base
app.use('/api/ninos', require('./routes/nino.routes'));

//Arranque
app.listen(app.get('port'), ()=> {
	console.log("BuenComienzoDBServer iniciado")
});

