import { Router } from "express";
import { verifyToken } from "../utils/verifyToken.mjs";
import { updateUser } from "../controllers/user.controllers.mjs";
import User from "../models/user.model.mjs";
const router = Router();
router.get("/test", (req, res) => {
  res.json("Successfully hit the user testing endpoint");
});
router.post("/update/:id", verifyToken, updateUser);
//This is the alternative to using redux storing the logged in user in global state so we just check the server for the logged in user
//Actually this endpoint makes a lot of sense especially if we are utilizing cookies and tokens that expire with time among other reasons
router.get("/checkAuth", verifyToken, async (req, res, next) => {
  try {
    const verifiedUser = await User.findById(req.tokenPayload.userId);
    // req.session.user = verifiedUser;
    res.status(200).json(verifiedUser);
  } catch (error) {
    next(error);
  }
});
export default router;
