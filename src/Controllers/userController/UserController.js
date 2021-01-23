const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../../Models/user/User");

async function generateToken(params = {}) {
  console.log(process.env.privateKey);

  let token = await jwt.sign(params, process.env.privateKey, {
    expiresIn: 86400,
    algorithm: "RS256",
  });
  return token;
}

module.exports = {
  async createUser(req, res) {
    try {
      const { name, email, pass } = req.body;

      if (!name || !email || !pass) {
        return res.status(400).json({
          error: "Preencha todos os campos.",
        });
      }

      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          error: "Usuario já cadastrado.",
        });
      }

      user = await User.create({
        name,
        email,
        pass,
      });

      return res.json(user);
    } catch (err) {
      console.log("Error:" + err);
    }
  },

  async login(req, res) {
    const { email, pass } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({ message: "Usuario não cadastrado" });

    if (!(await bcrypt.compare(pass, user.pass)))
      return res.status(400).json({ message: "Senha incorreta" });

    res.send({
      user,
      token: generateToken({ id: user.id }),
    });
  },
};
