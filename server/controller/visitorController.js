const appointmentsModel = require('../db/appointmentsModel.js')
const departmentModel = require('../db/departmentModel.js');
const doctorModel = require('../db/doctorModel.js');
const cron = require('node-cron')

cron.schedule('0 0 * * *', async () => {
    await departmentModel.updateMany({}, { $set: { tokenCount: 0 } });
    await appointmentsModel.deleteMany({});
});

const createAppointment = async (req, res) => {
    const maxCapacity = 100
    try {
        const { name, phone, department } = req.body;
        const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if(!name){
            return res.status(400).json({message:"Please enter the name"})
        }
        if (!regex.test(phone)) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }
        const duplicate = await appointmentsModel.findOne({ phone });
        if (duplicate) {
            return res.status(409).json({ message: "Appointment Already Exists" });
        }
        const deptData = await departmentModel.findOne({ dept_name: department });
        if (!deptData) {
            return res.status(404).json({ message: "Department not found" });
        }
        const deptID = deptData._id;
        const doctors = await doctorModel.find({ dept: deptID });
        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }
        const lastToken = await departmentModel.findOne({ dept_name: department });
        let tokenCount = lastToken ? lastToken.tokenCount + 1 : 1;
        if (tokenCount > maxCapacity) {
            return res.send({ message: "Maximum capacity reached" })
        }
        else {
            const pos = (tokenCount - 1) % doctors.length;
            const selected = doctors[pos].doctor_name;
            const lastDoctorToken = await appointmentsModel.findOne({ doctor: selected }).sort({ token: -1 });
            const newToken = lastDoctorToken ? lastDoctorToken.token + 1 : 1
            await departmentModel.updateOne({ dept_name: department }, { $set: { tokenCount } }, { upsert: true })
            const newAppointment = new appointmentsModel({
                name,
                phone,
                department,
                token: newToken,
                doctor: selected
            });
            await newAppointment.save();
            return res.status(200).send({ message: "Appointment created", token: newToken, doctor: selected });
        }
    } catch (error) {
        console.error('Appointment creation error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { createAppointment };
