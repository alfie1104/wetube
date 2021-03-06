import multer from "multer";
import routes from "./routes";

const storageVideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/videos/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split('/')[1]);
    }
});

const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/avatars/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "." + file.mimetype.split('/')[1]);
    }
});

const multerVideo = multer({ storage: storageVideo });
const multerAvatar = multer({ storage: storageAvatar });

//const multerVideo = multer({ dest: "uploads/videos/" });
//const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "WeTube"; //view 페이지들에서 사용할 local 변수들을 res.locals에 생성. view 페이지에서는 #{변수명}으로 local변수 획득가능
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next(); //미들웨어이므로 다음 라우터로 넘어갈 수 있도록 next를 호출해야함.
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");