const express = require('express');
const morgan = require('morgan');
const mongoose = require('./connection');
const cors = require('cors');
const app = express();

//Configuración
app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//Lista de rutas base
app.get('/', (req, res) => {
	res.send(process.env.npm_package_name + " iniciado")
});
app.use('/api/ninos', require('./routes/nino_routes'));
app.use('/api/adultos', require('./routes/adulto_routes'));

//Arranque
app.listen(app.get('port'), ()=> {
	console.log(process.env.npm_package_name + " iniciado en puerto "+ app.get('port'))
});

