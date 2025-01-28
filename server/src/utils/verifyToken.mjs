import jwt from "jsonwebtoken";
import { errorHandler } from "./ErrorHandler.mjs";
export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token)
      next(errorHandler(401, "You have no access token sign in to get one!"));
    else {
      jwt.verify(token, process.env.TOKEN_KEY, (error, tokenPayload) => {
        if (error) next(errorHandler(403, "Invalid Token!"));
        else {
          req.tokenPayload = tokenPayload;
          next();
        }
      });
    }
  } catch (error) {
    next(error);
  }
};
