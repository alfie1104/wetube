import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req; //name = req.body.name, email = req.body.email ....

    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });
export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {

    const { _json: { id, avatar_url: avatarUrl, name, email, displayName } } = profile;

    console.log(email);
    console.log(displayName);
    try {
        const user = await User.findOne({ email: displayName });
        //원래  findOne({email})과 같이 해서 email : email을 찾아야하지만,
        //현재 내 아이디의 email값이 null이어서 displayName을 이용하였음

        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }

        const newUser = await User.create({
            email: displayName,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }

    //console.log(profile);
};

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });