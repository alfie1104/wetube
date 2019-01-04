import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl: String,
    facebookId: Number,
    githubId: Number,
    comments: [ //Comment는 한 유저가 여러개 가질 수 있으므로, array로 선언한다.
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment" //어떤 Object의 ID인지 명시
        }
    ],
    videos: [ //Video는 한 유저가 여러개 가질 수 있으므로 Array로 선언한다. 향후 .push 메소드를 이용해서 유저에게 추가적인 video를 등록할 수 있다.
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video" //어떤 Object의 ID인지 명시
        }
    ],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;