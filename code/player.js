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