const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    dept_name: String,
    tokenCount: Number
})

const departmentModel = mongoose.model("Department", departmentSchema)

module.exports = departmentModel;