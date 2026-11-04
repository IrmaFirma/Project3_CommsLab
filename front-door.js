// front door page: 

// Learned more about catching errors from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
// Learned about timeout from https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout
// Read more about event listeners from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener

// scenes
var photoBefore = document.querySelector("#photo-before");
var photoAfter = document.querySelector("#photo-after");
var photoCouple = document.querySelector("#photo-couple");
var blackout = document.querySelector("#blackout");

// messages, sounds, buttons
var message = document.querySelector("#door-message");
var doorbellSound = document.querySelector("#doorbell-sound");
var ringButton = document.querySelector("#ring-button");
var nextButton = document.querySelector("#next-button");
var comeInButton = document.querySelector("#come-in-button");
var comeInSound = document.querySelector("#come-in-sound");
var comeInSound2 = document.querySelector("#come-in-sound2");



// click this button to ring the doorbell
ringButton.addEventListener("click", function () {

  // photos can be swapped 
  photoBefore.hidden = true;
  photoAfter.hidden = false;

  // update message text and hide the button
  ringButton.hidden = true;
  message.textContent = " ";

  // try playing doorbell sound if it can't play catch the error and show next photo anyway
  var playing = doorbellSound.play();
  if (playing) {
    playing.catch(showCouple);

  }


});


// when doorbell sound is done, show the couple 
function showCouple() {
  photoAfter.hidden = true;
  blackout.hidden = false;

  message.textContent = " ";

  // show black screen for 1.5s and then show couple
  setTimeout(function () {
    blackout.hidden = true;
    photoCouple.hidden = false;

    comeInButton.hidden = false;

    message.textContent = " ";
  }, 1500);

}

doorbellSound.addEventListener("ended", showCouple);


// when the come in greeting is done, show button to next page
function showNextButton() {
  comeInButton.hidden = true;
  nextButton.hidden = false;
  message.textContent = " ";

}

// this button plays the wife speaking to come inside house
comeInButton.addEventListener("click", function () {
  comeInButton.disabled = true;
  var playing2 = comeInSound2.play();
  if (playing2) {
    playing2.catch(showNextButton);
  }
});

// play husband saying welcome
comeInSound2.addEventListener("ended", function(){
  var playing = comeInSound.play();
  if (playing) {
    playing.catch(showNextButton);
  }
});

comeInSound2.addEventListener("ended", showNextButton);