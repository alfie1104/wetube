import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config(); //.env 파일에 적힌 내용을 process.env에 등록시켜줌
import "./models/Video";
import "./models/Comment";

const PORT = process.env.PORT || 4000;

const handleListening = () => {
    console.log(`Listening on http://localhost:${PORT}`);
}

app.listen(PORT, handleListening);