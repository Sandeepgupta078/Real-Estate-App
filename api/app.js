import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js";
import testRoute from "./routes/testRoute.js";
import userRoute from "./routes/userRoute.js";
import postRoute from "./routes/postRoute.js";
import chatRoute from "./routes/chatRoute.js";
import messageRoute from "./routes/messageRoute.js";

const app = express();


app.use(cors({
   origin: process.env.CLIENT_URL,
   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
   credentials: true
}));

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/test", testRoute)
app.use("/api/posts", postRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)


app.listen(8800, () => {
   console.log("Backend server is running! on port", `${process.env.PORT}`);
})