const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports.registerstudent = async (req,res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({ 
                message: "Some fields are missing" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: "User Already exists" 
            });
        }
        const isTutor = false;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({ isTutor, email, password : passwordHash });
        const savedUser = await newUser.save();
        const token = jwt.sign(
          {
            userId: savedUser._id,
            isTutor: savedUser.isTutor,
            email: savedUser.email,
          },
          process.env.JWT_SECRET
        );
        res.cookie("token", token, {
            httpOnly: true,
          }).send();
      } catch (err) {
        console.error(err);
        return res.status(500).json({
            message : "Server Error"
        });
    }

}

module.exports.registertutor = async (req,res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password ) {
            return res.status(400).json({ 
                message: "Some filelds are missing." 
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: "User Already exists" 
            });
        }
        const isTutor = true;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({ isTutor, email, password : passwordHash });
        const savedUser = await newUser.save();
        const token = jwt.sign(
          {
            userId: savedUser._id,
            isTutor: savedUser.isTutor,
            email: savedUser.email,
          },
          process.env.JWT_SECRET
        );
        res.cookie("token", token, {
            httpOnly: true,
          }).send();
      } catch (err) {
        console.error(err);
        return res.status(500).json({
            message : "Server Error"
        });
    }

}

module.exports.login = async (req,res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ 
              message: "Some fields are missing" 
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ 
              message: "Email/Password is wrong" 
            });
        }

        const auth = await bcrypt.compare(
          password,
          existingUser.password
        );

        if (!auth) {
            return res.status(401).json({ 
              message: "Email/Password is wrong" 
            });
        }
        const token = jwt.sign(
          {
            userId: existingUser._id,
            isTutor: existingUser.isTutor,
            email: existingUser.email,
          },
          process.env.JWT_SECRET
        );
        res.cookie("token", token, {
            httpOnly: true,
        }).send();
      } catch (err) {
        console.error(err);
        return res.status(500).json({
            message : "Server Error"
        });
    }
}

module.exports.logout = (req,res) => {
  res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
  }).send();
}
