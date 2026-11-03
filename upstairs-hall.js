// upstairs hallway page: muffled yelling, a bang, then silence, then the choice to open the door

var yellingSound = document.querySelector("#yelling-sound");
var bangSound = document.querySelector("#bang-sound");

var listenButton = document.querySelector("#listen-button");
var nextButton = document.querySelector("#next-button");
var message = document.querySelector("#room-message");


// click "Listen at the door"
listenButton.addEventListener("click", function () {

  listenButton.hidden = true;
  message.textContent = "Someone is shouting behind the door.";

  yellingSound.play();
});


// the moment the yelling ends: the bang
yellingSound.addEventListener("ended", function () {

  bangSound.play();
});


// after the bang: 3 seconds of silence, then the choice to open the door
bangSound.addEventListener("ended", function () {

  message.textContent = "...";

  setTimeout(function () {
    message.textContent = "Silence.";
    nextButton.hidden = false;
  }, 3000);
});
