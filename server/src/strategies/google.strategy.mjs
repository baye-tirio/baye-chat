// import passport from "passport";
// import { Strategy } from "passport-google-oauth20";
// import User from "../models/user.model.mjs";
// import bcrypt from "bcrypt";

// passport.serializeUser((user, done) => {
//   try {
//     console.log(user);
//     console.log(`let's try to serialize the above user:`);
//     done(null, user._id);
//   } catch (error) {
//     done(error, null);
//   }
// });
// passport.deserializeUser(async (userId, done) => {
//   try {
//     console.log(userId);
//     console.log(`let's try to deserialize the userId above: `);
//     const user = await User.findById(userId);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// export default passport.use(
//   new Strategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5700/api/authentication/google/redirect",
//       scope: ["profile", "email"],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log("The profile object");
//         console.log(profile);
//         const { email, name, given_name, picture } = profile._json;
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//           done(null, existingUser);
//         } else {
//           const password = bcrypt.hashSync("passwordiunyama", 10);
//           const newUser = new User({
//             username: given_name,
//             fullName: name,
//             profilePicture: picture,
//             email: email,
//             password: password,
//           });
//           const userDetails = await newUser.save();
//           done(null, userDetails);
//         }
//       } catch (error) {
//         done(error, null);
//       }
//     }
//   )
// );
