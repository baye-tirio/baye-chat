import express from "express";
import UserRoutes from "./routes/user.routes.mjs";
import AuthRoutes from "./routes/auth.routes.mjs";
import MessageRoutes from "./routes/message.routes.mjs";
import { connect_db } from "./utils/db.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { app, server } from "./utils/socket.io.mjs";
// To be on the safe side especially as i'm trying to deploy this in a kubernetes cluster
import dotenv from "dotenv";
import job from "./cron/cron.mjs";
dotenv.config();
const __dirname = path.resolve();
//console.log({__dirname});
//connect to the database
connect_db();
// app.use(
//   cors({
//     origin: "https://baye-chat.onrender.com",
//     credentials: true,
//   })
// );
app.use(express.json({ limit: "100mb" }));
//basically to transform the long cookie that exists in a form of a string into an object of cookies so that we can access that object to read the actual value of the cookie from the request object
app.use(cookieParser());
//initailizing different attributes of my sessions , a session is a cookie created in a certain way but at the end of the day it's a cookie
// app.use(session({
//   secret:process.env.TOKEN_KEY,
//   saveUninitialized:false,
//   resave:false,
//   cookie:{
//     httpOnly:true,//This is to secure against Cross Site Scripting (XSS) attacks
//     maxAge:1*24*60*60*1000, // This is the duration of the cookie to be created
//     sameSite:"strict",// This is for the prevention of CSRF attacks
//     secure: process.env.PROJECT_ENVIRONMENT !== "development"// basically identifies whether the communication is going to be over http or https
//   }
// }))
//passport initialization/configuration
// app.use(passport.initialize());
// app.use(passport.session());
//Our endpoints
//schedule a cron job
job.start();
app.use("/api/user", UserRoutes);
app.use("/api/authentication", AuthRoutes);
app.use("/api/message", MessageRoutes);
//serving the html css and javascript associated with the frontend
if (process.env.PROJECT_ENVIRONMENT === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (_, res) => {
    //serving the entry point of the react application .. something like that
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}
//error handling middleware
app.use((err, req, res, next) => {
  const errorMessage = err.message || "Internal Server Error";
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: errorMessage,
  });
});
server.listen(process.env.PORT, () => {
  console.log("Listening on port:", process.env.PORT);
});
