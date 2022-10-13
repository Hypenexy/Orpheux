sidepanel.innerHTML = "<h1>Orpheux</h1>"+
"<a><i class='m-i'>library_music</i> Library</a>"+
"<a><i class='m-i'>search</i> Explore</a>"+
"<a><i class='m-i'>settings</i> Settings</a>"

var sidepanelbtns = sidepanel.getElementsByTagName("a")

for (let i = 0; i < sidepanelbtns.length; i++) {
    const element = sidepanelbtns[i];
    ButtonEvent(element, function(){element.classList.add("active")})
}