main.innerHTML = "<h1>Library</h1>"+
"<library>"+
"<div class='song'><ty>Song 0:41</ty><img src='songimage.png'><ti>Calm Place</ti><ar>Hypenexy</ar></div>"+
"<div class='song album'><ty>Album</ty><img src='songimage.png'><dot></dot><ti>Destruction</ti><ar>Hypenexy</ar></div>"+
"<div class='song'><ty>Song 1:21</ty><img src='songimage.png'><ti>Electric Growl</ti><ar>Hypenexy</ar></div>"+
"<div class='song'><ty>Song 2:35</ty><img src='songimage.png'><ti>distortion</ti><ar>Hypenexy</ar></div>"+
"</library>"

var songs = main.getElementsByClassName("song")

ButtonEvent(songs[0], function(){play("calmplace.mp3", "Calm Place", "Hypenexy", "songimage.png")})

//maybe make albums like folders!

//potrebitelski interfaice
//
//linux
//it is not fun
// + e che se tursqt umeniq s linux

//Пеласги
//
//timer?