import User from "./userModal.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "dotenv";

config();
const register = async (req, res) => {
  const { name, password, email } = req.body;

  const user_with_Email = await User.findOne({ email: email });

  if (user_with_Email) {
    res.status(400).json({
      error: `User Found with this Email`,
    });
    return;
  }

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, async function (err, hash) {
    if (hash) {
      await User.create({
        name,
        email,
        password: hash,
      })
        .then((result) => {
          res
            .status(201)
            .json({ msg: "Registeration Successfully", user: result });
        })
        .catch((error) => {
          res.status(400).json({
            error,
          });
        });
    } else {
      console.error(err);
    }
  });
};

const login = async (req, res) => {
  // const { email, password, loginType } = req.body
  const {  password, email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({
      error: `User Not Found with this email`,
    });
    return;
  }
  let obj = {
    email,
    name: user.name,
    id: user._id,
  };

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      const token = jwt.sign(obj, process.env.ACCESS_TOKEN, {
        expiresIn: process.env.EXPIRES_IN,
      });

      res.cookie("authToken", token, {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: false,
        sameSite: "none",
        maxAge: 120 * 60 * 60 * 1000,
        secure: true,
      });

      res.status(200).json({
        user,
        msg: "You Are Logged In Successfully",
        token,
      });
      return;
    } else {
      res.status(400).json({
        error: `${loginType} Or Password Doesn't Match`,
        err,
      });
      return;
    }
  });
};

export { login, register };
