// flashlight: a circle of the bright picture follows the mouse (or finger)
// over the dark picture. used on the upstairs hallway and the bedroom pages

var flashlightScene = document.querySelector(".flashlight");


// move the circle to a spot on the screen, measured from the scene's top left corner
function moveLight(screenX, screenY){
  var box = flashlightScene.getBoundingClientRect();

  flashlightScene.style.setProperty("--x", (screenX - box.left) + "px");
  flashlightScene.style.setProperty("--y", (screenY - box.top) + "px");
}


// pointermove covers the mouse and touch screens with the same code
flashlightScene.addEventListener("pointermove", function (event){
  moveLight(event.clientX, event.clientY);
});

// a finger touching down should light up that spot straight away
flashlightScene.addEventListener("pointerdown", function (event){
  moveLight(event.clientX, event.clientY);
});
