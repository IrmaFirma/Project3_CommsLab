// upstairs hallway page: the video starts as soon as you arrive and walks you down the hall to the door.
// when it ends it stays frozen on its last frame (the dark screen at the end of the video), and when
// you click "Enter the room" the transition video plays and then the bedroom page opens.
// (the flashlight that dims the video except around the mouse is flashlight.js + styles.css)

var hallVideo = document.querySelector("#hall-video");
var enterButton = document.querySelector("#enter-button");
var message = document.querySelector("#room-message");

var reachedDoor = false;


// ---------- start playing the second the page opens ----------

// used this documentation to learn about HTMLMediaElement.muted: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/muted
// browsers often block a video that starts by itself WITH sound, so if that happens it starts
// muted instead (muted videos are always allowed) and the sound turns on at the visitor's first click or key press
function unmuteOnFirstTouch(){
  hallVideo.muted = false;
  message.textContent = "Move your mouse to light the way.";

  document.removeEventListener("pointerdown", unmuteOnFirstTouch);
  document.removeEventListener("keydown", unmuteOnFirstTouch);
}

var starting = hallVideo.play();

// used this documentation to learn about HTMLMediaElement.play (it returns a Promise): https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
// play() hands back a Promise that fails if the browser blocks it. .catch() runs when it does
if (starting) {
  starting.catch(function () {
    hallVideo.muted = true;
    hallVideo.play();

    message.textContent = "Click anywhere for sound. Move your mouse to light the way.";

    document.addEventListener("pointerdown", unmuteOnFirstTouch);
    document.addEventListener("keydown", unmuteOnFirstTouch);
  });
}


// ---------- the video ends at the door ----------

// when a video reaches its end it just stops and keeps showing its last frame, so nothing
// else is needed to keep it frozen there. the "ended" event is what shows the button
function atTheDoor(){
  if (reachedDoor) {
    return;
  }

  reachedDoor = true;

  message.textContent = "";
  enterButton.hidden = false;
}

hallVideo.addEventListener("ended", atTheDoor);


// ---------- enter the room ----------

// used this documentation to learn about Location.href: https://developer.mozilla.org/en-US/docs/Web/API/Location/href
// setting window.location.href opens another page, like clicking a link
function goToBedroom(){
  window.location.href = "bedroom.html";
}

// click "Enter the room": the transition video plays in the same box, with the flashlight still on
enterButton.addEventListener("click", function (){

  enterButton.hidden = true;
  message.textContent = "";

  hallVideo.muted = false;
  hallVideo.src = "assets/upstairs-hallway-transition.mp4";

  // when the transition is done the bedroom page opens by itself
  hallVideo.addEventListener("ended", goToBedroom);

  // if the transition can't play (missing or broken), go to the bedroom anyway
  var playing = hallVideo.play();

  if (playing) {
    playing.catch(goToBedroom);
  }
});
