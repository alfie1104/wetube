import passport from "passport";
import GithubStrategy from "passport-github";
import dotenv from "dotenv";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";

dotenv.config(); //.env 파일에 적힌 내용을 process.env에 등록시켜줌

passport.use(User.createStrategy());
passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SEC,
    callbackURL: "http://localhost:4000/auth/github/callback"
}, githubLoginCallback)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());