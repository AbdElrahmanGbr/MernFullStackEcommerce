const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config({ path: 'backend/config/config.env' });
// Connect to database
connectDatabase();
app.listen(process.env.PORT, () => {    // process.env.PORT is a variable that is set by Gbr
    console.log(`Listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})