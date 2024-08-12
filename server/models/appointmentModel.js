const { Schema } = require('mongoose');
const { model } = require('mongoose');

const appointmentsDetails = new Schema({
    name: { type: String, required: true },
    appemail: { type: String, required: true },
    carmodel: { type: String },
    address: { type: String },
    phone: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    service: { type: String, required: true },
    remarks: { type: String },
    image: { 
        type: String,  // Store the file path of the uploaded image
    },
    status: { type: String}
});

const appointmentDetails = model('appointmentdetails', appointmentsDetails);
module.exports = appointmentDetails;
