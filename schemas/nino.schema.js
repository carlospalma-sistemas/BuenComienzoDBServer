const mongoose = require ('mongoose');
const { Schema } = mongoose;

const NinoSchema = new Schema({
	nombres : { type: String, required: true },
	apellidos : { type: String, required: true },
	documento : { type: {
		tipo : { type: String, required: true },
		numero : { type: Number, required: true },
	}, required: true },
});

module.exports = mongoose.model('Nino', NinoSchema);
