const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");

function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        videoPlayer.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        videoPlayer.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function init() {
    playBtn.addEventListener("click", handlePlayClick);
}

if (videoContainer) {
    init();
}