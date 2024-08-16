const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    token: Number,
    department: String,
    doctor:String
});

const appointmentsModel = mongoose.model('Appointments', appointmentsSchema);

module.exports = appointmentsModel;
