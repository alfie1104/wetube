import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required", //fileURL이 항상 필요하며, 없을 경우 value에 지정된 문자열이 출력됨
    },
    title: {
        type: String,
        required: "Title is required"
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment" //어떤 Object의 ID인지 명시
        }
    ],
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Video", VideoSchema);
export default model;