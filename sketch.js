// ----------------------------------- Button Variables
let titleBeginButton;
let startTimerButton;
let increaseTimerButton;
let decreaseTimerButton;
let cancelTimerButton;
let menuButton;

// ----------------------------------- Pages
let titlePage = true;
let homePage = false;
let menuPage = false;

// ----------------------------------- Setup

function setup() {
  createCanvas(450, 450);
  imageMode(CENTER);

  createButtons();
}

// ----------------------------------- Draw

function draw() {
  background(220);
  pageChanger();
}

// ----------------------------------- Button Functions

function createButtons() {
  titleBeginButton = createImg('Media/cereal.png', 'Cereal');
  titleBeginButton.position(100, 100);
  titleBeginButton.size(250, 250);
  titleBeginButton.mouseClicked(() => {
    console.log("entered home page");
    titlePage = false;
    homePage = true;
  });

  // need to change start timer button location later - its in the position of the selected food right now
  startTimerButton = createImg('Media/toast.png', 'Toast');
  startTimerButton.position(100, 70);
  startTimerButton.size(250, 250);
  startTimerButton.mouseClicked(() => {
    console.log("timer started");
  });

  decreaseTimerButton = createImg('Media/cereal.png', 'Toast');
  decreaseTimerButton.position(30, 140);
  decreaseTimerButton.size(130, 130);
  decreaseTimerButton.mouseClicked(() => {
    console.log("-5 minutes");
  });

  increaseTimerButton = createImg('Media/cereal.png', 'Toast');
  increaseTimerButton.position(290, 140);
  increaseTimerButton.size(130, 130);
  increaseTimerButton.mouseClicked(() => {
    console.log("+5 minutes");
  });

  startTimerButton.hide();
  increaseTimerButton.hide();
  decreaseTimerButton.hide();
  // cancelTimerButton.hide();
  // menuButton.hide();
}

// ----------------------------------- Page Changer

function pageChanger() {
  if (titlePage) {
    titleBeginButton.show();
    startTimerButton.hide();
  }

  if (homePage) {
    titleBeginButton.hide();
    startTimerButton.show();
    increaseTimerButton.show();
    decreaseTimerButton.show();
  }

}