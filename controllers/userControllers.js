const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const newUser = new userModel(req.body);
  try {
    newUser.password = await bcrypt.hash(req.body.password, 10);
    const response = await newUser.save();
    response.password = undefined;
    res.status(201).json({ message: "Success", data: response });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Auth failed, Invalid email or password" });
    }
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .json({ message: "Auth failed, Invalid email or password" });
    }

    const token_object = {
      _id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    const jwtToken = jwt.sign(token_object, process.env.SECRET, { expiresIn: "4h" });
    return res.status(200).json({ jwtToken, token_object });
  } catch (error) {
    res.status(500).json({ message: "error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
