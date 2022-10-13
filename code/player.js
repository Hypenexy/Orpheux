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
    var button = playerbuttons[2]

    if(button.innerText != "pause"){
        button.innerText = "pause"
    }
    else{
        button.innerText = "play_arrow"
    }
})

function appVolumeChange(){
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

volumeslider.addEventListener("change", function(){
  appVolumeChange()
})

function showVolume(){
  volmixer.classList.add("volactive")
}
function hideVolume(){
  volmixer.classList.remove("volactive")
}

ButtonEvent(playerbuttons[6], function(){
  showVolume()
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
  if(e.target != volmixer && e.target != volumeslider){
    hideVolume()
  }
})

//WARNING, change this to a timeout cooldown!
document.addEventListener("keydown", function(e){
  if(e.key == "ArrowUp"){
    showVolume()
    volumeslider.value = volumeslider.value*1 + 4
    appVolumeChange()
    setTimeout(function(){
      hideVolume()
    }, 600);
  }
  if(e.key == "ArrowDown"){
    showVolume()
    volumeslider.value -= 4
    appVolumeChange()
    setTimeout(function(){
      hideVolume()
    }, 600);
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