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
  window.speechSynthesis.cancel();
  var msg = new SpeechSynthesisUtterance(sound);
  window.speechSynthesis.speak(msg);
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

export function getCurrentTime() {
  var time = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
  return time.substr(11, 8);
}