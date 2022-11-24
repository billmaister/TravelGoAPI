const User = require("../models/Users");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Please provide email and password." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ msg: `No user or wrong email and password.` });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: `Credentials are invalid.` });
    }

    const token = user.createToken();
    return res.status(200).json({
      success: true,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: `${error}` });
  }
};

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = user.createToken();
    res.status(200).json({
      success: true,
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: `${error}` });
  }
};

module.exports = {
  login,
  register,
};
