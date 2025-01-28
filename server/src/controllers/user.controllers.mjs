import User from "../models/user.model.mjs";
import bcrypt from "bcrypt";
import { errorHandler } from "../utils/ErrorHandler.mjs";
import cloudinary from "../utils/cloudinary.mjs";

export const updateUser = async (req, res, next) => {
  try {
    console.log('The payload is:');
    console.log(req.body);
    if (req.params.id !== req.tokenPayload.userId) {
      next(errorHandler(403, "Can Only update your own profile !"));
    } else {
      const { username, email, fullName, password, profilePicture } = req.body;
      if (password) password = bcrypt.hashSync(password, 10);
      // I think this should be done in the client side but we gon see
      // const upload = await cloudinary.uploader.upload(profilePicture);
      //basically we get the url of wherever the uploaded picture resides and we can do with it whatever we please including populating it into our database
      // console.log(upload.secure_url);
      const UpdatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            username,
            email,
            fullName,
            password,
            profilePicture,
          },
        },
        { new: true }
      );
      const { password: pass, ...rest } = UpdatedUser._doc;
      res.status(200).json({
        message: "successfully updated the user",
        updatedUser: rest,
      });
    }
  } catch (error) {
    next(error);
  }
};
