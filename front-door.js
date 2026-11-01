// front door page: ring the doorbell, see the next photo, play the greeting

// everything needed from the page

// TODO: add the come-in sound and the come-in button

var photoBefore = document.querySelector("#photo-before");
var photoAfter = document.querySelector("#photo-after");
var message = document.querySelector("#door-message");


var doorbellSound = document.querySelector("#doorbell-sound");

var ringButton = document.querySelector("#ring-button");

var nextButton = document.querySelector("#next-button");


// click "Ring the doorbell"
ringButton.addEventListener("click", function () {

  doorbellSound.play();

  // swap the photos
  photoBefore.hidden = true;
  photoAfter.hidden = false;

  // hide the ring button and update the text
  ringButton.hidden = true;

  message.textContent = "The door opens...";
});

// TODO: when the doorbell is done (or maybe there is some error with file or something), show the greeting button


// when the greeting is done (or again some unknown error), show the way to the living room
function showNextButton() {
  comeInButton.hidden = true;
  nextButton.hidden = false;

  message.textContent = "Come in, come in!";

}
comeInSound.addEventListener("ended", showNextButton);

comeInSound.addEventListener("error", showNextButton);


