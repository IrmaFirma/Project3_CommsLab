// hallway page: you walk away from the party, hear whispers from the kitchen, then glass breaks

var hallwayVideo = document.querySelector("#hallway-video");

var partySound = document.querySelector("#party-sound");
var musicSound = document.querySelector("#music-sound");
var footstepsSound = document.querySelector("#footsteps-sound");
var whisperSound = document.querySelector("#whisper-sound");
var glassSound = document.querySelector("#glass-sound");

var walkButton = document.querySelector("#walk-button");
var nextButton = document.querySelector("#next-button");
var message = document.querySelector("#room-message");


// play a sound; if the file can't play (missing or broken), carry on anyway
function playSound(sound){
  var playing = sound.play();

  if(playing){
    playing.catch(function () {});
  }
}


// click "Walk down the hallway"
walkButton.addEventListener("click", function (){

  walkButton.hidden = true;
  message.textContent = "The party gets quieter behind you.";

  // the camera walks down the hallway
  // if the video can't play (missing or broken), carry on after 5 seconds anyway
  var walking = hallwayVideo.play();

  if(walking){
    walking.catch(function () {
      setTimeout(walkEnds, 5000);
    });
  }
});


// when the video is done: the footsteps stop, then 2 seconds later the glass breaks
function walkEnds(){
  footstepsSound.pause();
}

hallwayVideo.addEventListener("ended", walkEnds);
