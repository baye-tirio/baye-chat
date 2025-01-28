import User from "../models/user.model.mjs";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/ErrorHandler.mjs";
import jwt from "jsonwebtoken";

//function to handle sign up
export const signUp = async (req, res, next) => {
  try {
    console.log("Sign Up Payload!");
    console.log(req.body);
    const { username, email, password, fullName } = req.body;
    //check the database to see if we have a user with the given credentials
    const usernameAlreadyExists = await User.findOne({ username });
    console.log("Checked the database if the user already existed already!");
    if (usernameAlreadyExists)
      next(errorHandler(409, "username already exists!"));
    else {
      //check for the email if the username is unique
      const emailAlreadyExists = await User.findOne({ email });
      console.log("Checked the database if the email already existed already!");
      if (emailAlreadyExists) next(errorHandler(409, "email already exists!"));
      else {
        //if the username and the email are unique then let's populate the user into the users database
        //One thing tho I want to implement email verification either via token or whatever mechanism let's get more knowledge to be able to do this
        console.log(
          "Checked the database and the user ain't there and so we gon create one!"
        );
        const hashedPasswd = bcrypt.hashSync(password, 10);
        const newUser = new User({
          username,
          email,
          password: hashedPasswd,
          fullName,
        });
        const savedUser = await newUser.save();
        const { password: pass, ...rest } = savedUser._doc;
        const token = jwt.sign(
          { userId: savedUser._id },
          process.env.TOKEN_KEY,
          { expiresIn: "2d" }
        );
        //httpOnly:true prevents XSS (cross -site scripting) attacks
        res
          .cookie("access_token", token, {
            httpOnly: true, //prevents XSS attacks ,
            maxAge: 2 * 24 * 60 * 60 * 1000, //expires in 2 days
            sameSite: "strict", //prevents CSRF attacks
            secure: process.env.PROJECT_ENVIRONMENT !== "development", // true if we using https , false otherwise
          })
          .status(201)
          .json({
            message: "Successfully signed up!",
            userDetails: rest,
          });
      }
    }
  } catch (error) {
    next(error);
  }
};
//function (MiddleWare) to handle log in
export const logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });
    if (!foundUser) next(errorHandler(404, "User Not Found !"));
    else {
      if (bcrypt.compareSync(password, foundUser.password)) {
        //create the json web token
        const token = jwt.sign(
          { userId: foundUser._id },
          process.env.TOKEN_KEY,
          { expiresIn: "2d" }
        );
        const { password: pass, ...rest } = foundUser._doc;
        res
          .status(200)
          .cookie("access_token", token, {
            httpOnly: true, // prevents XSS Attacks
            maxAge: 2 * 24 * 60 * 60 * 1000, //the cookies is set to expire in 2 days
            sameSite: "strict", //  helps to prevent CSRF attacks
            secure: process.env.PROJECT_ENVIRONMENT !== "development", // basically to determine or decide between http or https
          })
          .json({
            message: "Successfull sign in",
            userDetails: rest,
          });
      } else next(errorHandler(401, "Incorrect Password!"));
    }
  } catch (error) {
    next(error);
  }
};
//function (MiddleWare) to handle logOut
export const logOut = (req, res, next) => {
  //what we do here is we clear the damn cookie that's all
  try {
    res.clearCookie("access_token").status(200).json("Successfull logout");
  } catch (error) {
    next(error);
  }
};
//function (MiddleWare) to handle continue with google
export const logInGoogle = (req, res, next) => {};
//function (MiddleWare) to handle continue with instagram
export const logInInstagram = (req, res, next) => {};
