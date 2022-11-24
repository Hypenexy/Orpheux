function showTool(element, title){
    var tool = document.createElement("div")
    tool.innerHTML = "<toolheader><a>"+title+"</a><i class='x m-i'>close</></toolheader>"
    ButtonEvent(tool.getElementsByClassName("x")[0], function(){
        tool.classList.remove("tooltransitioned")
        setTimeout(() => {
            tool.remove()
            main.classList.remove("staticmain")
            player.classList.remove("AudioSpectrum")
        }, 300);
    })
    tool.classList.add("tool")
    tool.classList.add("tooltransition")
    tool.appendChild(element)
    main.appendChild(tool)
    StaticMain()
    player.classList.add("AudioSpectrum")
    setTimeout(function(){
        tool.classList.add("tooltransitioned")
    }, 10);
}

function AudioRecorderHTML(){
    var element = document.createElement("tool")
    element.innerHTML = ""
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: true,
        })

        // Success callback
        .then((stream) => {
            element.innerHTML = `
                <button class='micrecord m-i'>mic</button>
                <a class='mictimer'>00:00</a>
            `
            var micrecord = element.getElementsByClassName("micrecord")[0]
            var mictimer = element.getElementsByClassName("mictimer")[0]
            var currentlyRecording = false
            ButtonEvent(micrecord, function(){
                if(!micrecord.classList.contains("micrecordactive")){
                    micrecord.classList.add("micrecordactive")
                    mictimer.classList.add("mictimeractive")
                    //start recording here
                    currentlyRecording = true
                    var recordingTime = 0
                    function incrementSeconds(){
                        recordingTime++
                        mictimer.innerText = formatTime(recordingTime)
                        if(currentlyRecording != false){ // this way of stopping it is not a good idea but idk how else! maybe learn to make a proper timer retard
                            setTimeout(() => {
                                incrementSeconds()
                            }, 1000);
                        }
                        else{
                            //finalize recording
                        }
                    }
                    incrementSeconds()

                }
                else{
                    currentlyRecording = false
                    micrecord.classList.remove("micrecordactive")
                    mictimer.classList.remove("mictimeractive")
                }
            })
        })

        // Error callback
        .catch((err) => {
            if(err.toString()=="NotAllowedError: Permission denied"||err.toString()=="NotAllowedError: Permission dismissed"){//Idk if there are other errors in a similiar nature
                element.innerHTML = `
                    <h1 class='error'>You need to give permission to access your microphone.</h1>
                `
            }
            console.log(err.toString())
            console.log(err)
        })
    }
    else{
        console.log("getUserMedia not supported on your browser!");
    }

    return element;
}

ButtonEvent(document.querySelector('[data-action="audiogen"]'), function(){showTool(AudioRecorderHTML(), "Audio Recorder")})

function WhiteNoiseHTML(){
    var element = document.createElement("tool")
    element.innerHTML = "<input type='range'>"
    return element
}

ButtonEvent(document.querySelector('[data-action="whitenoise"]'), function(){showTool(WhiteNoiseHTML(), "White Noise")})