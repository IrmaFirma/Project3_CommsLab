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


// ---------- nobody turns around, then the hallway ----------
setTimeout(function () {
  say("Nobody turns around to greet you.");
}, 9000);

// after 20 seconds the way down the hallway shows up
setTimeout(function () {
  say("Through the arch, the hallway is dark.");
  nextButton.hidden = false;
}, 20000);
