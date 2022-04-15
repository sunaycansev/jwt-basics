import CustomAPIError from "../errors/custom-error.js";
import jwt from "jsonwebtoken";
export const login = async (req, res) => {
  //check username, password in post request if exist create new JWT then send back to client
  // const { username, password } = req.body;
  // if (!username || !password) {
  //   return res.status(400).send({
  //     message: "Please provide username and password"
  //   });
  // }
  // const user = await User.findOne({ username });
  // if (!user) {
  //   return res.status(400).send({
  //     message: "Incorrect username or password"
  //   });
  // }
  // const isMatch = await user.comparePassword(password);
  // if (!isMatch) {
  //   return res.status(400).send({
  //     message: "Incorrect username or password"
  //   });
  // }
  // const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  // res.cookie("t", token, { expire: new Date() + 9999 });
  // const { _id, name, username, email } = user;
  // return res.send({ token, user: { _id, name, username, email } });
  const { username, password } = req.body;
  // mongoose validation
  // Joi
  // check in controller

  if (!username || !password) {
    throw new CustomAPIError("Please provide username and password", 400);
  }
  // for demo
  const id = new Date().getTime();
  // for payload try to keep it simple
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User created successfully", token });
};

export const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("Invalid token", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const randomNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      message: `Welcome to the dashboard! ${decoded.username}  ${randomNumber}`,
    });
  } catch (e) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};
