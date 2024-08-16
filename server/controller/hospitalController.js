const appoinmentsModel = require('../db/appointmentsModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const Login = async (req, res) => {
    try {
        const { username, password } = req.body
        const userCheck = username === 'admin'
        if (!userCheck) {
            return res.status(401).send({ message: "Invalid Username" })
        }
        const passCheck = password === 'admin123'
        if (!passCheck) {
            return res.status(401).send({ message: "Invalid Password" })
        }
        const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET)
        return res.status(200).send({
            message: "Login Successful",
            token
        })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const appointmentsView = async (req, res) => {
    try {
        const access_token = req.headers.authorization
        if (!access_token) {
            return res.status(401).json({ message: "Unauthorized entry" })
        }
        const decoded = jwt.verify(access_token.replace("Bearer ", ""), process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" })
        }
        const allAppointments = await appoinmentsModel.find()
        return res.status(200).send(allAppointments)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const searchAppointments = async (req, res) => {
    try {
        const access_token = req.headers.authorization;
        if (!access_token) {
            return res.status(401).json({ message: "Unauthorized entry" });
        }
        const decoded = jwt.verify(access_token.replace("Bearer ", ""), process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" })
        }
        let   search_item  = req.query.search_item;
        if (!search_item) {
            return res.status(400).json({ message: "No value for searching" });
        }
        const tenDigitNumberRegex = /^\d{10}$/;

if (tenDigitNumberRegex.test(search_item)) {
  search_item = Number(search_item);
}
        const query = !isNaN(search_item) ? { "phone": Number(search_item) } : { "name": search_item };
        const data = await appoinmentsModel.find(query)
        if (data.length === 0) {
            return res.status(404).json({ message: "Not found" })
        }
        return res.status(200).send(data);
    } catch (error) {
        console.error('Search error:', error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const groupAppointments = async (req, res) => {
    try {
        const access_token = req.headers.authorization
        if (!access_token) {
            return res.status(401).json({ message: "Unauthorized entry" })
        }
        const decoded = jwt.verify(access_token.replace("Bearer ", ""), process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" })
        }
        const  doctor  = req.query.doctor
        if(!doctor){
            return res.status(200).send([])
        }
        const data = await appoinmentsModel.find({ doctor: { $regex: new RegExp(doctor, 'i') } });
        if (data.length === 0) {
            return res.status(404).json({ message: "No data found" })
        }
        return res.status(200).send(data)
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports = { Login, appointmentsView, searchAppointments, groupAppointments };
