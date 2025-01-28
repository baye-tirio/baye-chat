import { Router } from "express";
import {
  logIn,
  logInGoogle,
  logInInstagram,
  logOut,
  signUp,
} from "../controllers/auth.controllers.mjs";
// import passport from "passport";
//importing the passport google strategy
import '../strategies/google.strategy.mjs';
const router = Router();
router.get("/test", (req, res) => {
  res.json("successfully hit the authentication test endpoint");
});
router.post("/sign-up", signUp);
router.post("/log-in", logIn);
// router.get("/google", passport.authenticate('google'));
// router.get("/google/redirect",passport.authenticate('google'),(req,res) => {
//   const {password,...rest} = req.user;
//   res.status(200).json({
//     message:'Successfully continued with google',
//     userDetails:rest
//   });
// });
router.post("/log-in-instagram", logInInstagram);
router.get("/log-out", logOut);
export default router;
