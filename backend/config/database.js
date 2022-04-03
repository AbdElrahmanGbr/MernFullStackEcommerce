const mongoose = require("mongoose");
const dotenv = require("dotenv");
// var os = require("os");
dotenv.config({ path: "backend/config/config.env" });

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(`mongoDB connected with HOST : ${con.connection.host}`);

      //   console.log(req.headers.host);
    });
};
module.exports = connectDatabase;
// npm i bcryptjs body-parser cloudinary cookie-parser dotenv express express-fileupload jsonwebtoken mongoose nodemailer stripe validator
//DB_LOCAL_URI = mongodb+srv://AbdelrahmanGbr:1234@cluster0.67qbv.mongodb.net/ITShop?retryWrites=true&w=majority
