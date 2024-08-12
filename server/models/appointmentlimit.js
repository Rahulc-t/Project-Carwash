const { Schema } = require('mongoose');
const { model } = require('mongoose');

const limit = new Schema({
    date: { type: String, required: true,unique:true},
    morning: { type: Number, required: true },
    afternoon: { type:Number ,required:true },
    overnight: { type:Number,required:true },
});

const limits = model('limit', limit);
module.exports = limits;
