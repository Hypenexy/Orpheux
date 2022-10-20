main.innerHTML = "<h1>Library</h1>"+
"<library>"+
"<div class='song'><ty>Song 0:41</ty><img src='songimage.png'><ti>Calm Place</ti><ar>Hypenexy</ar></div>"+
`<div class='song album'>
  <ty>Album</ty>
  <img src='songimage.png'><dot></dot>
  <ti>Destruction</ti>
  <ar>Hypenexy</ar>
  <songs>
    <!--<i class='m-i'>close</i>
    <div><ty>Song 1:21</ty><img src='songimage.png'><ti>Electric Growl</ti><ar>Hypenexy</ar></div>-->
  </songs>
</div>`+
"<div class='song'><ty>Song 1:21</ty><img src='songimage.png'><ti>Electric Growl</ti><ar>Hypenexy</ar></div>"+
"<div class='song'><ty>Song 2:35</ty><img src='songimage.png'><ti>distortion</ti><ar>Hypenexy</ar></div>"+
"</library>"

var songs = main.getElementsByClassName("song")

ButtonEvent(songs[0], function(){play("calmplace.mp3", "Calm Place", "Hypenexy")})
ButtonEvent(songs[1], OpenAlbum, songs[1])

function OpenAlbum(element){
  var eloffset = getOffset(element)
  element.style.position = "absolute"//how does an absolute object take space?
  // element.style.top = eloffset.top + "px"
  // element.style.left = eloffset.left + "px"
  element.classList.add("albumactive")
}

function ShowMain(main){
    var mains = view.getElementsByTagName("main")
    for (let i = 0; i < mains.length; i++) {
        if(mains[i].classList[1] == "active"){
            mains[i].classList.remove("active")
        }
    }
    view.getElementsByClassName(main)[0].classList.add("active")
}

window.addEventListener("load", function(){
    ShowMain("library")
    sidepanel.getElementsByTagName("a")[0].classList.add("active")
})


mainexplore.innerHTML = "<h1>Explore</h1>"+
"<div class='artist'><img src='app/artist/5F1B2416-AF81-41FC-B7D1-24B91CF8A0B8.jpeg'><ar>Hypenexy</ar></div>"


mainsettings.innerHTML = "<h1>Settings</h1>"+
"<div><p>Theme</p><a>Dark</a><a>Light</a><a>Mint Green</a><a>Blood Red</a></div>"+
"<div><p>Numerals</p><a>Arabic</a><a>Roman</a></div>"

var optionsdivs = mainsettings.getElementsByTagName("div")
var themebtns = optionsdivs[0].getElementsByTagName("a")

function Theme(theme){
  
  for (let i = 0; i < themebtns.length; i++) {
    themebtns[i].classList.remove("active")
  }
  theme.classList.add("active")

  var execute = function(){}
  switch (theme.innerText) {
    case "Dark":
      execute = function(){document.getElementById("themecss").remove()}
      break;
    case "Light":
      execute = function(){loadCSS("light.css", "themecss")}
      break;
    case "Mint Green":
      execute = function(){loadCSS("green.css", "themecss")}
      break;
    case "Blood Red":
      execute = function(){loadCSS("red.css", "themecss")}
      break;
    default:
      break;
  }
  try {
    var themecss = document.getElementById("themecss")
    if(themecss){
      themecss.remove()
    }
    execute()
  } catch (error) {}
}

for (let i = 0; i < themebtns.length; i++) {
  ButtonEvent(themebtns[i], Theme, themebtns[i])
}

var numeralsbtns = optionsdivs[1].getElementsByTagName("a")

var romanNumerals = false
function Numerals(numeral){
  if(numeral==0){
    numeralsbtns[0].classList.add("active")
    numeralsbtns[1].classList.remove("active")
    romanNumerals = false
  }
  if(numeral==1){
    numeralsbtns[1].classList.add("active")
    numeralsbtns[0].classList.remove("active")
    romanNumerals = true
  }
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