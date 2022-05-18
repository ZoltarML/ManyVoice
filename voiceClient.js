let groupOpen = false;
let chatMenuOpen = false;
let callMenuOpen = false;
let connectionId = null;

let groupList = {};

function dragElement(elmnt, selmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    selmnt.style.top = selmnt.offsetTop - pos2 + "px";
    selmnt.style.left = selmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// callMenu
let callHolder = document.createElement("div");
callHolder.classList.add("call-holder");
callHolder.style.top = `0px`;
callHolder.style.left = `0px`;
callHolder.id = "CCHolder";

let callBar = document.createElement("div");
callBar.classList.add("call-bar");
callBar.id = "CCBar";
callHolder.appendChild(callBar);

let callWrapper = document.createElement("div");
callWrapper.classList.add("call-wrapper");
callHolder.appendChild(callWrapper);

let bottomCallBar = document.createElement("div");
bottomCallBar.classList.add("message-composer");
callHolder.appendChild(bottomCallBar);

// group
let groupHolder = document.createElement("div");
groupHolder.classList.add("group-holder");
groupHolder.style.top = `0px`;
groupHolder.style.left = `0px`;
groupHolder.id = "CVHolder";

let groupBar = document.createElement("div");
groupBar.classList.add("group-bar");
groupBar.id = "CVBar";
groupHolder.appendChild(groupBar);

let groupWrapper = document.createElement("div");
groupWrapper.classList.add("group-wrapper");
groupHolder.appendChild(groupWrapper);

// exit button
let image1 = document.createElement("img");
image1.width = "35";
image1.height = "35";
image1.src =
  "https://cdn.discordapp.com/attachments/614637022614782000/911026015957045248/f2b902c3b15eeed.png";
image1.classList.add("exit-button");
groupBar.appendChild(image1);

image1.onclick = function () {
  ig.game.sounds.click.play();
  groupHolder.style.visibility = "hidden";
  groupOpen = false;
};

// mute button
let isMuted = false;
let muteButton = document.createElement("img");
muteButton.width = "50";
muteButton.height = "52";
muteButton.src =
  "https://cdn.discordapp.com/attachments/614637022614782000/939544338701123714/ecbf7de66f1df64.png";
muteButton.classList.add("mute-button");

muteButton.onclick = function () {
  if (isMuted)
    muteButton.src =
      "https://cdn.discordapp.com/attachments/614637022614782000/939544338701123714/ecbf7de66f1df64.png";
  else
    muteButton.src =
      "https://cdn.discordapp.com/attachments/614637022614782000/939544215476666408/c9a5ae84e3c4a66.png";

  ig.game.sounds.click.play();
  isMuted = !isMuted;
};

bottomCallBar.appendChild(muteButton);

// deaf button
let isDeaf = false;
let deafButton = document.createElement("img");
deafButton.width = "55";
deafButton.height = "52";
deafButton.src =
  "https://cdn.discordapp.com/attachments/614637022614782000/939544109595652156/4384f8b5416d847.png";
deafButton.classList.add("deaf-button");

deafButton.onclick = function () {
  if (isDeaf)
    deafButton.src =
      "https://cdn.discordapp.com/attachments/614637022614782000/939544109595652156/4384f8b5416d847.png";
  else
    deafButton.src =
      "https://cdn.discordapp.com/attachments/614637022614782000/939544075688869908/c98c770b6de73c9.png";

  ig.game.sounds.click.play();
  isDeaf = !isDeaf;
};

bottomCallBar.appendChild(deafButton);

// Hangup button
let hangupButton = document.createElement("img");
hangupButton.width = "60";
hangupButton.height = "50";
hangupButton.src =
  "https://cdn.discordapp.com/attachments/614637022614782000/939546188770848808/98f245296a979cd.png";
hangupButton.classList.add("hangup-button");

hangupButton.onclick = function () {
  socket.emit("leaveWorldGroup");

  callWrapper.innerHTML = "";
  callHolder.style.visibility = "hidden";
  callMenuOpen = false;

  ig.game.sounds.click.play();
};

bottomCallBar.appendChild(hangupButton);

let addButton = document.createElement("img");
addButton.width = "25";
addButton.height = "25";
addButton.src =
  "https://cdn.discordapp.com/attachments/614637022614782000/923671839371325500/2722f0cdd620ddb.png";
addButton.classList.add("add-button");

let alertText = `<p class="miftThankYouMessage">Enter group information</p> <p>NAME <input type="text" id="nam" maxlength="255" style="width: 30%; text-transform: uppercase;"/></p><p class="disableContentSelect" style="margin: 0px;padding: 0px 90px 0px 0px; border-radius: 8px; cursor: default" onclick="ig.game.settings.toggleCheckbox('isPrivate'); passParam();">PRIVATE <img src="//static-manyland.netdna-ssl.com/media/checkbox/off/3.png" alt="" id="checkbox_isPrivate" /> <span id="isPrivateInfo" style="display: inline-block; opacity: .5; margin-left: 28px; font-size: 90%"></span></p><br><a href="javascript:addGroup()" class="okButton">CREATE</a>`;
ig.game.settings.isPrivate = false;

function passParam() {
  let alertD = document.getElementById("alertDialog");
  ig.game.settings.isPrivate = !ig.game.settings.isPrivate;

  if (ig.game.settings.isPrivate) {
    let newDia = alertD.children[0].innerHTML
      .split("<br><a")
      .join(
        '<p>PASSWORD <input type="text" id="pass" maxlength="255" style="width: 22%; text-transform: uppercase;"/></p><a'
      );
    alertD.children[0].innerHTML = newDia;
  } else {
    alertD.children[0].innerHTML = alertText;
  }
}

function addGroup() {
  let gName = document.getElementById("nam");
  if (gName.value === "") {
    ig.game.alertDialog.open(
      "<p style='color: red'>Name cannot be empty...</p>",
      !0,
      null,
      null,
      null,
      !0,
      null,
      null,
      !0,
      null,
      null,
      !0
    );
    return;
  }

  if (ig.game.settings.isPrivate) {
    let gPass = document.getElementById("pass");
    if (gPass.value === "") {
      ig.game.alertDialog.open(
        "<p style='color: red'>Password cannot be empty...</p>",
        !0,
        null,
        null,
        null,
        !0,
        null,
        null,
        !0,
        null,
        null,
        !0
      );
      return;
    }
    socket.emit("createWorldGroup", {
      isPrivate: ig.game.settings.isPrivate,
      password: gPass.value,
      groupName: gName.value,
      world: document.location.pathname.substring(1),
      hostId: ig.game.player.id,
    });
  } else {
    socket.emit("createWorldGroup", {
      isPrivate: ig.game.settings.isPrivate,
      password: "",
      groupName: gName.value,
      world: document.location.pathname.substring(1),
      hostId: ig.game.player.id,
    });
  }

  ig.game.alertDialog.close();
  ig.game.sounds.click.play();

  openCall();
}

addButton.onclick = function () {
  ig.game.sounds.click.play();
  groupHolder.style.visibility = "hidden";
  groupOpen = false;

  ig.game.alertDialog.open(
    alertText,
    !0,
    null,
    null,
    null,
    !0,
    null,
    null,
    !0,
    null,
    null,
    !0
  );
};

groupBar.appendChild(addButton);

let entryOpen = false;

function createEntry(name, isPrivate, id, count, host, connections) {
  if (name.length >= 30) {
    name = name.substring(0, 28) + "...";
  }

  if (host.length >= 25) {
    host = host.substring(0, 11) + "...";
  }
  let senderId = id;
  // Style
  let groupEntry = document.createElement("div");
  groupEntry.classList.add("group-entry");
  // Configure
  groupEntry.id = senderId;

  let senderName = document.createElement("p");
  senderName.classList.add("group-sender-name");
  senderName.innerText = name.toUpperCase();
  groupEntry.appendChild(senderName);

  let peopleCount = document.createElement("p");
  peopleCount.classList.add("people-count");
  peopleCount.innerText = count;
  groupEntry.appendChild(peopleCount);
  peopleCount.style.visibility = "hidden";

  let closeConvo = document.createElement("img");
  closeConvo.classList.add("group-closer");
  // Configure
  closeConvo.width = "25";
  closeConvo.height = "25";
  closeConvo.src =
    "https://cdn.discordapp.com/attachments/614637022614782000/912193129107587092/a32f04c951bf698.png";
  groupEntry.appendChild(closeConvo);

  if (isPrivate) {
    closeConvo.style.visibility = "visible";
  } else {
    closeConvo.style.visibility = "hidden";
  }

  groupEntry.onmouseover = () => {
    groupEntry.style.backgroundColor = "rgba(75, 75, 75, 0.25)";
    closeConvo.style.visibility = "visible";
    closeConvo.width = "45";
    closeConvo.height = "30";
    senderName.style.fontStyle = "italic";
    senderName.innerHTML =
      `HOST: <span style="color: #1c6c0c">` + host.toUpperCase() + "</span>";
    closeConvo.setAttribute(
      "src",
      "https://cdn.discordapp.com/attachments/614637022614782000/912461875004977172/0ae032891a92df8.png"
    );
    peopleCount.style.visibility = "visible";
  };
  groupEntry.onmouseout = () => {
    if (!isPrivate) closeConvo.style.visibility = "hidden";
    closeConvo.width = "25";
    closeConvo.height = "25";
    senderName.style.fontStyle = "normal";
    senderName.innerText = name.toUpperCase();
    closeConvo.setAttribute(
      "src",
      "https://cdn.discordapp.com/attachments/614637022614782000/912193129107587092/a32f04c951bf698.png"
    );
    peopleCount.style.visibility = "hidden";

    groupEntry.style.backgroundColor = "";
  };

  groupEntry.onmouseup = () => {
    entryOpen = true;
    let foundSelf = false;

    for (con in connections) {
      if (connections[con].MLIdentity === ig.game.player.id) {
        foundSelf = true;
        break;
      }
    }

    if (foundSelf) {
      ig.game.sounds.nocando.play();
      ig.game.alertDialog.open(
        "<p style='color: red'>You're already in this world group...</p>",
        !0,
        null,
        null,
        null,
        !0,
        null,
        null,
        !0,
        null,
        null,
        !0
      );
      entryOpen = false;
      return;
    }

    if (isPrivate) {
      ig.game.alertDialog.open(
        "<p class='miftThankYouMessage'>Enter Password</p><input id='in' autocomplete='off'></input>",
        !0,
        null,
        null,
        null,
        !0,
        null,
        null,
        !0,
        null,
        null,
        !0
      );
      let pass = document.getElementById("in");

      function passwordEvent(event) {
        if (event.key === "Enter") {
          ig.game.alertDialog.close();
          document.removeEventListener("keyup", passwordEvent);

          let p = pass.value;
          socket.emit("joinWorldGroup", {
            world: document.location.pathname.substring(1),
            hostId: id,
            password: p,
          });

          groupHolder.style.visibility = "hidden";
          groupOpen = false;

          entryOpen = false;
        }
      }

      document.addEventListener("keyup", passwordEvent);
    } else {
      socket.emit("joinWorldGroup", {
        world: document.location.pathname.substring(1),
        hostId: id,
      });
      groupHolder.style.visibility = "hidden";
      groupOpen = false;

      entryOpen = false;
    }
  };
  groupWrapper.appendChild(groupEntry);
}

function createSpeaker(name, callId) {
  if (name.length >= 20) {
    name = name.substring(0, 15) + "...";
  }
  // Style
  let callEntry = document.createElement("div");
  callEntry.classList.add("group-entry");
  // Configure
  callEntry.id = callId;

  let senderName = document.createElement("p");
  senderName.classList.add("group-sender-name");
  senderName.innerText = name.toUpperCase();
  callEntry.appendChild(senderName);

  callWrapper.appendChild(callEntry);
}

function updateGroupList() {
  socket.emit("getGroupCount", document.location.pathname.substring(1));
  socket.on("groupCount", (data) => {
    groupWrapper.innerHTML = "";
    if (data.number !== 0) {
      for (let group in data.groups) {
        createEntry(
          data.groups[group].name,
          data.groups[group].private,
          group,
          Object.keys(data.groups[group].connections).length,
          data.groups[group].hostName,
          data.groups[group].connections
        );
      }
    }
  });
}

function openGroup() {
  if (!groupOpen) {
    ig.game.sounds.click.play();
    updateGroupList();
    groupHolder.style.visibility = "visible";

    groupOpen = true;
  }
}

function openCall() {
  if (!callMenuOpen) {
    ig.game.sounds.click.play();
    // updateGroupList();
    callHolder.style.visibility = "visible";
    callWrapper.innerHTML = "";

    callMenuOpen = true;
  }
}

getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};

async function loadCSS() {
  fetch("https://cdn.jsdelivr.net/gh/ZoltarML/ManyVoice@latest/manyvoice.css")
    .then((resp) => resp.text())
    .then((css) => {
      let style = document.createElement("style");
      style.innerHTML = css;
      $("head")[0].appendChild(style);
    });
}

// Getting Parses deobfuscator and Socket.io
!(async function main() {
  if (typeof io !== "undefined") return;

  await $.getScript(
    "https://cdn.jsdelivr.net/gh/socketio/socket.io-client/dist/socket.io.min.js"
  );

  loadCSS().then(async () => {
    if (typeof Deobfuscator === "undefined")
      // Parses deobf
      await $.getScript(
        "https://cdn.jsdelivr.net/gh/parseml/many-deobf@latest/deobf.js"
      );

    init(500);
  });
})();

let globalGroupCount = 0;

function addNewSubMenu(name, callback) {
  if (ig.game.bottomMenu.subMenus.length == 0) return;

  let bottomMenu = ig.game.bottomMenu.subMenus[0];

  if (!bottomMenu.pos._y) {
    bottomMenu._numberOfMenuItems = bottomMenu.numberOfMenuItems;
    bottomMenu._update = bottomMenu.update;
    bottomMenu.pos._y = bottomMenu.pos.y;
    bottomMenu._open = bottomMenu.open;
    bottomMenu._draw = bottomMenu.draw;
  }

  bottomMenu.pos.y = bottomMenu.pos._y - 20;
  bottomMenu.numberOfMenuItems = bottomMenu._numberOfMenuItems + 1;

  bottomMenu.open = function () {
    this._open();

    let position = {
      x: this.clickSpotHelp.pos.x,
      y: this.clickSpotHelp.pos.y + this.clickSpotHeight,
    };

    let size = {
      x: this.clickSpotHelp.size.x,
      y: this.clickSpotHelp.size.y,
    };

    this.clickSpotGroups = new UIClickSpot(
      position,
      size,
      false,
      "clickSpotGroups"
    );
    this.clickSpotGroups.onClick = callback;

    socket.emit("getGroupCount", document.location.pathname.substring(1));
    socket.on("groupCount", (data) => {
      globalGroupCount = data.number;
    });
  };

  bottomMenu.update = function () {
    this._update();
    this.clickSpotGroups && this.clickSpotGroups.update();
  };

  bottomMenu.draw = function () {
    this._draw();

    if (!this.isOpen) return;

    ig.system.context.globalAlpha = 0.7;

    ig.game.blackFont.draw(
      name,
      this.clickSpotHelp.pos.x + 5,
      this.clickSpotHelp.pos.y + 5 + this.clickSpotHeight
    );

    ig.system.context.globalAlpha = 1;

    ig.system.context.globalAlpha = 0.4;

    ig.game.blackFont.draw(
      globalGroupCount,
      this.clickSpotHelp.pos.x + 70,
      this.clickSpotHelp.pos.y + 5 + this.clickSpotHeight
    );

    ig.system.context.globalAlpha = 1;
  };
}

function init(time) {
  $("body")[0].appendChild(groupHolder);
  $("body")[0].appendChild(callHolder);

  // Making menus able to be dragged
  dragElement(
    document.getElementById("CVBar"),
    document.getElementById("CVHolder")
  );
  dragElement(
    document.getElementById("CCBar"),
    document.getElementById("CCHolder")
  );

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    let vol = 0;
    var mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    const audioContext = new AudioContext();
    const mediaStreamAudioSourceNode =
      audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);
    let volAvg = [];

    const onFrame = () => {
      analyserNode.getFloatTimeDomainData(pcmData);
      let sumSquares = 0.0;
      for (const amplitude of pcmData) {
        sumSquares += amplitude * amplitude;
      }
      vol = Math.sqrt(sumSquares / pcmData.length) * 100;
      volAvg.push(vol);

      window.requestAnimationFrame(onFrame);
    };

    window.requestAnimationFrame(onFrame);

    var audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", function (event) {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener("stop", function () {
      var audioBlob = new Blob(audioChunks);
      let values = (average = 0);
      for (var i = 0; i < volAvg.length; i++) {
        values += volAvg[i];
      }

      average = values / volAvg.length;
      audioChunks = [];

      var fileReader = new FileReader();
      fileReader.readAsDataURL(audioBlob);
      fileReader.onloadend = function () {
        if (isMuted) return;

        var base64String = fileReader.result;
        volAvg = [];
        if (average <= 0.9) return;

        socket.emit("voice", base64String);
        if (callMenuOpen) {
          let speakerFrame = document.getElementById(connectionId);
          speakerFrame.children[0].style.color = "#1c6c0c";
          setTimeout(() => {
            speakerFrame.children[0].style.color = "#4f4d4c";
          }, 1500);
        }
      };

      mediaRecorder.start();

      setTimeout(function () {
        mediaRecorder.stop();
      }, time);
    });

    setTimeout(function () {
      mediaRecorder.stop();
    }, time);
  });

  socket = io("http://localhost:3125", {
    reconnection: false,
  });
  socket.emit("MLUID", {
    connectId: ig.game.player[id],
    user: JSON.stringify(ig.game.player, getCircularReplacer()),
  });

  socket.on("send", function (data) {
    if (!isDeaf) {
      var audio = new Audio(data.audio);
      let speakerFrame = document.getElementById(data.id);
      speakerFrame.children[0].style.color = "#1c6c0c";

      audio.play();
      setTimeout(() => {
        speakerFrame.children[0].style.color = "#4f4d4c";
      }, 1500);
    }
  });

  socket.on("reject", (reason) => {
    ig.game.sounds.nocando.play();
    ig.game.alertDialog.open(
      "<p style='color: red'>" + reason + "</p>",
      !0,
      null,
      null,
      null,
      !0,
      null,
      null,
      !0,
      null,
      null,
      !0
    );
  });

  socket.on("joined", (data) => {
    if (data.cause === "join") {
      openCall();
      socket.emit("secondInfoCount", {
        world: document.location.pathname.substring(1),
        joinData: data,
      });
    } else if (data.cause === "update") {
      if (data.id !== connectionId) ig.game.sounds.bell_3_f.play();

      createSpeaker(data.caller.username, data.id);
    }
  });

  socket.on("left", (data) => {
    callWrapper.removeChild(document.getElementById(data));
    ig.game.sounds.bell_2_as.play();
  });

  socket.on("groupEnd", () => {
    callWrapper.innerHTML = "";
    callHolder.style.visibility = "hidden";
    callMenuOpen = false;
    ig.game.alertDialog.open(
      "<p style='color: black'>Host has ended the world group!</p>",
      !0,
      null,
      null,
      null,
      !0,
      null,
      null,
      !0,
      null,
      null,
      !0
    );
  });

  socket.on("alert", (reason) => {
    ig.game.sounds.click.play();
    ig.game.alertDialog.open(
      "<p style='color: black'>" + reason + "</p>",
      !0,
      null,
      null,
      null,
      !0,
      null,
      null,
      !0,
      null,
      null,
      !0
    );
  });

  socket.on("debug", (data) => {
    consoleref.log(data);
  });

  socket.on("secondCount", (gd) => {
    for (connection in gd.groups[gd.joinedData.hostId].connections) {
      createSpeaker(
        gd.groups[gd.joinedData.hostId].connections[connection].username,
        connection
      );
    }
  });

  socket.on("init", (data) => {
    connectionId = data;
  });

  socket.on("clear", () => {
    callWrapper.innerHTML = "";
  });

  addNewSubMenu("Groups", () => openGroup());
}
