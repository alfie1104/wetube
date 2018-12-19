import routes from "../routes";
import Video from "../models/Video";

//DB에서 데이터를 가져왔을때 함수가 실행되도록 하기 위해 async 함수로 생성
//async함수는 await로 지정된 부분이 완료되길 기다림. await부분이 완료되면 await구문 이후 코드가 실행됨
export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ '_id': -1 }); //모든 Video 데이터를 가져옴. id의 desc순으로 정렬해서 가져옴
        // await로 지정된 Video.find()가 완료되어야 다음 render함수가 실행됨
        res.render("home", { pageTitle: "Home", videos }); //render의 두번째 인자로 전달된 값은 view page에서 #{key}로 획득가능
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};

export const search = (req, res) => {
    const {
        query: { term: searchingBy }
    } = req; //const searchingBy = req.query.term 과 같음

    res.render("search", { pageTitle: "Search", searchingBy });  //뒤에 searchingBy는 키와 값의 이름이 같으므로 searchingBy : searchingBy에서 searchingBy로 생략가능(ES6)
};
export const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { path }
    } = req;
    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });

    console.log(newVideo);
    // To Do : Upload and save video
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const video = await Video.findById(id);
        res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description }
    } = req;
    try {
        await Video.findByIdAndUpdate({ _id: id }, { title, description }); //id를 이용해서 video를 찾고, title과 description 업데이트
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const deleteVideo = async (req, res) => {
    const {
        params: { id }
    } = req;

    try {
        await Video.findOneAndRemove({ _id: id });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
}