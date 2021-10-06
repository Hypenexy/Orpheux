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
        //probably not the problem!
    }, 400);
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
        if(document.activeElement != playButton){
            toggleplayback();
        }
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


// window.addEventListener('load', function () {
//     var loading = document.getElementsByClassName('loading');
//     var loopedclass;
//     for(i = 0; i < loading.length; i++) {
//         loading[i].style.opacity = 0;
//         loopedclass = loading[i];
//     }
//     setTimeout(function()
//     {
//         loopedclass.style.display = "none";

//     }, 500);
// })


//App sidebar
const homeicon = document.getElementById("homeicon"); 
const discovericon = document.getElementById("discovericon");
const searchicon = document.getElementById("searchicon");
const optionsicon = document.getElementById("optionsicon");
const windows = ["home", "discover", "search", "options"]

function openWindow(window){
    for (const n of windows) { 
        document.getElementById(n).style.display = "none";
        document.getElementById(n + "icon").style.removeProperty("stroke");
    }

    document.getElementById(window).style.display = "block";
    document.getElementById(window + "icon").style.stroke = "url(#gradient)";
}

homeicon.onclick = function() {openWindow("home")};
discovericon.onclick = function() {openWindow("discover")};
searchicon.onclick = function() {openWindow("search")};
optionsicon.onclick = function() {openWindow("options")};

openWindow("home")