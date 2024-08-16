const mongoose = require('mongoose')

const doctorsSchema = new mongoose.Schema({
    doctor_name: String,
    dept: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    }
})

const doctorModel = mongoose.model("Doctor", doctorsSchema)

module.exports = doctorModel