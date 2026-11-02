// welcome page: listen to the welcome message, then the Come in button shows up

// background music: button in the corner turns it on and off

var backgroundSound = document.querySelector("#background-sound");

var soundToggle = document.querySelector("#sound-toggle");

backgroundSound.volume = 0.3; 

// keep the icon to match what is happening
backgroundSound.addEventListener("play", function (){

  soundToggle.classList.add("playing");
  soundToggle.setAttribute("aria-label", "Mute background music");

});

backgroundSound.addEventListener("pause", function (){

  soundToggle.classList.remove("playing");
  soundToggle.setAttribute("aria-label", "Play background music");

});

soundToggle.addEventListener("click", function () {

  if(backgroundSound.paused){

    backgroundSound.play();

  }else{
    backgroundSound.pause();
  }
});

// still try to autoplay
//  if the browser allows it, the icon switches to "playing" by itself
var attempt = backgroundSound.play();

if (attempt){
  attempt.catch(function (){
    // blocked: the button is how the user starts it
  });
}



var welcomeSound = document.querySelector("#welcome-sound");

var listenButton = document.querySelector("#listen-button");

var enterButton = document.querySelector("#enter-button");


// click "Listen to the welcome message"
listenButton.addEventListener("click", function (){

  listenButton.disabled = true;
  listenButton.textContent = " ";

  // play the message; if the file can't play (missing or broken), show the Come in button anyway
  var playing = welcomeSound.play();

  if(playing){
    playing.catch(showEnterButton);
  }
});




// when the message is done: hide the listen button, show the Come in button
function showEnterButton(){
  listenButton.hidden = true;

  enterButton.hidden = false;

}


welcomeSound.addEventListener("ended", showEnterButton);