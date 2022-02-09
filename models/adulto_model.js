const mongoose = require('mongoose');

const AdultoSchema = new mongoose.Schema({
    nombres: {type:String, required:true},
	apellidos: {type:String, required:true},
	identificacion: {
		tipo: {type:String, required:true},
		numero: {type:String, required:true, unique:true},
		lugar: {
			departamento: {type:String, required:true},
			municipio: {type:String, required:true}
		}
	},
	genero: {type:String, required:true},
	nacimiento: {
		fecha: {type:Date, required:true},
		lugar: {
			departamento: {type:String, required:true},
			municipio: {type:String, required:true}
		}
	},
	domicilio: {
		direccion: {type:String, required:true},
		barrio: {type:String, required:true},
		municipio: {type:String, required:true},
        departamento: {type:String, required:true}
	},
	telefonos: [{type:Number, required:true}],
	estado_civil: {type:String, required:true},
	ocupacion: {type:String, required:true}
});

module.exports = mongoose.model('Adulto', AdultoSchema);