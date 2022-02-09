const mongoose = require ('mongoose');
const { Schema } = mongoose;

const AdultoSubschema = new Schema({
	adulto: {type:Schema.Types.ObjectId, required:true, ref: 'Adulto'},
	parentesco: {type:String, required:true},
	adulto_responsable: {type:Boolean, required:true}	
}, { _id : false });

const NinoSchema = new Schema({
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
	asiste_valoracion: {type:Boolean, required:true},
	grupo_sanguineo: {type:String, required:false},
	vacunacion_completa: {type:Boolean, required:true},
	discapacidades: [{type:String, required:true}],
	alergias: [{type:String, required:true}],
	domicilio: {
		direccion: {type:String, required:true},
		barrio: {type:String, required:true},
		municipio: {type:String, required:true},
		departamento: {type:String, required:true}
	},
	adultos: [ AdultoSubschema ]
});

module.exports = mongoose.model('Nino', NinoSchema);
