// ----------------------------------- Button Variables
let titleBeginButton;
let startTimerButton;
let increaseTimeButton;
let decreaseTimeButton;
let cancelTimerButton;

// ----------------------------------- Pages
let titlePage = true;
let homePage = false;
let menuPage = false;
let foodSelectionPage = false;

// ----------------------------------- Setup
function setup() {
  createCanvas(450, 450);
}

// ----------------------------------- Draw
function draw() {
  background(220);
  pageChanger()
}

// ----------------------------------- Button Functions
function titleButton() {
  button = createImg('Media/cereal.png', 'Cereal');
  button.position(90, 90);
  button.size(250, 250);
  button.mousePressed();
}

// ----------------------------------- Page Changer

function pageChanger() {
  if (titlePage) {
    // button
    titleButton();
    // drawing
  }

  if (homePage) {
    // buttons

  }
}