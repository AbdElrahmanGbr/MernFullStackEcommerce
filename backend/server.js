const app = require('./app');

const dotenv = require('dotenv')

const connectDatabase = require('./config/database')
dotenv.config({path:'backend/config/config.env'})
connectDatabase()
const server = app.listen(process.env.PORT, () =>{
    console.log(`Server started on Port : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})
