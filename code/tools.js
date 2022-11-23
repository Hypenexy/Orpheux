function showTool(element){
    var tool = document.createElement("div")
    tool.classList.add("tooltransitioned")
    tool.innerHTML = "<toolheader><a>Audio Recorder</a><i class='x m-i'>close</></toolheader>"
    ButtonEvent(tool.getElementsByClassName("x")[0], function(){
        tool.remove()
    })
    tool.classList.add("tool")
    tool.appendChild(element)
    app.appendChild(tool)
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

ButtonEvent(document.querySelector('[data-action="audiogen"]'), function(){showTool(AudioRecorderHTML())})

function WhiteNoiseHTML(){
    var element = document.createElement("tool")
    element.innerHTML = "<input type='range'>"
    return element
}

ButtonEvent(document.querySelector('[data-action="whitenoise"]'), function(){showTool(WhiteNoiseHTML())})