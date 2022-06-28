const { Schema, model } = require('mongoose')

const schema = new Schema({
    startPoint: { type: String, required: [true, 'Start point is required'], minlength: [4, 'Start poin must be 4 char length'] },
    endPoint: { type: String, required: [true, 'Data is required'], minlength: [4, 'Start poin must be 4 char length'] },
    date: { type: String, required: [true, 'Data is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    imageUrl: { type: String, required: [true, 'Car image is required'], match: [/^https?/, 'Car image must be a valid URL'] },
    brand: { type: String, required: [true, 'Car brand is required'], minlength:[4,'Car brand must be min 4 char length. BMW??? VW??? ZAZ??? UAZ??? .....'] },
    seats: { type: Number, required: [true, 'Seats is required'],min:[0,'Seats must be positive number'],max:[4,'Seats must be max 4'] },
    price: { type: Number, required: [true, 'Price is required'] ,min:[1,'Price must be min 1'],max:[50,'Price must be max 50']},
    description: { type: String, required: [true, 'Description is required'],minlength:[10,'Description mus be min 10 char']},
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    buddies: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],



})

module.exports = model('Trip', schema);