// staircase page: the bulb flickers on and off the whole time, whispers start, then the way up shows

var photoStairs = document.querySelector("#photo-stairs");
var photoStairsDark = document.querySelector("#photo-stairs-dark");

var musicSound = document.querySelector("#music-sound");
var flickerSound = document.querySelector("#flicker-sound");
var whisperSound = document.querySelector("#whisper-sound");

var climbButton = document.querySelector("#climb-button");
var nextButton = document.querySelector("#next-button");
var message = document.querySelector("#room-message");


// used this documentation to learn about window.matchMedia: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
// some people set their device to avoid flashing and motion, so for them the light
// changes slowly instead of flickering
var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

var lightIsOn = true;


// swap the lit and dark pictures, then wait a random time before swapping again
function flicker() {
  lightIsOn = !lightIsOn;

  photoStairs.hidden = !lightIsOn;
  photoStairsDark.hidden = lightIsOn;

  var wait;

  if (reduceMotion) {
    wait = lightIsOn ? 2500 : 1200;
  } else if (lightIsOn) {
    // on for 0.3 to 1 second
    wait = 300 + Math.random() * 600;
  } else {
    // off for 0.2 to 0.5 seconds
    wait = 200 + Math.random() * 350;
  }

  setTimeout(flicker, wait);
}

// it starts flickering as soon as the page loads, no click needed
setTimeout(flicker, 800);


// click "Climb the stairs"
climbButton.addEventListener("click", function () {

  climbButton.hidden = true;
  message.textContent = "The light keeps cutting out. Something is whispering.";

  // quiet music underneath everything
  musicSound.volume = 0.3;
  musicSound.play();

  // the flicker sound loops for as long as the bulb does
  flickerSound.volume = 0.6;
  flickerSound.play();

  // if the whispers file can't play (missing or broken), carry on anyway
  var playing = whisperSound.play();
  if (playing) {
    playing.catch(function () { });
  }

  // after 10 seconds the way to the upstairs hallway shows up
  setTimeout(function () {
    nextButton.hidden = false;
  }, 10000);
});
