function showTool(element, title){
    var tool = document.createElement("div")
    tool.innerHTML = "<toolheader><a>"+title+"</a><i class='x m-i'>close</i></toolheader>"
    ButtonEvent(tool.getElementsByClassName("x")[0], function(){
        if(element.closeCommand){
            element.closeCommand()
        }
        tool.classList.remove("tooltransitioned")
        document.body.classList.remove("toolactive")
        setTimeout(() => {
            tool.remove()
            main.classList.remove("staticmain")
        }, 300);
    })
    tool.classList.add("tool")
    tool.classList.add("tooltransition")
    tool.appendChild(element)
    main.appendChild(tool)
    document.body.classList.add("toolactive")
    StaticMain()
    setTimeout(function(){
        tool.classList.add("tooltransitioned")
    }, 10);
}

function visualizeMicrophone(stream, canvas) {
    const canvasCtx = canvas.getContext("2d");
    audioCtx = new AudioContext();

    const source = audioCtx.createMediaStreamSource(stream);

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    //analyser.connect(audioCtx.destination);

    draw()

    function draw() {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height;
  
      requestAnimationFrame(draw);
  
      analyser.getByteTimeDomainData(dataArray);
  
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
  
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--maintx');;
  
      canvasCtx.beginPath();
  
      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;
  
  
      for(let i = 0; i < bufferLength; i++) {
  
        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT/2;
  
        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
  
        x += sliceWidth;
      }
  
      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
  
    }
}

function AudioRecorderHTML(){
    var element = document.createElement("tool")
    element.innerHTML = ""
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: true,
        })

        .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream);

            element.innerHTML = `
                <canvas class='miccanvas'></canvas>
                <button class='micrecord m-i'>mic</button>
                <a class='mictimer'>00:00</a>
                <div class='recordings'></div>
            `
            var canvas = element.getElementsByTagName("canvas")[0]
            var micrecord = element.getElementsByClassName("micrecord")[0]
            var mictimer = element.getElementsByClassName("mictimer")[0]
            var recordings = document.getElementsByClassName("recordings")[0]
            var currentlyRecording = false
            ButtonEvent(micrecord, function(){
                if(!micrecord.classList.contains("micrecordactive")){
                    mediaRecorder.start()
                    visualizeMicrophone(stream, canvas)

                    let chunks = [];
                    mediaRecorder.ondataavailable = (e) => {
                        chunks.push(e.data)
                    }

                    mediaRecorder.onstop = (e) => {
                        const clipContainer = document.createElement("div")
                        clipContainer.classList.add("audiorecording")
                        const clipLabel = document.createElement("input")
                        const audio = document.createElement("audio")
                        const playButton = document.createElement("button")
                        const deleteButton = document.createElement("button")
                        var allRecordings = recordings.getElementsByClassName("audiorecording")
                        var allRecordingsNames = []
                        allRecordingsNames.length = allRecordings.length
                        for (let i = 0; i < allRecordingsNames.length; i++) {
                            allRecordingsNames[i] = allRecordings[i].getElementsByTagName("input")[0].value
                        }
                        var name = "My recording"
                        if(allRecordingsNames.includes(name)){
                            var n = 2
                            while(allRecordingsNames.includes(name + " " + n)){
                                n++
                            }
                            name = name + " " + n
                        }

                        playButton.innerHTML = "<i class='m-i'>play_arrow</i>"
                        deleteButton.innerHTML = "<i class='m-i'>delete</i>"
                        clipLabel.value = name

                        clipContainer.appendChild(audio)
                        clipContainer.appendChild(playButton)
                        clipContainer.appendChild(clipLabel)
                        clipContainer.appendChild(deleteButton)
                        recordings.appendChild(clipContainer)

                        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
                        chunks = []
                        const audioURL = window.URL.createObjectURL(blob)
                        audio.src = audioURL

                        playButton.onclick = function(){
                            play(audio.src, clipLabel.value, "")
                        }
                        deleteButton.onclick = function(e){
                            let evtTgt = e.target
                            evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode)
                        }
                    }

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
                    mediaRecorder.stop();
                    currentlyRecording = false
                    micrecord.classList.remove("micrecordactive")
                    mictimer.classList.remove("mictimeractive")
                }
            })
        })

        .catch((err) => {
            if(err.toString()=="NotAllowedError: Permission denied"||err.toString()=="NotAllowedError: Permission dismissed"){//Idk if there are other errors in a similiar nature
                element.innerHTML = `
                    <h1 class='error'>You need to give permission to access your microphone.</h1>
                `
            }
        })
    }
    else{
        console.log("getUserMedia not supported on your browser!");
    }

    return element;
}

ButtonEvent(document.querySelector('[data-action="audiorecorder"]'), function(){showTool(AudioRecorderHTML(), "Audio Recorder")})

function WhiteNoiseHTML(){
    var element = document.createElement("tool")
    element.innerHTML = `
    <div class='noises'>
        <div><svg xmlns='http://www.w3.org/2000/svg' height='48' width='48'><path d='M27.9 43.85q-.55.25-1.175.05t-.875-.75l-3.45-6.9q-.25-.55-.075-1.175t.725-.875q.55-.25 1.175-.05t.875.75l3.45 6.9q.25.55.075 1.175t-.725.875Zm12-.05q-.55.25-1.175.05t-.875-.75l-3.45-6.9q-.25-.55-.075-1.175t.725-.875q.55-.25 1.175-.05t.875.75l3.45 6.9q.25.55.075 1.175t-.725.875Zm-24 0q-.55.25-1.175.075t-.875-.725l-3.45-6.9q-.25-.55-.05-1.175t.75-.875q.55-.25 1.175-.075t.875.725l3.45 6.95q.25.55.05 1.15-.2.6-.75.85ZM14.5 31q-4.35 0-7.425-3.075T4 20.5q0-3.95 2.825-7.05 2.825-3.1 7.025-3.4 1.6-2.8 4.225-4.425Q20.7 4 24 4q4.55 0 7.625 2.875T35.4 14q3.95.2 6.275 2.675Q44 19.15 44 22.5q0 3.5-2.475 6T35.5 31Zm0-3h21q2.3 0 3.9-1.625T41 22.5q0-2.3-1.6-3.9T35.5 17h-3v-1.5q0-3.55-2.475-6.025Q27.55 7 24 7q-2.55 0-4.675 1.375T16.2 12.1l-.4.9h-1.4q-3.1.1-5.25 2.275T7 20.5q0 3.1 2.2 5.3 2.2 2.2 5.3 2.2ZM24 17.5Z'/></svg>
        Rain<input value=0 type='range'></div>
        <div><svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m23.75 48 4.85-5.5-4-2 5.65-6.5h4l-4.85 5.5 4 2-5.65 6.5Zm-12 0 4.85-5.5-4-2 5.65-6.5h4l-4.85 5.5 4 2-5.65 6.5Zm2.75-17q-4.35 0-7.425-3.075T4 20.5q0-3.95 2.825-7.05 2.825-3.1 7.025-3.4 1.6-2.8 4.225-4.425Q20.7 4 24 4q4.55 0 7.625 2.875T35.4 14q3.95.2 6.275 2.675Q44 19.15 44 22.5q0 3.5-2.475 6T35.5 31Zm0-3h21q2.3 0 3.9-1.625T41 22.45q0-2.25-1.6-3.85T35.5 17h-3v-1.5q0-3.55-2.475-6.025Q27.55 7 24 7q-2.55 0-4.675 1.375T16.2 12.1l-.4.9h-1.4q-3.1.1-5.25 2.275T7 20.5q0 3.1 2.2 5.3 2.2 2.2 5.3 2.2ZM24 17.5Z"/></svg>
        Thunder<input value=0 type='range'></div>
    </div>`

    noisesInputs = element.getElementsByTagName("input")
    var noisesAudio = []
    noisesAudio.length = noisesInputs.length
    noisesAudio[0] = new Audio("assets/whitenoise/rain.wav") //there are birds in there i might wanna remove that
    noisesAudio[1] = new Audio("assets/whitenoise/thunder.mp3") //and there is rain in the thunder sooo idk, also loop is not perfect u might wanna cross fade that
    for (let i = 0; i < noisesInputs.length; i++) {
        noisesAudio[i].onended = function(){
            noisesAudio[i].play()
        }
        const element = noisesInputs[i];
        element.addEventListener("input", function(){
            if(element.value!=0){
                if(noisesAudio[i].paused){
                    noisesAudio[i].play()
                }
                noisesAudio[i].volume = element.value / 100
            }
            else{
                noisesAudio[i].pause()
            }
        })
    }
    element.closeCommand = function(){
        for (let i = 0; i < noisesAudio.length; i++) {
            noisesAudio[i].pause()
            delete noisesAudio[i]
        }
        delete noisesAudio // I think this leaves the audio object in the memory
    }
    return element
}

ButtonEvent(document.querySelector('[data-action="whitenoise"]'), function(){showTool(WhiteNoiseHTML(), "White Noise")})


function simpleAudioGen(){
    /**
     * Plays a single sound
     * @param {String} wavetype Either "sine", "square", "sawtooth" or "triangle"
     * @param {Int} frequency The frequency of the sound (pitch) 
     * @param {Int} length The length of the sound in seconds (duration)
     * @param {Int} volume The volume of the sound. A number where 1 is a 100% multiplier.
     */
    function playGenerator(wavetype, frequency, length, volume){
        var context = new (window.AudioContext || window.webkitAudioContext)()
        var osc = context.createOscillator()
        osc.type = wavetype
        osc.frequency.value = frequency
        if(volume){
            var vol = context.createGain()
            vol.gain.value = volume
            osc.connect(vol)
        }
        vol.connect(context.destination)
        osc.start()
        osc.stop(context.currentTime + length);
    }

    playGenerator("square", 200, .3, .02)

    var wavetype = "sine",
    frequency = 300,
    duration = 0.5,
    volume = 1

    var element = document.createElement("tool")
    element.innerHTML = "<div class='genwavetype'><p>Wave type</p><button class='active'>Sine</button><button>Square</button><button>Sawtooth</button><button>Triangle</button></div>"+
    "<div class='genwavetype'><p>Frequency</p><input value='300' type='number'></div>"+
    "<div class='genwavetype'><p>Duration</p><input value='0.5' type='number'></div>"+
    "<div class='genwavetype'><p>Volume</p><input value='1' type='number'></div>"+
    "<div class='genwavetype'><button>Play sound</button></div>"

    var genElements = element.getElementsByClassName("genwavetype")
    var wavetypebtns = genElements[0].getElementsByTagName("button")
    for (let i = 0; i < wavetypebtns.length; i++) {
        const element = wavetypebtns[i];
        ButtonEvent(element, function(){
            for (let i = 0; i < wavetypebtns.length; i++) {
                wavetypebtns[i].classList.remove("active")
            }
            wavetype = wavetypebtns[i].innerText.toLowerCase()
            element.classList.add("active")
        })
    }
    
    genElements[1].getElementsByTagName("input")[0].addEventListener("change", function(){
        frequency = this.value
    })
    genElements[2].getElementsByTagName("input")[0].addEventListener("change", function(){
        duration = this.value 
    })
    genElements[3].getElementsByTagName("input")[0].addEventListener("change", function(){
        volume = this.value
    })
    genElements[4].getElementsByTagName("button")[0].addEventListener("click", function(){
        playGenerator(wavetype, frequency, duration, volume)
    })

    return element
}
ButtonEvent(document.querySelector('[data-action="audiogen"]'), function(){showTool(simpleAudioGen(), "Simple Audio Generator")})






function oscilloscopeVisual(){ // finish this!
    var Oscilloscope = Oscilloscope || function(target, context){
        var _drawWave, _bufferLength, _dataArray;

        this.target = document.querySelector(target);

        this.width = this.target.offsetWidth;
        this.height = this.target.offsetHeight;

        this.wave = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        this.wave.setAttribute('class', 'oscilloscope__wave');

        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute('width', this.width);
        this.svg.setAttribute('height', this.height);
        this.svg.setAttribute('class', 'oscilloscope__svg');
        this.svg.appendChild(this.wave);

        this.target.appendChild(this.svg);

        this.audioContext = context || new window.AudioContext();

        this.running = false;

        this.hasAudio = false;

        this.analyserNode = this.audioContext.createAnalyser();
        this.analyserNode.fftSize = 128;
        _bufferLength = this.analyserNode.frequencyBinCount;
        _dataArray = new Uint8Array(_bufferLength);

        _drawWave = function() {
            var path = 'M';

            this.analyserNode.getByteTimeDomainData(_dataArray);

            _dataArray.forEach(function(point, i) {
                path += (((this.width + (this.width / _bufferLength))/ _bufferLength) * i) + ' ' + ((this.height / 2) * (point / 128.0)) + ', ';
            }.bind(this));

            this.wave.setAttribute('d', path);

            if (this.running) {
                window.requestAnimationFrame(_drawWave);
            }
        }.bind(this);

        
        this.start = function() {
            this.running = true;

            window.requestAnimationFrame(_drawWave);
        }.bind(this);
    }


    Oscilloscope.prototype.stop = function() {
        this.running = false;
    };

    Oscilloscope.prototype.connect = function(node) {
        this.analyserNode.connect(node);
    };

    Oscilloscope.prototype.toggleAudio = function() {
        if (!!this.hasAudio) {
            this.analyserNode.disconnect();
        } else {
            this.analyserNode.connect(this.audioContext.destination);
        }
        this.hasAudio = !this.hasAudio;
    };





    var wavetype = "sine",
    frequency = 300,
    duration = 0.5,
    volume = 1

    var element = document.createElement("tool")
    element.innerHTML = "<div class='genwavetype'><p>Wave type</p><button class='active'>Sine</button><button>Square</button><button>Sawtooth</button><button>Triangle</button></div>"+
    "<div class='genwavetype'><p>Frequency</p><input value='300' type='number'></div>"+
    "<div class='genwavetype'><p>Duration</p><input value='0.5' type='number'></div>"+
    "<div class='genwavetype'><p>Volume</p><input value='1' type='number'></div>"+
    "<div class='genwavetype'><button>Play sound</button></div>"

    var genElements = element.getElementsByClassName("genwavetype")
    var wavetypebtns = genElements[0].getElementsByTagName("button")
    for (let i = 0; i < wavetypebtns.length; i++) {
        const element = wavetypebtns[i];
        ButtonEvent(element, function(){
            for (let i = 0; i < wavetypebtns.length; i++) {
                wavetypebtns[i].classList.remove("active")
            }
            wavetype = wavetypebtns[i].innerText.toLowerCase()
            element.classList.add("active")
        })
    }
    
    genElements[1].getElementsByTagName("input")[0].addEventListener("change", function(){
        frequency = this.value
    })
    genElements[2].getElementsByTagName("input")[0].addEventListener("change", function(){
        duration = this.value 
    })
    genElements[3].getElementsByTagName("input")[0].addEventListener("change", function(){
        volume = this.value
    })
    genElements[4].getElementsByTagName("button")[0].addEventListener("click", function(){
        playGenerator(wavetype, frequency, duration, volume)
    })

    return element
}
ButtonEvent(document.querySelector('[data-action="audiogen"]'), function(){showTool(simpleAudioGen(), "Simple Audio Generator")})




function Water(){
    var element = document.createElement("tool")
    element.innerHTML = `<div class='watertutorial'>
    <h1>Learn how to see sound frequencies using water</h1>
    <h2>You'll need:</h2>
    <h3>• A speaker</h3>
    <h3>• A tray of water</h3>
    <img src='assets/water/speaker.jpg'>
    <h2>1. Open Orpheux</h2>
    <h2>2. Go to Tools and open "Simple Audio Generator"</h2>
    <h2>3. Set the tray in direct contact with the speaker</h2>
    <h2>4. Set the frequency to 80 and the duration to something longer</h2>
    <img style='width:initial' src='assets/water/settings2.png'>
    <h2>5. Click "Play sound" and watch water ripple</h2>
    </div>`
    return element
}
ButtonEvent(document.querySelector('[data-action="water"]'), function(){showTool(Water(), "Water")})