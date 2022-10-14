var player = document.createElement("player")
player.innerHTML = `
<song>
  <img src='songimage.png'>
  <ti>Shattered</ti>
  <ar>Hypenexy</ar>
</song>
<controls>
  <buttons>
    <i class='m-i'>shuffle</i>
    <i class='m-i big'>skip_previous</i>
    <i class='m-i biggest'>play_arrow</i>
    <i class='m-i big'>skip_next</i>
    <i class='m-i'>repeat</i>
  </buttons>
  <slider>
    <a>0:00</a>
    <input type='range' step='0.1' value='0'>
    <a>0:00</a>
  </slider>
</controls>
<options>
  <div>
    <i class='m-i'>equalizer</i>
    <i class='m-i'>volume_up</i>
    <volmixer><input type='range' value='100'></volmixer>
  </div>
</options>
`
app.appendChild(player)

var playerbuttons = player.getElementsByTagName("i")

ButtonEvent(playerbuttons[2], function(){
  toggleplayback()
})

function appVolumeChange(){
  song.volume = volumeslider.value / 100
  if(volumeslider.value>75){
    playerbuttons[6].innerText = "volume_up"
  }
  else{
    if(volumeslider.value==0){
      playerbuttons[6].innerText = "volume_off"
    }
    else{
      playerbuttons[6].innerText = "volume_down"
    }
  }
}

var volmixer = player.getElementsByTagName("volmixer")[0]
var volumeslider = volmixer.getElementsByTagName("input")[0]
volmixer.addEventListener("wheel", function(e){
  if(e.deltaY < 0){
    volumeslider.value = volumeslider.value*1 + 4
  }
  else{
    volumeslider.value -= 4
  }
  appVolumeChange()
})

volumeslider.addEventListener("input", function(){
  appVolumeChange()
})

function showVolume(){
  volmixer.classList.add("volactive")
}
function hideVolume(){
  volmixer.classList.remove("volactive")
}

var lastvolumebeforemute = 100
ButtonEvent(playerbuttons[6], function(){
  if(volumeslider.value != 0){
    lastvolumebeforemute = volumeslider.value
    volumeslider.value = 0
  }
  else{
    volumeslider.value = lastvolumebeforemute
  }
  appVolumeChange()
})

playerbuttons[6].addEventListener("focus", function(){
  showVolume()
})

playerbuttons[6].addEventListener("mouseover", function(){
  showVolume()
})

volmixer.addEventListener("mouseleave", function(){
  hideVolume()
})

document.addEventListener("click", function(e){
  if(e.target != volmixer && e.target != volumeslider && e.target != playerbuttons[6]){
    hideVolume()
  }
})

//WARNING, change this to a timeout cooldown!
var keyVolumeTimeout = null
function keyVolume(up){
  if(up==true){
    volumeslider.value = volumeslider.value*1 + 4
  }
  else{
    volumeslider.value -= 4
  }
  showVolume()
  appVolumeChange()
  clearTimeout(keyVolumeTimeout)
  keyVolumeTimeout = setTimeout(function(){
    hideVolume()
  }, 600)
}
document.addEventListener("keydown", function(e){
  if(e.key == "ArrowUp"){
    keyVolume(true)
  }
  if(e.key == "ArrowDown"){
    keyVolume(false)
  }
})

//https://orangeable.com/javascript/equalizer-web-audio-api

//https://stackoverflow.com/questions/24895155/creating-an-equalizer-with-javascript-audio-api

// <i class='m-i'>shuffle</i>
// <i class='m-i'>skip_previous</i>
// <i class='m-i'>play_arrow</i>
// <i class='m-i'>pause</i>
// <i class='m-i'>skip_next</i>
// <i class='m-i'>repeat</i>
// <i class='m-i'>repeat_one</i>
// <i class='m-i'>repeat_on</i>

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

var songinfo = player.getElementsByTagName("song")[0]
var slider = player.getElementsByTagName("slider")[0]
var sliderinput = slider.getElementsByTagName("input")[0]
var slidertimes = player.getElementsByTagName("a")
var currentTime = slidertimes[0]
var durationTime = slidertimes[1]
var song = new Audio()


function playbacktimeupdate(){
  if(sliderinput != document.activeElement){
    sliderinput.value = song.currentTime;
  }
  currentTime.innerText = formatTime(song.currentTime);
}


function toggleplayback(){
  if(playerbuttons[2].innerText != 'play'){
      playerbuttons[2].innerText = 'play'
      song.pause()
  }
  else{
      playerbuttons[2].innerText = 'pause'
      song.play()
  }
}

function toggleplaybackstatus(){
  var button = playerbuttons[2]

  if(button.innerText != "pause"){
      button.innerText = "pause"
  }
  else{
      button.innerText = "play_arrow"
  }
}
function play(path, title, artist, image){
  if(song){
      song.pause();
  }

  songinfo.innerHTML = "<img src='"+image+"'><ti>"+ title +"</ti><ar>"+ artist +"</ar>"

  song = new Audio(path);
  song.ontimeupdate = function(){playbacktimeupdate()}
  song.onplay = function(){toggleplaybackstatus(true)}
  song.onpause = function(){toggleplaybackstatus(false)}

  song.onloadstart = function(){
    song.play()
  }

  song.ondurationchange = function(){
    sliderinput.max = song.duration;
    durationTime.innerText = formatTime(song.duration);
  }
}

