import express from "express";
import morgan from "morgan"; //logger middleware
import helmet from "helmet"; //security middleware
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { localsMiddleware } from "./middlewares"; //로컬 변수를 view페이지에서 사용하기 위해 localMiddleware를 생성하였음. res.locals.XXX형식으로 변수 생성 후 view 페이지에서 #{XXX}형식으로 변수 접근가능
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/upload", express.static("uploads")); //사용자가 동영상파일에 접근가느하도록 static middleware사용. 
app.use("/static", express.static(path.join(__dirname, "static"))); // main파일에 있는 태그중, /static이라는 경로로 접근해서 .js파일과 .css파일을 요청하는 경우, 서버가 /static 경로를 인식하도록 하기 위해  express.static을 이용해서 연결시켜놓음
//첫번째 인자는 사용자가 웹에서 접근하는 url이며, static함수 내부 경로는 실제 전달할 파일이 보관된 위치임
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); //logging configuration
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;