const User = require("../models/User");
const envUtil = require("../util/envUtil");
const cryptoUtil = require("../util/cryptoUtil");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(200).json({
        status: 0,
        message: "Name, email and Password are required to register !",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        status: 0,
        message: "This email is already in use, please use a different one !",
      });
    }

    const newUser = new User({
      name,
      email,
      password: cryptoUtil.createHash(password),
    });

    await newUser.save();

    return res
      .status(200)
      .json({ status: 1, message: "Registered successfully " });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      status: 0,
      message: "Something went wrong in registering you, please try again !",
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ status: 0, message: "Invalid email or password" });
    }

    const hashedPassword = cryptoUtil.createHash(password);

    if (hashedPassword !== user.password) {
      return res
        .status(200)
        .json({ status: 0, message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      envUtil.getJwtSecret(),
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: 1,
      token,
      userData: user,
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 0, message: "Internal server error", error });
  }
};
