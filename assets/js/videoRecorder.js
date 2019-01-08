const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

const startRecording = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: { width: 1280, height: 720 }
        }); //사용자 디바이스에서 비디오 조작에 대한 권한 획득 //video크기를 지정하고 싶지 않을경우 그냥 video : true라고 입력하면 됨
        videoPreview.srcObject = stream; //stream에 연결되어있는 비디오와 오디오를 video태그로 연결시킴
        videoPreview.muted = true;
        videoPreview.play(); //stream으로 입력받은 비디오 입출력을 재생시킴
    } catch (error) { //사용자가 비디오 입출력에 대한 권한요청을 거부할 경우 에러가 발생함.
        recordBtn.innerHTML = "Can't record";
        recordBtn.removeEventListener("click", startRecording);
    }
}

function init() {
    recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
    init();
}