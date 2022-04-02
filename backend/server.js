const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');
// Handle uncaughtException
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down...duo to uncaughtException');
    process.exit(1);
});
// Load environment variables from .env file
dotenv.config({ path: 'backend/config/config.env' });
// Connect to database
connectDatabase();
const server = app.listen(process.env.PORT, () => {    // process.env.PORT is a variable that is set by Gbr
    console.log(`Listening on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    console.log('Closing server...duo to unhandled promise rejection');
    // Close server & exit process
    server.close(() => process.exit(1));
});