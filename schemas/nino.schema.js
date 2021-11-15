const mongoose = require ('mongoose');
const { Schema } = mongoose;

const NinoSchema = new Schema({
	nombres: {type:String, required:true},
	apellidos: {type:String, required:true},
	identificacion: {
		tipo: {type:String, required:true},
		numero: {type:Number, required:true},
		expedicion: {
			municipio: {type:String, required:true},
			departamento: {type:String, required:true}
		}
	},
	nacimiento: {
		fecha: {type:Date, required:true},
		lugar: {
			municipio: {type:String, required:true},
			departamento: {type:String, required:true}
		}
	},
	genero: {type:String, required:true},
	gruposanguineo: {type:String, required:true}
});

module.exports = mongoose.model('Nino', NinoSchema);
