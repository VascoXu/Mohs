// Wait for voices to load
var voices;
window.speechSynthesis.onvoiceschanged = function() {
  voices = window.speechSynthesis.getVoices();
};

export function insertToDatabase(db, table, data) {
  var transaction = db.transaction([table], "readwrite");

  transaction.oncomplete = function(event) {
    console.log("All done!");
  };

  transaction.onerror = function(event) {
    // Generic error handler for all errors targeted at this database's request
    console.error("Database error: " + event.target.errorCode);    
  };

  var objectStore = transaction.objectStore(table);
  var request = objectStore.add(data);
  request.onsuccess = function(event) {
  }
}

export function databaseGetAll(db) {
  var transaction = db.transaction('log', 'readonly');
  var objectStore = transaction.objectStore('log');
  objectStore.getAll().onsuccess = function(event) {
    return event.target.result
  };
}

export function playSound(sound) {
  // Hard-code phonetics
  sound = sound.toLowerCase();
  if (sound.includes("vaseline")) {
    sound = sound.replace("vaseline", "vaselleen");
  }
  if (sound.includes("wound")) {
    sound = sound.replace("wound", "woond");
  }

  window.speechSynthesis.cancel();

  var msg = new SpeechSynthesisUtterance(sound);

  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    msg.voice = voices[49]; // "Google US English"
    msg.rate = 0.75;
    window.speechSynthesis.speak(msg);
  }
}

export function playBeep() {
  var beep = new Audio("beep.mp3");
  beep.play();
}

export function logData(log) {
  // Send log to server
  fetch('/api/log', {
    method: 'POST',
    body: JSON.stringify(log),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  });
}

export function log(action, startTime, foldername) {
  // Log action to database
  var abs_timestamp = getCurrentTime();
  var rel_timestamp = (startTime === "start") ? "00:00:00" : getTimeElapsed(startTime);
  var data = {foldername: foldername, abs_timestamp: abs_timestamp, rel_timestamp: rel_timestamp, action: action};
  logData(data);
}

export function formatSeconds(secs) {
  var hours   = Math.floor(secs / 3600);
  var minutes = Math.floor((secs - (hours * 3600)) / 60);
  var seconds = secs - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return (hours+':'+minutes+':'+seconds);
}

export function getTimeElapsed(startTime) {
  var endTime = new Date();
  var timeDiff = endTime - startTime;
  timeDiff /= 1000;

  return formatSeconds(Math.round(timeDiff));
}

export function getTodaysDate() {
  var today = new Date();
  var day = today.getDate();
  var month = (today.getMonth() < 10) ? `0${today.getMonth() + 1}` : (today.getMonth() + 1);
  var year = today.getFullYear();
  var date = `${month}${day}${year}`;
  return date;
}

export function getCurrentTime() {
  var time = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
  time = time.slice(time.lastIndexOf(',') + 2);;
  time = time.substring(0, time.length - 3);
  return time;
}