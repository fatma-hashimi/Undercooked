// ----------------------------------- Button Variables
let titleBeginButton;
let startTimerButton;
let increaseTimerButton;
let decreaseTimerButton;
let cancelTimerButton;
let menuButton;
let exitMenuButton;
let returnToTitleButton;
let selectFoodButton;
let restartTimerHomeButton;

// ----------------------------------- Timer Variables
let timeSecond = 600;
// tracks recent changes to timer duration
let lastTimeSecond = 600;
// bool flag to track if countdown is running
let countdownActive = false;
// time between each interval for countdown (1 second)
const interval = 1000;
// bool flaf to track if countdown is canceled
let cancelCountdown = false;
let targetTime;

// ----------------------------------- Pages
let titlePage = true;
let homePage = false;
let menuPage = false;
let runningPage = false;
let endPage = false;
let foodSelectionPage = false;

// ----------------------------------- Background Image
let titlePageBG;
let framedBG;

function preload() {
  titlePageBG = loadImage('Media/titlePageBG.png'); // Load the title page background
  framedBG = loadImage('Media/framedBG.png'); // Load the default background for other pages
}

// ----------------------------------- Setup

function setup() {
  createCanvas(450, 450);
  imageMode(CENTER);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');

  createButtons();
}

// ----------------------------------- Draw

function draw() {
  pageChanger();
  if (homePage) {
    displayTime(lastTimeSecond);
  }

  if (runningPage) {
    if (!countdownActive) {
      startCountdown();
    }
    displayTime();
  }
}

// ----------------------------------- Button Functions

function createButtons() {
  // BEGIN
  titleBeginButton = createImg('Media/beginButtonImage.png', 'BeginButton');
  titleBeginButton.position(185, 230);
  titleBeginButton.size(75, 27);
  titleBeginButton.mouseClicked(() => {
    console.log("entered home page");
    titlePage = false;
    homePage = true;
  });

  // START TIMER
  startTimerButton = createImg('Media/startTimerImage.png', 'StartTimer');
  startTimerButton.position(190, 340);
  startTimerButton.size(78, 27);
  startTimerButton.mouseClicked(() => {
    runningPage = true;
    homePage = false;
    timeSecond = lastTimeSecond; // Reset the timer to the last stated value
    countdownActive = false; // Reset the countdown flag
    startCountdown(); // Start the countdown
    console.log(`Timer started with ${timeSecond} seconds`);
  });

  // DECREASE TIMER
  decreaseTimerButton = createImg('Media/decreaseImage.png', 'decreaseTimer');
  decreaseTimerButton.position(140, 287);
  decreaseTimerButton.size(24, 24);
  decreaseTimerButton.mouseClicked(() => {
    console.log("Decrease button clicked");
    if (lastTimeSecond > 300) {
      lastTimeSecond = Math.max(300, lastTimeSecond - 5 * 60); // Decrease by 5 minutes
      if (!countdownActive) {
        timeSecond = lastTimeSecond; // Synchronize timeSecond if the countdown is not active
      }
      console.log(`Timer decreased: ${lastTimeSecond} seconds`);
    } else {
      console.log("Timer cannot go below 5:00");
    }
  });

  // INCREASE TIMER
  increaseTimerButton = createImg('Media/increaseImage.png', 'increaseTimer');
  increaseTimerButton.position(285, 287);
  increaseTimerButton.size(24, 24);
  increaseTimerButton.mouseClicked(() => {
    if (!countdownActive) {
      timeSecond += 5 * 60; // Increase by 5 minutes
    }
    lastTimeSecond += 5 * 60; // Always update the last stated timer value
    console.log(`Timer increased: ${lastTimeSecond} seconds`);
  });

  // CANCEL TIMER
  cancelTimerButton = createImg('Media/cancelTimerImage.png', 'cancelTimer');
  cancelTimerButton.position(190, 340);
  cancelTimerButton.size(78, 27);
  cancelTimerButton.mouseClicked(() => {
    runningPage = false;
    homePage = true;
    countdownActive = false; // Reset the countdown flag
    cancelCountdown = true; // Stop the countdown loop
    timeSecond = lastTimeSecond; // Reset the timer to the last stated value
    console.log("Timer cancelled and reset");
  });

  // MENU BUTTONS
  menuButton = createImg('Media/menuEnterButton.png', 'menu');
  menuButton.position(35, 35);
  menuButton.size(24, 24);
  menuButton.mouseClicked(() => {
    console.log("entered menu page");
    homePage = false;
    menuPage = true;
  });

  exitMenuButton = createImg('Media/menuExitButton.png', 'exitMenu');
  exitMenuButton.position(35, 35);
  exitMenuButton.size(24, 24);
  exitMenuButton.mouseClicked(() => {
    console.log("exited menu page");
    homePage = true;
    menuPage = false;
  });

  // MENU OPTION BUTTONS
  returnToTitleButton = createImg('Media/menusHome.png', 'returnToTitle');
  returnToTitleButton.position(100, 40);
  returnToTitleButton.size(70, 40);
  returnToTitleButton.mouseClicked(() => {
    console.log("entered title page");
    titlePage = true;
    menuPage = false;
  });

  selectFoodButton = createImg('Media/menusFoods.png', 'selectFood');
  selectFoodButton.position(100, 90);
  selectFoodButton.size(70, 40);
  selectFoodButton.mouseClicked(() => {
    console.log("entered food selection page");
    menuPage = false;
    foodSelectionPage = true;
  });

  // END PAGE
  restartTimerHomeButton = createImg('Media/toast.png', 'postTimerReturnToHome');
  restartTimerHomeButton.position(160, 300);
  restartTimerHomeButton.size(130, 130);
  restartTimerHomeButton.mouseClicked(() => {
    endPage = false;
    homePage = true;
    console.log("readying to start new timer");
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
  returnToTitleButton.hide();
  selectFoodButton.hide();
  restartTimerHomeButton.hide();
}

// ----------------------------------- Page Changer

function pageChanger() {
  hideAllButtons();

  if (titlePage) {
    background(225);
    image(titlePageBG, width / 2, height / 2);
    titleBeginButton.show();
  } else {
    background(255);
    image(framedBG, width / 2, height / 2);
  }

  if (homePage) {
    startTimerButton.show();
    increaseTimerButton.show();
    decreaseTimerButton.show();
    menuButton.show();

    const toastImage = createImg('Media/toast1.png', 'ToastImage');
    // moving image to center
    toastImage.position(width / 2 - 64, height / 2 - 128);
    toastImage.size(128, 128);
  }

  if (runningPage) {
    cancelTimerButton.show();
  }

  if (menuPage) {
    exitMenuButton.show();
    returnToTitleButton.show();
    selectFoodButton.show();
  }

  if (endPage) {
    restartTimerHomeButton.show();
  }
}

// ----------------------------------- Timer Functions

function startCountdown() {
  // needed to prevent multiple countdowns from starting
  if (countdownActive) return;
  countdownActive = true;
  cancelCountdown = false;

  // starts countdown here
  // using Date.now so that it knows to end when it reaches a certain time using reference as of January 1, 1970 (lol, only way to make it not be frameRate based. since dropping frames means inaccurate intervals)
  targetTime = Date.now() + timeSecond * 1000;
  console.log(`Countdown started. Target time: ${new Date(targetTime).toLocaleTimeString()}`);
  step(); // !!! function that does more math
}

function step() {

  // if cancel button was pressed and timer doesnt reach 0
  if (cancelCountdown) {
    console.log("Timer canceled");
    cancelCountdown = false;
    countdownActive = false;
    return;
  }

  // prevents negative countdown
  const now = Date.now();
  const remainingTime = Math.max(0, targetTime - now);
  // converts to seconds
  timeSecond = Math.ceil(remainingTime / 1000);

  // what happens when timer reaches 0
  if (timeSecond <= 0) {
    endCount(); // function once countdown ends
    return;
  }

  
  setTimeout(step, interval);
}

function displayTime() {
  // displayed minutes and seconds in proper format (not exceeding 60)
  const min = Math.floor(timeSecond / 60);
  const sec = Math.floor(timeSecond % 60);

  // what is displyed on canvas
  fill(0);
  text(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, width / 2, height / 1.5);
}

function endCount() {
  runningPage = false;
  endPage = true;
  countdownActive = false;
  cancelCountdown = true;
  console.log("Timer completed");
}