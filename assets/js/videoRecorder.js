const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = (event) => {
    const { data: videoFile } = event; //event.data에는 Blob 타입으로 녹화된 영상이 담겨있음. event.data를 videoFile이라는 이름으로 가져옴.
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm"; //링크를 클릭하면 recorded.webm이라는 파일명으로 녹화된 영상이 저장됨
    document.body.appendChild(link);
    link.click(); //링크를 강제로 클릭
};


const stopRecording = () => {
    videoRecorder.stop();
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
};

const startRecording = () => {
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start(); //인자로 시간(ms단위) 전달 시, 전달한 시간이 될 때마다 dataavailable이벤트가 발생하며 blob 데이터가 event에 담김
    videoRecorder.addEventListener("dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            //video: { width: 1280, height: 720 }
        }); //사용자 디바이스에서 비디오 조작에 대한 권한 획득 //video크기를 지정하고 싶지 않을경우 그냥 video : true라고 입력하면 됨
        videoPreview.srcObject = stream; //stream에 연결되어있는 비디오와 오디오를 video태그로 연결시킴
        videoPreview.muted = true;
        videoPreview.play(); //stream으로 입력받은 비디오 입출력을 재생시킴
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    } catch (error) { //사용자가 비디오 입출력에 대한 권한요청을 거부할 경우 에러가 발생함.
        recordBtn.innerHTML = "Can't record";
        recordBtn.removeEventListener("click", getVideo);
    } finally {
        recordBtn.removeEventListener("click", getVideo);
    }
};

function init() {
    recordBtn.addEventListener("click", getVideo);
};

if (recorderContainer) {
    init();
}