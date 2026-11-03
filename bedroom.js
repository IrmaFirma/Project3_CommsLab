// bedroom page: the door opens, the drone starts, and the flashlight finds what is in the room

var doorSound = document.querySelector("#door-sound");
var droneSound = document.querySelector("#drone-sound");

var enterButton = document.querySelector("#enter-button");
var restartButton = document.querySelector("#restart-button");
var message = document.querySelector("#room-message");


// click "Step inside"
enterButton.addEventListener("click", function () {

  enterButton.hidden = true;
  doorSound.play();
});


// when the door is done opening: the drone starts and the flashlight is the only way to see
// (flashlight.js already follows the mouse, nothing else to do here)
doorSound.addEventListener("ended", function () {

  droneSound.volume = 0.6;
  droneSound.play();

  message.textContent = "Move the light around the room.";

  // after 10 seconds of looking, the story is over
  setTimeout(function () {
    message.textContent = "The marks on the floor lead out of the room.";
    restartButton.hidden = false;
  }, 10000);
});
