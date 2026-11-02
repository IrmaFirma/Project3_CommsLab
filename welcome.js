// welcome page: listen to the welcome message, then the Come in button shows up

// background sound: try to autoplay, and if the browser blocks it,
// start on the first click, tap or key press instead
var backgroundSound = document.querySelector("#background-sound");

backgroundSound.volume = 0.3; 

function startBackground(){

  var attempt = backgroundSound.play();

  

  if (attempt) {
    attempt.then(function (){
      document.removeEventListener("pointerdown", startBackground);

      document.removeEventListener("keydown", startBackground);
    }).catch(function (){
    });

  }


}

startBackground();


document.addEventListener("pointerdown", startBackground); 

document.addEventListener("keydown", startBackground);

var welcomeSound = document.querySelector("#welcome-sound");
var listenButton = document.querySelector("#listen-button");

var enterButton = document.querySelector("#enter-button");


// click "Listen to the welcome message"
listenButton.addEventListener("click", function (){

  listenButton.disabled = true;
  listenButton.textContent = "Playing...";

  // play the message; if the file can't play (missing or broken), show the Come in button anyway
  var playing = welcomeSound.play();

  if (playing) {
    playing.catch(showEnterButton);
  }
});




// when the message is done: hide the listen button, show the Come in button
function showEnterButton(){
  listenButton.hidden = true;

  enterButton.hidden = false;

}


welcomeSound.addEventListener("ended", showEnterButton);