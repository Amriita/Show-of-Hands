const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
module.exports = {
  async store(req, res) {
    try {
      const { UniqueId, password } = req.body;

      if (!UniqueId || !password) {
        return res.status(200).json({ message: "Required field missing!" });
      }

      const user = await User.findOne({ UniqueId });
      if (!user) {
        return res.status(200).json({
          message: "User not found! Do you want to register instead?",
        });
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = {
          _id: user._id,
          UniqueId: user.UniqueId,
          firstName: user.firstName,
          lastName: user.lastName,
        };
        return jwt.sign({ user: userResponse }, "secret", (err, token) => {
          return res.json({
            user: token,
            user_id: userResponse._id,
          });
        });
      } else {
        return res
          .status(200)
          .json({ message: "UniqueId or Password does not match!" });
      }
    } catch (error) {
      throw Error(`Error while Authenticating a User ${error}`);
    }
  },
};
