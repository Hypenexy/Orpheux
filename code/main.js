main.innerHTML = "<h1>Library</h1>"+
"<library>"+
"<div class='song'><ty>Song 0:41</ty><img src='songimage.png'><ti>Calm Place</ti><ar>Hypenexy</ar></div>"+
`<div class='song album'>
  <ty>Album</ty>
  <img src='songimage.png'><dot></dot>
  <ti>Destruction</ti>
  <ar>Hypenexy</ar>
  <songs>
    <x class='m-i'>arrow_back</x>
    <div><aimg style="--bg-image: url('../../songimage.png');"></aimg><ati>Electric Growl</ati><aar>Hypenexy</aar><aty>1:21</aty></div>
    <div><aimg style="--bg-image: url('../../songimage.png');"></aimg><ati>Electric Growl</ati><aar>Hypenexy</aar><aty>1:21</aty></div>
    <div><aimg style="--bg-image: url('../../songimage.png');"></aimg><ati>Electric Growl</ati><aar>Hypenexy</aar><aty>1:21</aty></div>
  </songs>
</div>`+
"<div class='song'><ty>Song 1:21</ty><img src='../../songimage.png'><ti>Electric Growl</ti><ar>Hypenexy</ar></div>"+
"<div class='song'><ty>Song 2:35</ty><img src='../../songimage.png'><ti>distortion</ti><ar>Hypenexy</ar></div>"+
"</library>" +
`<h1>Tools</h1>
<tools>
  <div data-action='audiorecorder'><i class='m-i'>mic</i><info><ti>Audio Recorder</ti><desc>Record input with your microphone</desc></info></div>
  <div data-action='whitenoise'><i class='m-i'>equalizer</i><info><ti>White Noise</ti><desc>A mixer for calming noises</desc></info></div>
  <div><i class='m-i'>subtitles</i><info><ti>Caption Generator</ti><desc>Listen to any audio with subtitles</desc></info></div>
  <div data-action='audiogen'><i class='m-i'>speaker</i><info><ti>Simple Audio Generator</ti><desc>Generate a sound</desc></info></div><!--infrared looks better but i havent updated material icons-->
  <h2>Enthusiasts' visuals</h2>
  <div><i class='m-i'>microwave</i><info><ti>Oscilloscope Emulator</ti><desc>Visualizer for audio in the oscilloscope form</desc></info></div>
  <div><i class='m-i'>water</i><info><ti>Water Visualizer</ti><desc>Learn how certain frequencies interact with water</desc></info></div>
  <h2>Artists' tools</h2>
  <div><i class='m-i'>lyrics</i><info><ti>Lyrics Generator</ti><desc>Using AI generates lyrics and title for a song</desc></info></div>
</tools>`

// var server stuff here

var songs = main.getElementsByClassName("song")

ButtonEvent(songs[0], function(){play("calmplace.mp3", "Calm Place", "Hypenexy")})
ButtonEvent(songs[1], OpenAlbum, songs[1])

function OpenAlbum(element){
  if(!element.classList.contains("albumactive")){
    StaticMain()
    // var eloffset = getOffset(element)
    // element.style.top = eloffset.top + "px"
    // element.style.left = eloffset.left + "px"
    element.classList.add("albumtransition")
    element.classList.add("albumactive")
    if(MotionAllowed){
      setTimeout(() => {
        element.classList.remove("albumtransition")
      }, 10);
    }
    else{
      element.classList.remove("albumtransition")
    }
  
    ButtonEvent(element.getElementsByTagName("x")[0], function(event){
      main.classList.remove("staticmain")
      event.stopPropagation()
      element.classList.remove("albumtransition")
      element.classList.remove("albumactive")
      var library = main.getElementsByTagName("library")[0]
      library.classList.add("librarytransition")
      setTimeout(() => {
        library.classList.remove("librarytransition")
      }, 10);
    }, null, true)
  }
}

function StaticMain(){
  main.scrollTop = 0
  main.classList.add("staticmain")
}

function ShowMain(main){
  var mains = view.getElementsByTagName("main")
  for (let i = 0; i < mains.length; i++) {
    if(mains[i].classList.contains("activeview")){
      mains[i].classList.remove("activeview")
    }
  }
  view.getElementsByClassName(main)[0].classList.add("activeview")
}

window.addEventListener("load", function(){
  ShowMain("library")
  sidepanel.getElementsByTagName("a")[0].classList.add("active")
})


mainexplore.innerHTML = "<h1>Explore</h1>"+
"<h2>Artists</h2>"+
"<div class='artist'><img src='app/artist/5F1B2416-AF81-41FC-B7D1-24B91CF8A0B8.jpeg'><ar>Hypenexy</ar></div>"+
'<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'

var aritstsButtons = mainexplore.getElementsByClassName("artist")
for (let i = 0; i < aritstsButtons.length; i++) {
  ButtonEvent(aritstsButtons[i], function(){showArtist(aritstsButtons[i].getElementsByTagName("ar")[0].innerText)})
}

mainexplore.getElementsByClassName("lds-ellipsis")[0].remove() //remove it when it loads

function showArtist(name){
  $.ajax({
      url: server + "app/artist/",
      type: "post",
      data: {"artist" : name},
      success: function (response) {
        response = JSON.parse(response)
        var artistEl = document.createElement("div")
        artistEl.classList.add("viewArtist")
        artistEl.innerHTML = "<i class='x m-i'>arrow_back_ios</i><h1>"+response.name+"</h1>"+
        "<h2>Tracks</h2>"
        ButtonEvent(artistEl.getElementsByClassName("x")[0], function(){
          //close
          artistEl.remove()
        })
        mainexplore.appendChild(artistEl)
      },
      error: function() {
      }
  })
}

mainsettings.innerHTML = "<h1>Settings</h1>"+
"<h2>Account</h2>"+
"<div><p>Midelight Account</p><a>Login</a><a>Register</a></div>"+
"<h2>Visual</h2>"+
"<div><p>Theme</p><a>Gradient</a><a>Dark</a><a>Light</a><a>Mint Green</a><a>Blood Red</a></div>"+
"<div><p>Numerals</p><a>Arabic</a><a>Roman</a></div>"+
"<div><p>Audio Visualizer</p><a>On</a><a>Off</a></div>"+
"<div><p>UI Animations</p><a>On</a><a>Off</a></div>"+
"<h2>Sound</h2>"+
"<div><p>Volume Gain Multiplier</p><input type='number' value=1><err></err></div>"+
"<div><p>Playback Speed Multiplier</p><input type='number' value=1><err></err></div>"+
"<a data-action='resetOptions'>Reset options</a><a class='undoreset' data-action='undoReset'>Undo reset</a>"

var settings = {}
if(localStorage.getItem("options")){
  try {
    settings = JSON.parse(localStorage.getItem("options"))
  } catch {
    console.log("WARN: Something errored during parsing of options. Resetting options.")
    localStorage.removeItem("options")
    settings = {}
  }
}
function saveSettings(){
  localStorage.setItem("options", JSON.stringify(settings))
}
var undoSettings = {}
var undoBtn = document.querySelector('[data-action="undoReset"]')
ButtonEvent(document.querySelector('[data-action="resetOptions"]'), function(){
  undoBtn.classList.remove("undoreset")
  localStorage.removeItem("options")
  undoSettings = settings
  settings = {}
  themebtns[1].click()
  numeralsbtns[0].click()
  visualizerbtns[1].click()
  animationsbtns[0].click()
  volumegaininput.value = 1
  VolumeGainMultiplier = volumegaininput.value
  volumeplaybackinput.value = 1
  song.playbackRate = 1
})
ButtonEvent(undoBtn, function(){
  undoBtn.classList.add("undoreset")
  settings = undoSettings
  loadSettings(settings)
  saveSettings()
})

var optionsdivs = mainsettings.getElementsByTagName("div")
var themebtns = optionsdivs[1].getElementsByTagName("a")
var backgroundEffect
var activeTheme = "Dark"

function switchToCSS(Text){
  var execute = function(){}
  switch (Text) {
    case "Dark":
      execute = function(){document.getElementById("themecss").remove()}
      break;
    case "Light":
      execute = function(){loadCSS("assets/themes/light.css", "themecss")}
      break;
    case "Mint Green":
      execute = function(){loadCSS("assets/themes/green.css", "themecss")}
      break;
    case "Blood Red":
      execute = function(){loadCSS("assets/themes/red.css", "themecss")}
      break;
    case "Gradient":
      execute = function(){
        loadScript("code/backgroundfx.js", "themejs")
        loadCSS("assets/themes/gradient.css", "themecss")
      }
      break;
    default:
      break;
  }
  return execute;
}

function Theme(theme){
  var execute
  if(activeTheme!=theme.innerText){
    for (let i = 0; i < themebtns.length; i++) {
      themebtns[i].classList.remove("active")
    }
    theme.classList.add("active")
  
    if(theme.innerText!="Gradient"){
      if(backgroundEffect && backgroundEffect.nodeType){
        backgroundEffect.remove()
        document.getElementById("themejs").remove()
        backgroundEffect = null
      }
    }
    execute = switchToCSS(theme.innerText)
  }
  try {
    var themecss = document.getElementById("themecss")
    if(themecss){
      themecss.remove()
    }
    execute()
  } catch (error) {}
  activeTheme = theme.innerHTML
  if(activeTheme!="Dark"){
    settings.theme = activeTheme
  }
  else{
    delete settings.theme
  }
  saveSettings()
}

var numeralsbtns = optionsdivs[2].getElementsByTagName("a")

var romanNumerals = false
function Numerals(numeral){
  if(numeral==0){
    numeralsbtns[0].classList.add("active")
    numeralsbtns[1].classList.remove("active")
    romanNumerals = false
    delete settings.romanNumerals
  }
  if(numeral==1){
    numeralsbtns[1].classList.add("active")
    numeralsbtns[0].classList.remove("active")
    romanNumerals = true
    settings.romanNumerals = romanNumerals
  }
  saveSettings()
}

ButtonEvent(numeralsbtns[0], Numerals, 0)
ButtonEvent(numeralsbtns[1], Numerals, 1)

function Romanize(num){
  if(isNaN(num))
      return NaN
  var digits = String(+num).split(""),
      key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"],
      roman = "",
      i = 3;
  while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman
  return Array(+digits.join("") + 1).join("M") + roman
}

var visualizerbtns = optionsdivs[3].getElementsByTagName("a")

function showVisualizer(bool){
  if(bool){
    visualizerbtns[0].classList.add("active")
    visualizerbtns[1].classList.remove("active")
    AudioSpectrumEnabled = true
    settings.audioVisualizer = true
  }
  else{
    visualizerbtns[1].classList.add("active")
    visualizerbtns[0].classList.remove("active")
    AudioSpectrumEnabled = false
    delete settings.audioVisualizer
  }
  saveSettings()
}

ButtonEvent(visualizerbtns[0], showVisualizer, true)
ButtonEvent(visualizerbtns[1], showVisualizer, false)

var animationsbtns = optionsdivs[4].getElementsByTagName("a")
var MotionAllowed = true

function allowMotion(bool){
  if(bool){
    animationsbtns[0].classList.add("active")
    animationsbtns[1].classList.remove("active")
    MotionAllowed = true
    app.classList.remove("MotionDisabled")
    delete settings.allowMotion
  }
  else{
    animationsbtns[1].classList.add("active")
    animationsbtns[0].classList.remove("active")
    MotionAllowed = false
    app.classList.add("MotionDisabled")
    settings.allowMotion = false
  }
  saveSettings()
}

ButtonEvent(animationsbtns[0], allowMotion, true)
ButtonEvent(animationsbtns[1], allowMotion, false)

var VolumeGainMultiplier = null
var volumegaininput = optionsdivs[5].getElementsByTagName("input")[0]
var volumegaininputerror = optionsdivs[5].getElementsByTagName("err")[0]
volumegaininput.addEventListener("input", function(){
  if(volumegaininput.value<0.01){
    if(volumegaininput.value<= 0){
      volumegaininputerror.innerText = "0 and below the sound is muted"
    }
    else{
      volumegaininputerror.innerText = "You might not be able to hear anything if the multiplier is below 0.01"
    }
  }
  else{
    volumegaininputerror.innerText = ""
  }
})
volumegaininput.addEventListener("change",function(){
  var value = volumegaininput.value
  if(value>0){
    if(value==1){
      VolumeGainMultiplier = null
      delete settings.volumeMultiplier
    }
    else{
      VolumeGainMultiplier = volumegaininput.value
      settings.volumeMultiplier = VolumeGainMultiplier
    }
    saveSettings()
    volumegaininputerror.innerText = "You need to restart the audio to affect changes"
  }
  else{
    if(VolumeGainMultiplier!=null){
      volumegaininput.value = VolumeGainMultiplier
    }
    else{
      volumegaininput.value = 1
    }
    volumegaininputerror.innerText = "You need to restart the audio to affect changes"
  }
})

var volumeplaybackinput = optionsdivs[6].getElementsByTagName("input")[0]
var volumeplaybackinputerror = optionsdivs[6].getElementsByTagName("err")[0]
volumeplaybackinput.addEventListener("input", function(){
  if(0.0625<=volumeplaybackinput.value&&volumeplaybackinput.value<=16){//might be .5 and 4 cuz it mutes otherwise?
    song.playbackRate = volumeplaybackinput.value
    // song.mozPreservesPitch = false
    // song.preservesPitch = false dont work. ;(
    settings.playbackRate = volumeplaybackinput.value
    volumeplaybackinput.classList.remove("inputwrong")
    volumeplaybackinputerror.innerText = ""
  }
  else{
    volumeplaybackinput.classList.add("inputwrong")
    volumeplaybackinputerror.innerText = "Value can only be between 0.0625 and 16"
  }
  if(volumeplaybackinput.value==1){

  }
  saveSettings()
})

function loadSettings(settings){
  for (let i = 0; i < themebtns.length; i++) {
    ButtonEvent(themebtns[i], Theme, themebtns[i])
  }
  
  if(settings.theme){
    for (let i = 0; i < themebtns.length; i++) {
      if(themebtns[i].innerHTML == settings.theme){
        Theme(themebtns[i])
        switchToCSS(themebtns[i].innerHTML)()
      } 
    }
  }
  else{
    Theme(themebtns[1])
  }


  if(settings.romanNumerals){
    numeralsbtns[1].click()
  }
  else{
    numeralsbtns[0].classList.add("active")
  }


  if(settings.audioVisualizer == true){
    AudioSpectrumEnabled = true
    visualizerbtns[0].classList.add("active")
  }else{
    visualizerbtns[1].classList.add("active")
  }


  if(settings.allowMotion==false){
    animationsbtns[1].click()
  }else{
    animationsbtns[0].classList.add("active")
  }


  if(settings.volumeMultiplier){
    VolumeGainMultiplier = settings.volumeMultiplier
    volumegaininput.value = VolumeGainMultiplier
  }


  if(settings.playbackRate){
    volumeplaybackinput.value = settings.playbackRate
  }
}

loadSettings(settings)

const jsmediatags = window.jsmediatags;

function ReadFile(file){
    jsmediatags.read(file, {
      onSuccess: function(tag) { 
        
        const data = tag.tags.picture.data;
        const format = tag.tags.picture.format;
        let base64String = "";
        for (let i = 0; i < data.length; i++) {
          base64String += String.fromCharCode(data[i]);
        }
    
        
        // document.querySelector("#cover").style.backgroundImage = `url(data:${format};base64,${window.btoa(base64String)})`;
        
        // document.querySelector("#title").textContent = tag.tags.title;
        // document.querySelector("#artist").textContent = tag.tags.artist;
        // document.querySelector("#album").textContent = tag.tags.album;
        // document.querySelector("#genre").textContent = tag.tags.genre;
        },
        onError: function(error) {
          console.log(error);
        }
    })
}