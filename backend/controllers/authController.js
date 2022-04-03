const User = require("../models/user");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

//register a user =>/api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id:
        "564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue-thumbnail.png",
      url: "https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue-thumbnail.png",
    },
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,
  });
});

//login a user =>/api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }
  //find user in database

  const user = await User.findOne({ email }).select("+password");
  //check if password is correct or not
  // const isPasswordCorrect = await user.comparePassword(password);
  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Please enter email and password", 401));
  }

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
}); //end of loginUser
