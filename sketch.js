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
let lastTimeSecond = 600;
let countdownActive = false;
const interval = 1000;
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

function preload() {
  titlePageBG = loadImage('Media/titlePageBG.png');
}

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
  if (titlePage) {
    background(220); // Clear the canvas with a default background color
    image(titlePageBG, width / 2, height / 2); // Draw the image at the center of the canvas
  } else {
    background(220); // Default background for other pages
  }

  if (homePage) {
    displayTime(lastTimeSecond);
  }

  if (runningPage) {
    if (!countdownActive) {
      startCountdown();
    }
    displayTime();
  }

  pageChanger();
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
  cancelTimerButton.position(190, 320);
  cancelTimerButton.size(70, 50);
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
  menuButton.position(15, 15);
  menuButton.size(24, 24);
  menuButton.mouseClicked(() => {
    console.log("entered menu page");
    homePage = false;
    menuPage = true;
  });

  exitMenuButton = createImg('Media/menuExitButton.png', 'exitMenu');
  exitMenuButton.position(15, 15);
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
    titleBeginButton.show();
  }

  if (homePage) {
    startTimerButton.show();
    increaseTimerButton.show();
    decreaseTimerButton.show();
    menuButton.show();

    // Display toast image in the center of the canvas
    const toastImage = createImg('Media/toast1.png', 'ToastImage');
    toastImage.position(width / 2 - 64, height / 2 - 64); // Center the image
    toastImage.size(128, 128); // Set the size of the image
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
  if (countdownActive) return; // Prevent multiple intervals
  countdownActive = true; // Set the countdown as active
  cancelCountdown = false; // Ensure the countdown is not canceled

  targetTime = Date.now() + timeSecond * 1000; // Calculate the target end time
  console.log(`Countdown started. Target time: ${new Date(targetTime).toLocaleTimeString()}`);
  step(); // Start the countdown loop
}

function step() {
  if (cancelCountdown) {
    console.log("Countdown canceled");
    cancelCountdown = false; // Reset the flag for future use
    countdownActive = false; // Reset the countdown flag
    return; // Stop further execution
  }

  const now = Date.now();
  const remainingTime = Math.max(0, targetTime - now); // Ensure it doesn't go below 0
  timeSecond = Math.ceil(remainingTime / 1000); // Convert to seconds

  // Stop the timer if it reaches 0
  if (timeSecond <= 0) {
    endCount(); // Handle the end of the countdown
    return; // Stop further execution
  }

  // Schedule the next step
  setTimeout(step, interval);
}

function displayTime() {
  const min = Math.floor(timeSecond / 60);
  const sec = Math.floor(timeSecond % 60);

  // Display the timer on the canvas
  fill(0);
  text(`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`, width / 2, height / 1.5);
}

function endCount() {
  runningPage = false; // Exit the runningPage
  endPage = true; // Transition to the endPage
  countdownActive = false; // Reset the countdown flag
  cancelCountdown = true; // Stop the countdown loop
  console.log("Time out");
}