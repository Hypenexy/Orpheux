sidepanel.innerHTML = "<h1>Orpheux</h1>"+
"<a><i class='m-i'>library_music</i><p>Library</p></a>"+
"<a><i class='m-i'>search</i><p>Explore</p></a>"+
"<a><i class='m-i'>settings</i><p>Settings</p></a>"

var sidepanelbtns = sidepanel.getElementsByTagName("a")

for (let i = 0; i < sidepanelbtns.length; i++) {
    const element = sidepanelbtns[i];
    ButtonEvent(element, function(){
        for (let i = 0; i < sidepanelbtns.length; i++) {
            sidepanelbtns[i].classList.remove("active")
        }
        element.classList.add("active")
        var menuParsed = element.innerText.toLowerCase()
        if(element.innerText.includes('\n\n')){
            menuParsed = menuParsed.split('\n\n')[1]

        }
        else{
            menuParsed = menuParsed.split('\n')[1]
        }
        ShowMain(menuParsed)
    })
}