var playerStatus = "paused";
var audioStatus = "unmuted";
const playButton = document.getElementById("play");
const volumeButton = document.getElementById("volumeButton");
const volume = document.querySelector("#volume");
const volumeSeek = document.getElementById("seek");
const timenow = document.getElementById("timenow");
const duration = document.getElementById("duration");
var song;

function play(selection){
    if(song){
        song.pause();
    }
    playerStatus = "playing";
    playButton.innerHTML = '<i class="fa fa-pause"></i>';
    song = new Audio(selection + '.mp3');
    song.play();
    song.ontimeupdate = function(){playbacktimeupdate()};
    song.onpause = function(){toggleplaybackstatus("paused")};
    song.onplay = function(){toggleplaybackstatus("playing")};
    setTimeout(function () {
        volumeSeek.max = song.duration;
        duration.innerHTML = formatTime(song.duration);
    }, 100);
}

function playbacktimeupdate(){
    if(volumeSeek != document.activeElement){
        volumeSeek.value = song.currentTime;
    }
    timenow.innerHTML = formatTime(song.currentTime);
}

function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}

function toggleplayback(){
    if(playerStatus=="playing"){
        playerStatus = "paused";
        playButton.innerHTML = '<i class="fa fa-play"></i>';
        song.pause();
    }
    else{
        playerStatus = "playing";
        playButton.innerHTML = '<i class="fa fa-pause"></i>';
        song.play();
    }
}

function toggleplaybackstatus(status){
    if(status=="paused"){
        playerStatus = "paused";
        playButton.innerHTML = '<i class="fa fa-play"></i>';
    }
    else{
        playerStatus = "playing";
        playButton.innerHTML = '<i class="fa fa-pause"></i>';
    }
}

playButton.addEventListener("click", toggleplayback);

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        toggleplayback();
    }
}

function muteplayback(){
    if(audioStatus=="unmuted"){
        audioStatus = "muted";
        volumeButton.innerHTML = '<i class="fa fa-volume-up"></i>';
        song.muted = false;
    }
    else{
        audioStatus = "unmuted";
        volumeButton.innerHTML = '<i class="fa fa-volume-off"></i>';
        song.muted = true;
    }
}

volumeButton.addEventListener("click", muteplayback);

volume.addEventListener("input", function(e) {
    song.volume = e.currentTarget.value / 100;
    if(e.currentTarget.value==0){
        volumeButton.innerHTML = '<i class="fa fa-volume-off"></i>';
    }
    else{
        if(volumeButton.innerHTML = '<i class="fa fa-volume-off"></i>'){
            volumeButton.innerHTML = '<i class="fa fa-volume-up"></i>';
        }
    }
})

function seekplayback(){
    song.currentTime = volumeSeek.value;
    document.activeElement.blur();
}

volumeSeek.addEventListener("change", seekplayback);

//play();