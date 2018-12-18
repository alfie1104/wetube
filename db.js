import mongoose from "mongoose"; //mongodb 사용을 위해 mongoose 임포트
import dotenv from "dotenv"; //.env에 저장한 설정정보들을 읽을 수 있도록 dotenv 임포트
dotenv.config(); //.env 파일에 적힌 내용을 process.env에 등록시켜줌

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify : false
});


const db = mongoose.connection;
const handleError = (error) => console.log(`Error on DB Connection:${error}`);

const handleOpen = () => console.log("Connected to DB");

db.once("open", handleOpen);
db.on("error", handleError);