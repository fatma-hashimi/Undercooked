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
let returnToHomePageButton;

// let titleBeginButton, startTimerButton,increaseTimerButton, decreaseTimerButton, cancelTimerButton, menuButton, exitMenuButton, returnToTitleButton;

// Timer Variables
let timeSecond = 600; // Initial countdown time in seconds
let lastTimeSecond = 600; // Store the last stated timer value
let countdownActive = false; // Flag to track if the countdown is active
let countdown; // Variable to store the interval ID

// ----------------------------------- Pages
let titlePage = true;
let homePage = false;
let menuPage = false;
let runningPage = false;
let endPage = false;
let foodSelectionPage = false;

// ----------------------------------- Setup

function setup() {
  createCanvas(450, 450);
  imageMode(CENTER);
  textSize(32);
  textAlign(CENTER, CENTER);

  createButtons();
}

// ----------------------------------- Draw

function draw() {
  background(220);

  if (homePage) {
    displayTime(lastTimeSecond); // Display the last stated timer value on the home page
  }

  if (runningPage) {
    if (!countdownActive) {
      startCountdown(); // Start the countdown when entering the runningPage
    }
    displayTime(timeSecond); // Display the timer on the canvas
  }

  pageChanger();
}

// ----------------------------------- Button Functions

function createButtons() {

  // BEGIN
  titleBeginButton = createImg('Media/beginButtonImage.png', 'BeginButton');
  titleBeginButton.position(100, 100);
  titleBeginButton.size(250, 250);
  titleBeginButton.mouseClicked(() => {
    console.log("entered home page");
    titlePage = false;
    homePage = true;
  });

  // START TIMER
  startTimerButton = createImg('Media/toast.png', 'StartTimer');
  startTimerButton.position(160, 300);
  startTimerButton.size(130, 130);
  startTimerButton.mouseClicked(() => {
    runningPage = true;
    homePage = false;
    timeSecond = lastTimeSecond; // Reset the timer to the last stated value
    countdownActive = false; // Reset the countdown flag
    console.log(`Timer started with ${timeSecond} seconds`);
  });

  // DECREASE TIMER
  decreaseTimerButton = createImg('Media/cereal.png', 'decreaseTimer');
  decreaseTimerButton.position(105, 265);
  decreaseTimerButton.size(70, 70);
  decreaseTimerButton.mouseClicked(() => {
    if (lastTimeSecond > 300) { // Ensure the timer doesn't go below 5 minutes
      lastTimeSecond = Math.max(300, lastTimeSecond - 5 * 60); // Decrease by 5 minutes
      console.log(`Timer decreased: ${lastTimeSecond} seconds`);
    } else {
      console.log("Timer cannot go below 5:00");
    }
  });

  // INCREASE TIMER
  increaseTimerButton = createImg('Media/cereal.png', 'increaseTimer');
  increaseTimerButton.position(280, 265);
  increaseTimerButton.size(70, 70);
  increaseTimerButton.mouseClicked(() => {
    if (!countdownActive) {
      timeSecond += 5 * 60; // Increase by 5 minutes
    }
    lastTimeSecond += 5 * 60; // Always update the last stated timer value
    console.log(`Timer increased: ${lastTimeSecond} seconds`);
  });

  // CANCEL TIMER
  cancelTimerButton = createImg('Media/cereal.png', 'cancelTimer');
  cancelTimerButton.position(160, 300);
  cancelTimerButton.size(130, 130);
  cancelTimerButton.mouseClicked(() => {
    runningPage = false;
    homePage = true;
    console.log("timer cancelled");
  });

  // MENU BUTTONS
  menuButton = createImg('Media/cereal.png', 'menu');
  menuButton.position(10, 10);
  menuButton.size(70, 70);
  menuButton.mouseClicked(() => {
    console.log("entered menu page");
    homePage = false;
    menuPage = true;
  });

  exitMenuButton = createImg('Media/cereal.png', 'exitMenu');
  exitMenuButton.position(10, 10);
  exitMenuButton.size(70, 70);
  exitMenuButton.mouseClicked(() => {
    console.log("exited menu page");
    homePage = true;
    menuPage = false;
  });

  // MENU OPTION BUTTONS
  returnToTitleButton = createImg('Media/toast.png', 'returnToTitle');
  returnToTitleButton.position(100, 20);
  returnToTitleButton.size(70, 70);
  returnToTitleButton.mouseClicked(() => {
    console.log("entered title page");
    titlePage = true;
    menuPage = false;
  });

  selectFoodButton = createImg('Media/toast.png', 'selectFood');
  selectFoodButton.position(100, 90);
  selectFoodButton.size(70, 70);
  selectFoodButton.mouseClicked(() => {
    console.log("entered title page");
    menuPage = false;
    foodSelectionPage = true;
  });

  // END PAGE
  returnToHomePageButton = createImg('Media/toast.png', 'postTimerReturnToHome');
  returnToHomePageButton.position(160, 300);
  returnToHomePageButton.size(130, 130);
  returnToHomePageButton.mouseClicked(() => {
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
  returnToHomePageButton.hide();
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
    returnToTitleButton.show();
    selectFoodButton.show();
  }

  if (endPage) {
    returnToHomePageButton.show();
  }

}

// ----------------------------------- Timer Functions

function startCountdown() {
  if (countdownActive) return; // Prevent multiple intervals
  countdownActive = true; // Set the countdown as active

  // Clear any existing interval to prevent overlapping
  if (countdown) {
    clearInterval(countdown);
  }

  countdown = setInterval(() => {
    timeSecond--;
    if (timeSecond <= 0) {
      clearInterval(countdown); // Stop the timer when it reaches 0
      endCount(); // Handle the end of the countdown
    }
  }, 1000);
}

function displayTime(second) {
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);

  // Display the timer on the canvas
  fill(0);
  text(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, width / 2, height / 1.5);
}

function endCount() {
  runningPage = false; // Exit the runningPage
  endPage = true; // Transition to the endPage
  console.log("Time out");
  clearInterval(countdown); // Ensure the interval is cleared
}