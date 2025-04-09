// ----------------------------------- Button Variables
let titleBeginButton;
let startTimerButton;
let increaseTimerButton;
let decreaseTimerButton;
let cancelTimerButton;
let menuButton;
let exitMenuButton;
let returnToTitleButton;


// ----------------------------------- Pages
let titlePage = true;
let homePage = false;
let menuPage = false;
let runningPage = false;
let endPage = false;

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

  // BEGIN
  titleBeginButton = createImg('Media/cereal.png', 'Cereal');
  titleBeginButton.position(100, 100);
  titleBeginButton.size(250, 250);
  titleBeginButton.mouseClicked(() => {
    console.log("entered home page");
    titlePage = false;
    homePage = true;
  });

  // START TIMER
  startTimerButton = createImg('Media/toast.png', 'Toast');
  startTimerButton.position(160, 250);
  startTimerButton.size(130, 130);
  startTimerButton.mouseClicked(() => {
    runningPage = true;
    homePage = false;
    console.log("timer started");
  });

  // DECREASE TIMER
  decreaseTimerButton = createImg('Media/cereal.png', 'Toast');
  decreaseTimerButton.position(30, 140);
  decreaseTimerButton.size(130, 130);
  decreaseTimerButton.mouseClicked(() => {
    console.log("-5 minutes");
  });

  // INCREASE TIMER
  increaseTimerButton = createImg('Media/cereal.png', 'Toast');
  increaseTimerButton.position(290, 140);
  increaseTimerButton.size(130, 130);
  increaseTimerButton.mouseClicked(() => {
    console.log("+5 minutes");
  });

  // CANCEL TIMER
  cancelTimerButton = createImg('Media/cereal.png', 'Toast');
  cancelTimerButton.position(160, 250);
  cancelTimerButton.size(130, 130);
  cancelTimerButton.mouseClicked(() => {
    runningPage = false;
    homePage = true;
    console.log("timer cancelled");
  });

  // MENU
  menuButton = createImg('Media/cereal.png', 'Toast');
  menuButton.position(10, 10);
  menuButton.size(70, 70);
  menuButton.mouseClicked(() => {
    console.log("entered menu page");
    homePage = false;
    menuPage = true;
  });

  exitMenuButton = createImg('Media/cereal.png', 'Toast');
  exitMenuButton.position(10, 10);
  exitMenuButton.size(70, 70);
  exitMenuButton.mouseClicked(() => {
    console.log("exited menu page");
    homePage = true;
    menuPage = false;
  });

}

function hideAllButtons() {
  titleBeginButton.hide();
  startTimerButton.hide();
  increaseTimerButton.hide();
  decreaseTimerButton.hide();
  cancelTimerButton.hide();
  menuButton.hide();
  exitMenuButton.hide();
}

// ----------------------------------- Page Changer

function pageChanger() {
  hideAllButtons();

  if (titlePage) {
    titleBeginButton.show();
  }

  if (homePage) {
    startTimerButton.show();
    increaseTimerButton.show();
    decreaseTimerButton.show();
    menuButton.show();
  }

  if (runningPage) {
    cancelTimerButton.show();
  }

  if (menuPage) {
    exitMenuButton.show();
  }

}