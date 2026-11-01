// welcome page: listen to the welcome message, then the Come in button shows up

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