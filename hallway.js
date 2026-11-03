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


// slowly change a sound's volume to a new level over a number of seconds
// (a sound that fades down to 0 is paused at the end)
function fadeTo(sound, targetVolume, seconds){
  var stepsLeft = seconds * 20;
  var change = (targetVolume - sound.volume) / stepsLeft;

  var timer = setInterval(function (){
    stepsLeft = stepsLeft - 1;
    sound.volume = Math.min(1, Math.max(0, sound.volume + change));

    if(stepsLeft <= 0){
      clearInterval(timer);
      sound.volume = targetVolume;

      if(targetVolume === 0){
        sound.pause();
      }
    }
  }, 50);
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

  // the party is still loud, then fades away as you walk
  partySound.volume = 0.5;
  playSound(partySound);
  fadeTo(partySound, 0, 5);

  // the eerie music creeps in, but stays very soft
  musicSound.volume = 0;
  playSound(musicSound);
  fadeTo(musicSound, 0.15, 5);

  // footsteps for as long as the camera is moving
  footstepsSound.volume = 0.6;
  playSound(footstepsSound);

  // after 3.5 seconds you can hear whispering from the kitchen
  setTimeout(function () {
    message.textContent = "Someone is whispering in the kitchen.";

    whisperSound.volume = 0.3;
    playSound(whisperSound);
  }, 3500);
});


// when the video is done: the footsteps stop, then 2 seconds later the glass breaks
function walkEnds(){
  footstepsSound.pause();
}

hallwayVideo.addEventListener("ended", walkEnds);
