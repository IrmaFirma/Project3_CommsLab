// living room page: the party is already going when you arrive. laughter, conversation and soft jazz
// loop the whole time, glasses clink every now and then, nobody turns around, and then the way down the hallway shows up
// (same "starts by itself" idea as the upstairs hallway and bedroom pages)

var partySound = document.querySelector("#party-sound");
var glassesSound = document.querySelector("#glasses-sound");
var jazzSound = document.querySelector("#jazz-sound");

var nextButton = document.querySelector("#next-button");
var message = document.querySelector("#room-message");

var allSounds = [partySound, glassesSound, jazzSound];

// true while the sound is blocked and the page is waiting for the first click
var waitingForClick = false;

// the line of the story the page is on right now
var storyLine = "The party is already in full swing.";


// show the next line of the story under the picture
// (while the page is waiting for a click, the "click for sound" hint stays and the line shows after the click)
function say(text){
  storyLine = text;

  if(!waitingForClick){
    message.textContent = text;
  }
}


// play a sound; if the file can't play (missing or broken), carry on anyway
function playSound(sound){
  var playing = sound.play();

  if(playing){
    playing.catch(function () {});
  }
}


// ---------- the party starts as soon as the page opens ----------
// used this documentation to learn about HTMLMediaElement.muted: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted
// browsers often block sound that starts by itself, so if that happens everything starts muted instead
// (always allowed) and the sound turns on at the visitor's first click or key press

// turn the sound on for every sound on the page
function unmuteOnFirstTouch(){
  allSounds.forEach(function (sound){
    sound.muted = false;
  });

  // some browsers don't start the muted party at all, so start it (again) now. a click always
  // counts as permission to play sound, and play() does nothing to a sound that is already playing
  playSound(partySound);
  playSound(jazzSound);

  waitingForClick = false;
  message.textContent = storyLine;

  document.removeEventListener("pointerdown", unmuteOnFirstTouch);
  document.removeEventListener("keydown", unmuteOnFirstTouch);
}

// if the browser blocked the sound: mute everything, start it anyway, and wait for a click or key press
function startMuted(){
  allSounds.forEach(function (sound){
    sound.muted = true;
  });

  playSound(partySound);
  playSound(jazzSound);

  waitingForClick = true;
  message.textContent = "Click anywhere for sound.";

  document.addEventListener("pointerdown", unmuteOnFirstTouch);
  document.addEventListener("keydown", unmuteOnFirstTouch);
}

// the party is the loudest thing in the room, the jazz sits quietly underneath it
// (the jazz file is much louder than the party file, so it needs a low volume to stay underneath)
partySound.volume = 0.9;
jazzSound.volume = 0.15;
glassesSound.volume = 0.8;

// used this documentation to learn about HTMLMediaElement.play (it returns a Promise): https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
// play() hands back a Promise that fails if the browser blocks it. .catch() runs when it does
var starting = partySound.play();

if(starting){
  starting.then(function (){
    // the party could play, so the jazz can too
    playSound(jazzSound);
  }).catch(function (error){
    // "NotAllowedError" means the browser blocked the sound. anything else means the file is missing or
    // broken, so just carry on with the jazz
    if(error.name === "NotAllowedError"){
      startMuted();
    }else{
      playSound(jazzSound);
    }
  });
}


// ---------- nobody turns around, then the hallway ----------
setTimeout(function () {
  say("Nobody turns around to greet you.");
}, 9000);

// after 20 seconds the way down the hallway shows up
setTimeout(function () {
  say("Through the arch, the hallway is dark.");
  nextButton.hidden = false;
}, 20000);
