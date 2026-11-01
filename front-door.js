// front door page: ring the doorbell, see the next photo, play the greeting

// everything needed from the page

// TODO: add the come-in sound and the come-in button

var photoBefore = document.querySelector("#photo-before");
var photoAfter = document.querySelector("#photo-after");
var photoCouple = document.querySelector("#photo-couple");
var blackout = document.querySelector("#blackout");
var message = document.querySelector("#door-message");


var doorbellSound = document.querySelector("#doorbell-sound");

var ringButton = document.querySelector("#ring-button");

var nextButton = document.querySelector("#next-button");



// click "Ring the doorbell"

ringButton.addEventListener("click", function (){

  // swap the photos
  photoBefore.hidden = true;

  photoAfter.hidden = false;


  // hide the ring button and update the text
  ringButton.hidden = true;

  message.textContent = "Ding dong...";


  // play the doorbell; if the file can't play (missing or broken), carry on anyway
  var playing = doorbellSound.play();
  if (playing) {
    playing.catch(showCouple);

  }


});


// when the doorbell is done: black screen while the door opens, then the couple show up
function showCouple() {
  photoAfter.hidden = true;
  blackout.hidden = false;

  message.textContent = "The door is opening...";

  // stay on the black screen for 1.5 seconds, then show the couple
  setTimeout(function () {
    blackout.hidden = true;
    photoCouple.hidden = false;

    comeInButton.hidden = false;

    message.textContent = "They are smiling at you.";
  }, 1500);

}

doorbellSound.addEventListener("ended", showCouple);



// when the greeting is done (or again some unknown error), show the way to the living room
function showNextButton(){
  comeInButton.hidden = true;
  nextButton.hidden = false;

  message.textContent = "Come in, come in!";

}