import {videos} from "../db";
import routes from "../routes";

export const home = (req, res) => {
    res.render("home", {pageTitle : "Home", videos}); //render의 두번째 인자로 전달된 값은 view page에서 #{key}로 획득가능
};

export const search = (req, res) => {
    const {
        query: {term : searchingBy}
    } = req; //const searchingBy = req.query.term 과 같음

    res.render("search", {pageTitle : "Search", searchingBy, videos});  //뒤에 searchingBy는 키와 값의 이름이 같으므로 searchingBy : searchingBy에서 searchingBy로 생략가능(ES6)
};
export const getUpload = (req, res) => res.render("upload", {pageTitle:"Upload"});
export const postUpload = (req, res) => {
    const {
        body : {file, title, description}
    } = req;
    // To Do : Upload and save video
    res.redirect(routes.videoDetail(324393));
};

export const videoDetail = (req, res) => res.render("videoDetail", {pageTitle:"Video Detail"});
export const editVideo = (req, res) => res.render("editVideo", {pageTitle:"Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle:"Delete Video"});