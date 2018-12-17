import express from "express";
import morgan from "morgan"; //logger middleware
import helmet from "helmet"; //security middleware
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares"; //로컬 변수를 view페이지에서 사용하기 위해 localMiddleware를 생성하였음. res.locals.XXX형식으로 변수 생성 후 view 페이지에서 #{XXX}형식으로 변수 접근가능
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev")); //logging configuration
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;