import express from "express";
import UserRoutes from "./routes/user.routes.mjs";
import AuthRoutes from "./routes/auth.routes.mjs";
import MessageRoutes from "./routes/message.routes.mjs";
import { connect_db } from "./utils/db.mjs";
import cookieParser from "cookie-parser";
import path from "path";
import { app, server } from "./utils/socket.io.mjs";
import dotenv from "dotenv";
import job from "./cron/cron.mjs";
dotenv.config();
const __dirname = path.resolve();
connect_db();
app.use(express.json({ limit: "100mb" }));
//basically to transform the long cookie that exists in a form of a string into an object of cookies so that we can access that object to read the actual value of the cookie from the request object
app.use(cookieParser());
//schedule a cron job
job.start();
app.use("/api/user", UserRoutes);
app.use("/api/authentication", AuthRoutes);
app.use("/api/message", MessageRoutes);
//serving the html css and javascript associated with the frontend
if (process.env.PROJECT_ENVIRONMENT === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    //serving the entry point of the react application .. something like that
    console.log(
      "About to send the index.html file because nor route or static file matches the requested resource : "
    );
    console.log("Request url");
    console.log(req.originalUrl);
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
server.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Listening on port:", process.env.PORT);
});
