const { Schema, model } = require('mongoose');


const schema = new Schema({
    email: { type: String, required: true, match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Place enter valid email'] },
    hashedPassword: { type: String, required: true ,minlength:[4,'Password must be min 4 lomg']},
    gender: { type: String, required: true },
    trips: [{ type: Schema.Types.ObjectId, ref: 'Trip', default: [] }]
})
module.exports = model('User', schema)