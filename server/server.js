const express = require('express');
const app=express()
require('dotenv').config()
const PORT=process.env.PORT
const connect=require('./db/dbconnect')
const hospitalRoutes=require('./routes/hospitalRoutes')
const visitorRoutes=require('./routes/visitorRoutes')
const cors=require('cors')

connect()

app.use(express.json())

app.use(cors())
// Username: admin
// Password: admin123

app.use('/',visitorRoutes)
app.use('/hospital',hospitalRoutes)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})