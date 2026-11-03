// welcome page:

// Resources used: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
// Resources used: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
// Resources used: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent


// background music with button to toggle it on and off
var backgroundSound = document.querySelector("#background-sound");
var soundToggle = document.querySelector("#sound-toggle");

backgroundSound.volume = 0.7;

// icon matches what is happening; sound can be on and off
backgroundSound.addEventListener("play", function () {

  soundToggle.classList.add("playing");

});

backgroundSound.addEventListener("pause", function () {
  soundToggle.classList.remove("playing");
});

soundToggle.addEventListener("click", function () {

  if (backgroundSound.paused) {
    backgroundSound.play();
  } else {
    backgroundSound.pause();
  }

});


var welcomeSound = document.querySelector("#welcome-sound");

var listenButton = document.querySelector("#listen-button");

var enterButton = document.querySelector("#enter-button");


// button has to be clicked so you can start listening to the welcome message
listenButton.addEventListener("click", function () {

  listenButton.disabled = true;
  listenButton.textContent = " ";

  // try playing the message if there is an error catch it but show "come in" button anyway
  var playing = welcomeSound.play();

  if (playing) {
    playing.catch(showEnterButton);
  }
});


// after message finished, show the "come in" button to move to the front door page 
function showEnterButton() {
  listenButton.hidden = true;
  enterButton.hidden = false;
}


welcomeSound.addEventListener("ended", showEnterButton);