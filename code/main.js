main.innerHTML = "<h1>Library</h1>"+
"<library>"+
"<div class='song'><ty>Song 0:41</ty><img src='songimage.png'><ti>Calm Place</ti><ar>Hypenexy</ar></div>"+
"<div class='song album'><ty>Album</ty><img src='songimage.png'><dot></dot><ti>Destruction</ti><ar>Hypenexy</ar></div>"+
"<div class='song'><ty>Song 1:21</ty><img src='songimage.png'><ti>Electric Growl</ti><ar>Hypenexy</ar></div>"+
"<div class='song'><ty>Song 2:35</ty><img src='songimage.png'><ti>distortion</ti><ar>Hypenexy</ar></div>"+
"</library>"

var songs = main.getElementsByClassName("song")

ButtonEvent(songs[0], function(){play("calmplace.mp3", "Calm Place", "Hypenexy")})

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
"<div><p>Theme</p><a>Dark</a><a>Light</a></div>"+
"<div><p>Numerals</p><a>Arabic</a><a>Roman</a></div>"

var optionbtns = mainsettings.getElementsByTagName("a")

function Theme(theme){
  if(theme==0){
    optionbtns[0].classList.add("active")
    optionbtns[1].classList.remove("active")
    try {
      document.getElementById("themecss").remove()
    } catch (error) {
      
    }
  }
  if(theme==1){
    optionbtns[1].classList.add("active")
    optionbtns[0].classList.remove("active")
    try {
      loadCSS("light.css", "themecss")
    } catch (error) {
      
    }
  }
}

ButtonEvent(optionbtns[0], Theme, 0)
ButtonEvent(optionbtns[1], Theme, 1)

var romanNumerals = false
function Numerals(numeral){
  if(numeral==0){
    optionbtns[2].classList.add("active")
    optionbtns[3].classList.remove("active")
    romanNumerals = false
  }
  if(numeral==1){
    optionbtns[3].classList.add("active")
    optionbtns[2].classList.remove("active")
    romanNumerals = true
  }
}

ButtonEvent(optionbtns[2], Numerals, 0)
ButtonEvent(optionbtns[3], Numerals, 1)

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

  




//settings idea
//roman numerals