var playerStatus = "paused";
var audioStatus = "unmuted";
const playButton = document.getElementById("play");
const volumeButton = document.getElementById("volumeButton");
const volume = document.querySelector("#volume");
const volumeSeek = document.getElementById("seek");
const timenow = document.getElementById("timenow");
const duration = document.getElementById("duration");
var song;

var firstStart;

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


window.addEventListener('load', function () {
    
    firstStart = true;
    
    var loading = document.getElementsByClassName('loading');
    if(firstStart==true){
        loading[0].style.opacity = 0;
        setTimeout(function()
        {
            loading[0].style.display = "none";

        }, 500);
    }
    else{
        var login = document.getElementById("login")

        var load = document.createElement("div");
        load.id = 'loadlol';
        load.innerHTML = "<i onclick='closeWelcome()' class='x fa fa-times'></i><div class=\"forms\"><div class=\"navbar\"><a id=\"switchlogin\" onclick=\"switchform('login')\">Login</a><a id=\"switchregister\" onclick=\"switchform('register')\">Register</a></div><h1>Midelight</h1><form id=\"loginform\"><label><p>Username</p><input type=\"text\" required></label><label><p>Password</p><input type=\"password\" required></label><a tabindex=\"0\" type=\"submit\" class=\"btn btna\">Login</a></form><form id=\"registerform\"><label><p>Email</p><input type=\"text\" required></label><label><p>Username</p><input type=\"text\" required></label><label><p>Password</p><input type=\"password\" required></label><a tabindex=\"0\" type=\"submit\" class=\"btn btna\">Register</a></form><a tabindex=\"0\" onclick=\"closeWelcome()\" class='btn'>Continue without an account</a></div><div class='info'><h2>Listen with your friends</h2><a>Invite other people and listen to music with them!</a></div><div class='info'><h2>Upload your own music</h2><a>And then listen or even download it on all devices!</a></div><div class='info'><h2>Sync your settings</h2><a>Instead of disabling that one option every time, keep all your settings on your account to all devices.</a></div>" //remove this later
        login.appendChild(load);
        var loc = document.getElementById("loc")
        setTimeout(function()
        {
            loading[0].style.background = "#000000bb"
            loc.style.transition = "1s"
            loc.style.transform = "translate(30%, -50%)"
            //loc.style.float = "right" bruh
            //loc.style.left = "initial"
            loc.style.right = "15%"
            setTimeout(function()
            {
                switchform("register")
                login.style.transition = "0.5s"
                login.style.background = "#000"
                login.style.border = "2px solid #333"
                login.style.borderRadius = "12px"
                login.style.color = "#fff"
                loc.style.transform = "translate(30%, -80%)"
                var opacitystyle = document.createElement('style')
                opacitystyle.innerHTML = '#login .forms{opacity: 1}#login .info{opacity: 1}#login .x{opacity: 1}'
                document.head.appendChild(opacitystyle)
            }, 1000);
        }, 100);
    }
})


function switchform(form){
    var loginform = document.getElementById("loginform")
    var registerform = document.getElementById("registerform")
    var switchlogin = document.getElementById("switchlogin")
    var switchregister = document.getElementById("switchregister")
    if(form=="login"){
        loginform.style.display = "block"
        registerform.style.display = "none"
        switchlogin.style.borderBottom =  "2px solid #65baff"
        switchlogin.style.color = "#65baff"
        switchregister.style.removeProperty("border-bottom")
        switchregister.style.removeProperty("color")
    }
    if(form=="register"){
        loginform.style.display = "none"
        registerform.style.display = "block"
        switchregister.style.borderBottom =  "2px solid #65baff"
        switchregister.style.color = "#65baff"
        switchlogin.style.removeProperty("border-bottom")
        switchlogin.style.removeProperty("color")
    }
}

function closeWelcome(){
    var loading = document.getElementsByClassName('loading');
    loading[0].style.opacity = 0
    setTimeout(function()
    {
        loading[0].style.display = "none"
    }, 500);
}

//App sidebar
const homeicon = document.getElementById("homeicon")
const discovericon = document.getElementById("discovericon")
const searchicon = document.getElementById("searchicon")
const optionsicon = document.getElementById("optionsicon")
const togethericon = document.getElementById("togethericon")
const windows = ["home", "discover", "search", "options", "together"]

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
togethericon.onclick = function() {openWindow("together")};

openWindow("home")

//Together

const togetheroptions1 = document.getElementById("togetheroptions1")

var joinoptionhtml = "<p>Party code</p> <input id='joincode'> <a>Join</a> <a onclick='exitjoinoption()'><i class='fa fa-times'></i></a>"
var togetherprevious;

function definetogetheroptions(){
    var joinoption = document.getElementById("joinoption")
    joinoption.onclick = function() {
        togetherprevious = togetheroptions1.innerHTML
        togetheroptions1.innerHTML = joinoptionhtml
    }
}

definetogetheroptions()

function exitjoinoption(){
    togetheroptions1.innerHTML = togetherprevious
    togetherprevious = ""
    definetogetheroptions()
}

//online services

const online = new EventSource("app/online.php");

online.onmessage = function(event) {
    
}