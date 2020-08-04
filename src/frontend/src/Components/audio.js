var mediaRecorder = {};
var chunks = [];

export function startAudioRecording() {
  // Ensure getUserMedia is supported
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.getUserMedia (
      {
        audio: true
      })

      // Success callback, start recording
      .then((stream) => startRecording(stream))

      // Error callback
      .catch(function(err) {
        console.log('The following getUserMedia error occured: ' + err);
      }
    );
  } else {
    console.log('getUserMedia not supported on your browser!');
  }
}

function startRecording(stream) {
  // Start recording
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.start(10);

  // Start visualizing audio
  // visualize(stream);

  console.log("recorder started");

  mediaRecorder.ondataavailable = function(e) {
    chunks.push(e.data);
  }
}

export function stopAudioRecording(filename, foldername) {
  // Stop recording
  mediaRecorder.stop();
  console.log(mediaRecorder.state);
  console.log("recorder stopped");
  mediaRecorder.onstop = (e) => stopRecording(e, filename, foldername);
}

function stopRecording(e, filename, foldername) {
  // Stop and save the recording
  console.log("recorder onstopped");
  const blob = new Blob(chunks, { 'type' : 'audio/wav; codecs=0' });
  
  // Package the data
  var fd = new FormData();
  fd.append("filename", filename);
  fd.append("foldername", foldername);
  fd.append("pnum", localStorage.getItem("currentPnum"));
  fd.append("audio", blob);

  // Send audio blob to server
  fetch('/api/audio', {
    method: 'POST',
    body: fd,
  })
  .then(response => response.json())
  .then(result => {
    // Print result
    console.log(result);
  });

  /*
  // Format data to send to server (using base64 encoding)
  var reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = function(event) {
    var base64AudioMessage = event.target.result.split(',')[1];

    // Send audio blob to server
    fetch('/api/audio', {
      method: 'POST',
      body: JSON.stringify({
        filename: 'hello.wav',
        audiostring: base64AudioMessage
      }),
      headers: new Headers({ 'content-type': 'application/json' })
    })
    .then(response => response.json())
    .then(result => {
      // Print result
      console.log(result);
    });
  }
  */

  chunks = [];

  /*
  const clipName = prompt('Enter a name for your sound clip');

  const clipContainer = document.createElement('article');
  const clipLabel = document.createElement('p');
  const audio = document.createElement('audio');
  const deleteButton = document.createElement('button');
    
  const soundClips = document.querySelector('.sound-clips');    

  clipContainer.classList.add('clip');
  audio.setAttribute('controls', '');
  deleteButton.innerHTML = "Delete";
  clipLabel.innerHTML = clipName;

  clipContainer.appendChild(audio);
  clipContainer.appendChild(clipLabel);
  clipContainer.appendChild(deleteButton);
  soundClips.appendChild(clipContainer);

  audio.controls = true;
  const blob = new Blob(chunks, { 'type' : 'audio/wav;' });
  
  chunks = [];
  const audioURL = window.URL.createObjectURL(blob);
  audio.src = audioURL;

  deleteButton.onclick = function(e) {
    let evtTgt = e.target;
    evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
  }
  */
}

function visualize(stream) {
  // Visualize audio stream
  const canvas = document.querySelector('.visualizer');
  const canvasCtx = canvas.getContext("2d");
  let audioCtx;

  if(!audioCtx) {
    audioCtx = new AudioContext();
  }

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

    canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

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

  // Convert an AudioBuffer to a Blob using WAVE representation
  // https://www.russellgood.com/how-to-convert-audiobuffer-to-audio-file/
  function bufferToWave(abuffer, len) {
    var numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        offset = 0,
        pos = 0;

    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"

    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)

    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length

    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
    channels.push(abuffer.getChannelData(i));

    while(pos < length) {
    for(i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
    }
    offset++                                     // next source sample
    }

    // create Blob
    return new Blob([buffer], {type: "audio/wav"});

    function setUint16(data) {
    view.setUint16(pos, data, true);
    pos += 2;
    }

    function setUint32(data) {
    view.setUint32(pos, data, true);
    pos += 4;
    }
}
