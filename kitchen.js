// kitchen page: the fridge hums, the tap drips, the music gets creepier,
// then you walk across the broken glass toward the stairs

var photoKitchen = document.querySelector("#photo-kitchen");

var fridgeSound = document.querySelector("#fridge-sound");
var tapSound = document.querySelector("#tap-sound");
var musicSound = document.querySelector("#music-sound");
var crunchSound = document.querySelector("#crunch-sound");

var enterButton = document.querySelector("#enter-button");
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


// click "Step into the kitchen"
enterButton.addEventListener("click", function (){

  enterButton.hidden = true;
  message.textContent = "Only the fridge and the tap are making a sound.";

  // the fridge hum and the dripping tap loop for as long as you are in the kitchen
  fridgeSound.volume = 0.5;
  playSound(fridgeSound);

  tapSound.volume = 0.7;
  playSound(tapSound);

  // the music gets creepier than in the hallway: louder, and slowed down so it sounds deeper
  // (preservesPitch = false lets the slower speed drop the pitch too)
  musicSound.volume = 0.35;
  musicSound.preservesPitch = false;
  musicSound.playbackRate = 0.85;
  playSound(musicSound);
});

