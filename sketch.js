// ----------------------------------- Button Variables
let titleBeginButton;
let startTimerButton;
let increaseTimerButton, decreaseTimerButton;
let cancelTimerButton;
let menuButton, exitMenuButton;
let returnToTitleButton; // menusHome
let enterFoodSelectionButton; // menusFoods
let selectFoodButton;
let restartTimerHomeButton;
let backFoodButton, nextFoodButton;

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

// ----------------------------------- Food Variables
let foodItems = ["toast1.png", "egg1.png"];
let currentFoodIndex = 0;
let currentFoodImage;
let foodImages = [];

// ----------------------------------- Preload
// preloading only instantly needed images to avoid loading problems
function preload() {
  titlePageBG = loadImage('Media/titlePageBG.png');
  framedBG = loadImage('Media/framedBG.png');
}

// ----------------------------------- Setup

function setup() {
  createCanvas(450, 450);
  imageMode(CENTER);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont('Helvetica');

  createButtons();
  loadFoodImage(currentFoodIndex);
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

// ----------------------------------- Load Food Images
function loadFoodImage(index) {
  if (!foodImages[index]) {
    foodImages[index] = loadImage(`Media/${foodItems[index]}`);
  }
  currentFoodImage = foodImages[index];
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
    timeSecond = lastTimeSecond;
    countdownActive = false;
    startCountdown();
    console.log(`Timer started with ${timeSecond} seconds`);
  });

  // SELECT FOOD BUTTON
  selectFoodButton = createImg('Media/selectFoodImage.png', 'selectFood');
  selectFoodButton.position(190, 340); // Position the button appropriately
  selectFoodButton.size(75, 27);
  selectFoodButton.mouseClicked(() => {
    console.log(`Selected food: ${foodItems[currentFoodIndex]}`);
    foodSelectionPage = false;
    homePage = true;
    currentFoodImage = foodImages[currentFoodIndex]; // Set the selected image
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
      timeSecond += 5 * 60;
    }
    lastTimeSecond += 5 * 60;
    console.log(`Timer increased: ${lastTimeSecond} seconds`);
  });

  // CANCEL TIMER
  cancelTimerButton = createImg('Media/cancelTimerImage.png', 'cancelTimer');
  cancelTimerButton.position(190, 340);
  cancelTimerButton.size(78, 27);
  cancelTimerButton.mouseClicked(() => {
    runningPage = false;
    homePage = true;
    countdownActive = false;
    cancelCountdown = true;
    timeSecond = lastTimeSecond;
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

  // WITHIN MENU OPTION BUTTONS
  returnToTitleButton = createImg('Media/menusHome.png', 'returnToTitle');
  returnToTitleButton.position(190, 150);
  returnToTitleButton.size(75, 27);
  returnToTitleButton.mouseClicked(() => {
    console.log("entered title page");
    titlePage = true;
    menuPage = false;
  });

  enterFoodSelectionButton = createImg('Media/menusFoods.png', 'enterFoodSelection');
  enterFoodSelectionButton.position(190, 200);
  enterFoodSelectionButton.size(75, 27);
  enterFoodSelectionButton.mouseClicked(() => {
    console.log("entered food selection page");
    menuPage = false;
    foodSelectionPage = true;
  });

  // BACK FOOD BUTTON
  backFoodButton = createImg('Media/backFood.png', 'backFood');
  backFoodButton.position(105, 220);
  backFoodButton.mouseClicked(() => {
    currentFoodIndex = (currentFoodIndex - 1 + foodItems.length) % foodItems.length;
    loadFoodImage(currentFoodIndex);
  });

  // NEXT FOOD BUTTON
  nextFoodButton = createImg('Media/nextFood.png', 'nextFood');
  nextFoodButton.position(320, 220);
  nextFoodButton.mouseClicked(() => {
    currentFoodIndex = (currentFoodIndex + 1) % foodItems.length;
    loadFoodImage(currentFoodIndex);
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

// ----------------------------------- Hide All Buttons
function hideAllButtons() {
  titleBeginButton.hide();
  startTimerButton.hide();
  increaseTimerButton.hide();
  decreaseTimerButton.hide();
  cancelTimerButton.hide();
  menuButton.hide();
  exitMenuButton.hide();
  returnToTitleButton.hide();
  enterFoodSelectionButton.hide();
  selectFoodButton.hide();
  restartTimerHomeButton.hide();
  backFoodButton.hide();
  nextFoodButton.hide();
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

    if (currentFoodImage) {
      image(currentFoodImage, width / 2, height / 2, 128, 128);
    }
  }

  if (foodSelectionPage) {
    backFoodButton.show();
    nextFoodButton.show();
    selectFoodButton.show();

    if (currentFoodImage) {
      image(currentFoodImage, width / 2, height / 2, 128, 128);
    }
  }

  if (runningPage) {
    cancelTimerButton.show();
  }

  if (menuPage) {
    exitMenuButton.show();
    returnToTitleButton.show();
    enterFoodSelectionButton.show();
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