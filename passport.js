import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStreategy from "passport-facebook";
import passportKakao from "passport-kakao";
import dotenv from "dotenv";
import User from "./models/User";
import { githubLoginCallback, kakaoLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";

dotenv.config(); //.env 파일에 적힌 내용을 process.env에 등록시켜줌
const Kakaostrategy = passportKakao.Strategy;

passport.use(User.createStrategy());
passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SEC,
        callbackURL: `http://localhost:4000${routes.githubCallback}`
    }, githubLoginCallback)
);

passport.use(
    new FacebookStreategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SEC,
        callbackURL: `http://localhost:4000${routes.facebookCallback}`
    }, facebookLoginCallback)
);

passport.use(
    new Kakaostrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: `http://localhost:4000${routes.kakaoCallback}`
    }, kakaoLoginCallback)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());