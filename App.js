import express from "express";
import session from "express-session";  
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import ProfileRoutes from "./Profiles/routes";
import PostRoutes from "./Posts/routes";
import ReplyRoutes from "./Replies/routes";
import CircleRoutes from "./Circles/routes";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/cabal"
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "cabal",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
      domain: process.env.NODE_SERVER_DOMAIN,
    };
}
app.use(session(sessionOptions));
app.use(express.json()); // do all your work after this line

ProfileRoutes(app);
PostRoutes(app);
ReplyRoutes(app);
CircleRoutes(app);

app.listen(4000);