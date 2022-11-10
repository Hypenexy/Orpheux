var player = document.createElement("player")
player.innerHTML = `
<song>
  <img src='songimage.png'>
  <ti></ti>
  <ar></ar>
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
    <i class='m-i'>queue_music</i>
    <i class='m-i'>volume_up</i>
    <volmixer><input type='range' value='100'></volmixer>
  </div>
</options>
<canvas id="AudioSpectrum"></canvas>
`
//dont forget the equalizer
app.appendChild(player)

var playerbuttons = player.getElementsByTagName("i")

ButtonEvent(playerbuttons[2], function(){
  togglePlayback()
})

var repeat = 0
var repeatbtn = playerbuttons[4]
ButtonEvent(playerbuttons[4], function(){
  switch (repeatbtn.innerText) {
    case "repeat":
      repeatbtn.classList.add("active")
      repeatbtn.innerText = "repeat_one"
      repeat = 1
      break;
    case "repeat_one":
      repeatbtn.classList.add("active")
      repeatbtn.innerText = "repeat_on"
      repeat = 2
      break;
    case "repeat_on":
      repeatbtn.classList.remove("active")
      repeatbtn.innerText = "repeat"
      repeat = 0
      break;
    default:
      break;
  }
})

var lastvolume = 1
function appVolumeChange(){
  song.volume = volumeslider.value / 100
  lastvolume = song.volume
  playerbuttons[6].style = ""
  if(volumeslider.value>75){
    playerbuttons[6].innerText = "volume_up"
  }
  else{
    if(volumeslider.value==0){
      playerbuttons[6].innerText = "volume_off"
    }
    else{
      playerbuttons[6].innerText = "volume_down"
      playerbuttons[6].style.transform = "translateX(-2px)"
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

// <i class='m-i'>shuffle_on</i>

function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes;
  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : "0" + seconds;
  if(romanNumerals){
    return Romanize(minutes) + ":" + Romanize(seconds);
  }
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

function seekplayback(){
  song.currentTime = sliderinput.value;
  document.activeElement.blur();
}

sliderinput.addEventListener("change", seekplayback);

function togglePlayback(){
  if(playerbuttons[2].innerText != 'play_arrow'){
    playbackStatus(false)
    song.pause()
  }
  else{
    playbackStatus(true)
    song.play()
  }
}

function playbackStatus(playing){
  var button = playerbuttons[2]

  if(playing==true){
    button.innerText = "pause"
    if(AudioSpectrumEnabled){
      player.classList.add("AudioSpectrum")
      if (typeof(context) === "undefined") {
          context = new AudioContext()
          analyser = context.createAnalyser()
          AudioSpectrum = document.getElementById("AudioSpectrum")
          ctx = AudioSpectrum.getContext("2d")
          source = context.createMediaElementSource(song)

          AudioSpectrum.width = window.innerWidth * 0.80
          AudioSpectrum.height = window.innerHeight * 0.60

          source.connect(analyser)
          analyser.connect(context.destination)
      }
      FrameLooper()
    }
    else{
      if(player.classList.contains("AudioSpectrum")){
        player.classList.remove("AudioSpectrum")
      }
    }
  }
  else{
    button.innerText = "play_arrow"
  }
}

var AudioSpectrumEnabled = true,
  AudioSpectrum,
  ctx,
  source,
  context,
  analyser,
  fbc_array,
  bar_count,
  bar_pos,
  bar_width,
  bar_height

function FrameLooper() {
  window.RequestAnimationFrame =
      window.requestAnimationFrame(FrameLooper) ||
      window.msRequestAnimationFrame(FrameLooper) ||
      window.mozRequestAnimationFrame(FrameLooper) ||
      window.webkitRequestAnimationFrame(FrameLooper)

  fbc_array = new Uint8Array(analyser.frequencyBinCount)
  bar_count = window.innerWidth / 2

  analyser.getByteFrequencyData(fbc_array)

  ctx.clearRect(0, 0, AudioSpectrum.width, AudioSpectrum.height)
  ctx.fillStyle = "#999"

  for (var i = 0; i < bar_count; i++) {
      bar_pos = i * 4
      bar_width = 2
      bar_height = -(fbc_array[i] / 2)

      ctx.fillRect(bar_pos, AudioSpectrum.height, bar_width, bar_height)
  }
}

function play(path, title, artist, image){
  context = undefined
  if(song){
    song.pause()
  }

  if(!image){
    image = "disc.png"
  }
  songinfo.innerHTML = "<img src='"+image+"'><ti>"+ title +"</ti><ar>"+ artist +"</ar>"

  song = new Audio(path)
  song.volume = lastvolume
  song.ontimeupdate = function(){playbacktimeupdate()}
  song.onplay = function(){playbackStatus(true)}
  song.onpause = function(){playbackStatus(false)}

  song.onloadstart = function(){
    song.play()
  }

  song.ondurationchange = function(){
    sliderinput.max = song.duration;
    durationTime.innerText = formatTime(song.duration);
  }

  song.onended = function(){
    song.currentTime = 0
    if(repeat==1){
      repeatbtn.classList.remove("active")
      repeatbtn.innerText = "repeat"
      repeat = 0
      song.play()
    }
    if(repeat==2){
      song.play()
    }
  }
}

document.addEventListener("keydown", function(e){
  if(e.key == " "){
    if(document.activeElement != playerbuttons[2]){
      e.stopPropagation() //why doesn't this work :/
      e.preventDefault()
      togglePlayback()
    }
  }
})