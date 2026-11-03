// bedroom page: the room's music starts as soon as you arrive and you look around with the flashlight
// (flashlight.js). when you turn the light on the flashlight goes away, there is a light switch click 
// and a gasp, and the music gets louder and then fades out.

var bedroomSound = document.querySelector("#bedroom-sound");
var gaspSound = document.querySelector("#gasp-sound");
var switchSound = document.querySelector("#switch-sound");

var scene = document.querySelector(".flashlight");
var lightButton = document.querySelector("#light-button");
var restartButton = document.querySelector("#restart-button");
var message = document.querySelector("#room-message");


// ---------- the music starts as soon as the page opens ----------

// the music starts fairly quiet so there is room for it to get louder later
bedroomSound.volume = 0.4;

// used this documentation to learn about HTMLMediaElement.muted: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted
// browsers often block a sound that starts by itself, so if that happens it starts muted instead
// (always allowed) and the sound turns on at the visitor's first click or key press, which at the
// latest is when they click "Turn the light on"
function unmuteOnFirstTouch(){
  bedroomSound.muted = false;

  document.removeEventListener("pointerdown", unmuteOnFirstTouch);
  document.removeEventListener("keydown", unmuteOnFirstTouch);
}

// used this documentation to learn about HTMLMediaElement.play (it returns a Promise): https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
// play() hands back a Promise that fails if the browser blocks it. .catch() runs when it does
var starting = bedroomSound.play();

if (starting) {
  starting.catch(function () {
    bedroomSound.muted = true;
    bedroomSound.play();

    document.addEventListener("pointerdown", unmuteOnFirstTouch);
    document.addEventListener("keydown", unmuteOnFirstTouch);
  });
}


// slowly change a sound's volume to a new level over a number of seconds
// (same idea as in the hallway page: a sound that fades down to 0 is paused at the end)
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


// ---------- turn the light on ----------

// click "Turn the light on"
lightButton.addEventListener("click", function (){

  lightButton.hidden = true;

  // the flashlight goes away and only the bright picture is left (see ".light-on" in styles.css)
  scene.classList.add("light-on");

  message.textContent = "";

  // the light switch clicks (if it can't play, carry on anyway)
  var switching = switchSound.play();

  if (switching) {
    switching.catch(function () {});
  }

  // the gasp comes 1 second after the switch (if the file can't play, carry on anyway)
  setTimeout(function () {
    gaspSound.volume = 1;
    var gasping = gaspSound.play();

    if (gasping) {
      gasping.catch(function () {});
    }
  }, 1000);

  // the music gets louder for 2 seconds
  bedroomSound.muted = false;
  fadeTo(bedroomSound, 1, 2);

  // stays loud for a moment, then fades all the way out over 6 seconds
  setTimeout(function () {
    fadeTo(bedroomSound, 0, 6);
  }, 3500);

  // when it has faded out, the story is over
  setTimeout(function () {
    restartButton.hidden = false;
  }, 10000);
});
