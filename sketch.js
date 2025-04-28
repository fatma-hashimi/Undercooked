// ----------------------------------- Button Variables
let titleBeginButton;
let startTimerButton,
  cancelTimerButton;
let increaseTimerButton,
  decreaseTimerButton;
let menuButton, // menus
  exitMenuButton,
  returnToTitleButton,
  enterFoodSelectionButton,
  selectFoodButton;
let restartTimerHomeButton;
let backFoodButton, nextFoodButton;

// ----------------------------------- Audio Variables
let adjustSound, deadendSound, cooking01Sound, beginSound, cancelSound, cookedSound;
let enterMenuSound, foodsMenuSound, selectedSound, backToTitleSound, exitMenuSound; // menu sounds

// ----------------------------------- Timer Variables
let timeSecond = 600;
let lastTimeSecond = 600; // tracks recent changes to timer duration
let countdownActive = false; // bool flag to track if countdown is running
let cancelCountdown = false; // bool flag to track if countdown is canceled
let targetTime;
const interval = 1000; // time between each interval for countdown (1 second)

let digitImages = [];
let colonImage;

// ----------------------------------- Pages
let titlePage = true;
let homePage = false;
let menuPage = false;
let runningPage = false;
let endPage = false;
let foodSelectionPage = false;
let undercookedPage = false;

// ----------------------------------- Background Image
let titlePageBG, framedBG, timerBarSlider;

// ----------------------------------- Misc Variables
let foodItems = ["toast1.png", "egg1.png", "pancakes1.png"];
let currentFoodIndex = 0;
let currentFoodImage;
let foodImages = [];
let foodInitialGifs = {};
let foodLoopGifs = {};
let dubiousFoodGif; 
let initialAnimationDone = false;
let animationStartTime;
let runningMessages = ["cookin'", "don't burn it", "focus fuels fire", "focus is flavor", "forge ahead", "precision cooking"];
let currentMessageIndex = -1;
let nextMessageTime = 0;
let foodDescriptions = {
  "toast1.png": "Buttered Toast",
  "egg1.png": "Fried Eggs",
  "pancakes1.png": "Honey Pancakes"
};

// ----------------------------------- Preload
function preload() {
  // images that retain
  titlePageBG = loadImage('Media/Images-GIFs/titlePageBG.png');
  framedBG = loadImage('Media/Images-GIFs/framedBG.png');
  timerBarSlider = loadImage('Media/Images-GIFs/timerBarSlider.png',
    () => console.log('Loaded timer bar slider image'),
    () => console.error('Failed to load timer bar slider image')
  );

  for (let i = 0; i < 10; i++) {
    let fileName = '';
    switch (i) {
      case 0: fileName = 'zero.png'; break;
      case 1: fileName = 'one.png'; break;
      case 2: fileName = 'two.png'; break;
      case 3: fileName = 'three.png'; break;
      case 4: fileName = 'four.png'; break;
      case 5: fileName = 'five.png'; break;
      case 6: fileName = 'six.png'; break;
      case 7: fileName = 'seven.png'; break;
      case 8: fileName = 'eight.png'; break;
      case 9: fileName = 'nine.png'; break;
    }

    digitImages[i] = loadImage('Media/Images-GIFs/Numbers/' + fileName,
      () => console.log(`Loaded digit ${i} image`),
      () => {
        console.error(`Failed to load digit ${i} image`);
        let img = createGraphics(40, 60);
        img.background(255);
        img.textAlign(CENTER, CENTER);
        img.textSize(40);
        img.text(i, 20, 30);
        digitImages[i] = img;
      }
    );
  }

  colonImage = loadImage('Media/Images-GIFs/Numbers/colon.png',
    () => console.log('Loaded colon image'),
    () => {
      console.error('Failed to load colon image');
      let img = createGraphics(20, 60);
      img.background(255);
      img.textAlign(CENTER, CENTER);
      img.textSize(40);
      img.text(':', 10, 30);
      colonImage = img;
    }
  );

  // audio files
  preloadAudio();
}

// ----------------------------------------------------------------------
// ---------Setup--------------------------------------------------------
// ----------------------------------------------------------------------
function setup() {
  createCanvas(450, 450);
  imageMode(CENTER);
  textSize(32);
  textAlign(CENTER, CENTER);
  textFont('Courier New');

  loadGifs();
  createButtons();
  loadFoodImage(currentFoodIndex);
  setupAudioVolumes();

  setTimeout(() => {
    beginSound.play();
    beginSound.stop();
    adjustSound.play();
    adjustSound.stop();
    cancelSound.play();
    cancelSound.stop();
  }, 100);
}

// ----------------------------------------------------------------------
// ----------Draw--------------------------------------------------------
// ----------------------------------------------------------------------
function draw() {
  checkTimerState();

  if (countdownActive && !runningPage) {
    countdownActive = false;
    cancelCountdown = true;
    console.log("Timer incorrectly running - stopped");
  }

  pageChanger();
  updateGifVisibility();

  if (runningPage) {
    if (!countdownActive) {
      startCountdown();
      setupNextMessage();
      startCookingAnimation();
    }
    displayTime();

    updateCookingAnimation();

    if (Date.now() >= nextMessageTime && currentMessageIndex !== -1) {
      setupNextMessage();
    }

    displayRunningMessage();
  }
}
// ----------------------------------------------------------------------
// -----------Button Functions-------------------------------------------
// ----------------------------------------------------------------------
let lastButtonClickTime = 0;
const clickDelay = 150;

function handleButtonClick(action) {
  const currentTime = Date.now();
  if (currentTime - lastButtonClickTime < clickDelay) {
    console.log("Button click ignored (too frequent)");
    return;
  }

  lastButtonClickTime = currentTime;
  action();
}

function createButtons() {
  // BEGIN
  titleBeginButton = createImg('Media/Images-GIFs/beginButtonImage.png', 'BeginButton');
  titleBeginButton.position(185, 230);
  titleBeginButton.size(75, 27);
  titleBeginButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (beginSound.isPlaying()) {
        beginSound.stop();
      }
      beginSound.play();

      setTimeout(() => {
        titlePage = false;
        homePage = true;
        resetTimerState();
        console.log("entered home page");
      }, 10);
    });
  });

  // START TIMER
  startTimerButton = createImg('Media/Images-GIFs/startTimerImage.png', 'StartTimer');
  startTimerButton.position(190, 340);
  startTimerButton.size(78, 27);
  startTimerButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (cooking01Sound.isPlaying()) {
        cooking01Sound.stop();
      }
      cooking01Sound.play();

      runningPage = true;
      homePage = false;
      timeSecond = lastTimeSecond;
      countdownActive = false;

      console.log(`Timer started with ${timeSecond} seconds`);
    });
  });

  // SELECT FOOD BUTTON
  selectFoodButton = createImg('Media/Images-GIFs/selectFoodImage.png', 'selectFood');
  selectFoodButton.position(190, 340);
  selectFoodButton.size(75, 27);
  selectFoodButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (selectedSound.isPlaying()) {
        selectedSound.stop();
      }
      selectedSound.play();

      console.log(`Selected food: ${foodItems[currentFoodIndex]}`);
      foodSelectionPage = false;
      homePage = true;
      currentFoodImage = foodImages[currentFoodIndex];
    });
  });

  // DECREASE TIMER by 5 - Move to center
  decreaseTimerButton = createImg('Media/Images-GIFs/decreaseImage.png', 'decrease5Timer');
  decreaseTimerButton.position(95, 280);
  decreaseTimerButton.size(24, 24);
  decreaseTimerButton.mouseClicked(() => {
    handleButtonClick(() => {
      console.log("Decrease 5 button clicked");
      if (lastTimeSecond > 300) {
        lastTimeSecond = Math.max(300, lastTimeSecond - 5 * 60);
        if (!countdownActive) {
          timeSecond = lastTimeSecond;
        }

        if (adjustSound.isPlaying()) {
          adjustSound.stop();
        }
        adjustSound.play();

        console.log(`Timer decreased by 5 min: ${lastTimeSecond} seconds`);
      } else {
        if (deadendSound.isPlaying()) {
          deadendSound.stop();
        }
        deadendSound.play();
      }
    });
  });

  // INCREASE TIMER by 5 - Move to center
  increaseTimerButton = createImg('Media/Images-GIFs/increaseImage.png', 'increase5Timer');
  increaseTimerButton.position(330, 280);
  increaseTimerButton.size(24, 24);
  increaseTimerButton.mouseClicked(() => {
    handleButtonClick(() => {
      console.log("Increase 5 button clicked");

      if (lastTimeSecond < 3600) {
        if (adjustSound.isPlaying()) {
          adjustSound.stop();
        }
        adjustSound.play();

        if (!countdownActive) {
          timeSecond += 5 * 60;
        }
        lastTimeSecond += 5 * 60;

        if (lastTimeSecond > 3600) {
          lastTimeSecond = 3600;
          if (!countdownActive) {
            timeSecond = lastTimeSecond;
          }
        }

        console.log(`Timer increased by 5 min: ${lastTimeSecond} seconds`);
      } else {
        if (deadendSound.isPlaying()) {
          deadendSound.stop();
        }
        deadendSound.play();

        console.log("Timer cannot go above 60:00");
      }
    });
  });

  // CANCEL TIMER
  cancelTimerButton = createImg('Media/Images-GIFs/cancelTimerImage.png', 'cancelTimer');
  cancelTimerButton.position(190, 340);
  cancelTimerButton.size(78, 27);
  cancelTimerButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (cancelSound.isPlaying()) {
        cancelSound.stop();
      }
      cancelSound.play();

      runningPage = false;
      undercookedPage = true;
      countdownActive = false;
      cancelCountdown = true;

      stopCookingAnimation();

      console.log("Timer cancelled. Transitioned to undercooked page.");
    });
  });

  // MENU BUTTONS
  menuButton = createImg('Media/Images-GIFs/menuEnterButton.png', 'menu');
  menuButton.position(35, 35);
  menuButton.size(24, 24);
  menuButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (enterMenuSound.isPlaying()) {
        enterMenuSound.stop();
      }
      enterMenuSound.play();

      console.log("entered menu page");
      homePage = false;
      menuPage = true;
    });
  });

  exitMenuButton = createImg('Media/Images-GIFs/menuExitButton.png', 'exitMenu');
  exitMenuButton.position(35, 35);
  exitMenuButton.size(24, 24);
  exitMenuButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (exitMenuSound.isPlaying()) {
        exitMenuSound.stop();
      }
      exitMenuSound.play();

      console.log("exited menu page");
      homePage = true;
      menuPage = false;
    });
  });

  // WITHIN MENU OPTION BUTTONS
  returnToTitleButton = createImg('Media/Images-GIFs/menusHome.png', 'returnToTitle');
  returnToTitleButton.position(100, 40);
  returnToTitleButton.size(75, 27);
  returnToTitleButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (backToTitleSound.isPlaying()) {
        backToTitleSound.stop();
      }
      backToTitleSound.play();

      console.log("entered title page");
      titlePage = true;
      menuPage = false;
    });
  });

  enterFoodSelectionButton = createImg('Media/Images-GIFs/menusFoods.png', 'enterFoodSelection');
  enterFoodSelectionButton.position(100, 80);
  enterFoodSelectionButton.size(75, 27);
  enterFoodSelectionButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (foodsMenuSound.isPlaying()) {
        foodsMenuSound.stop();
      }
      foodsMenuSound.play();

      console.log("entered food selection page");
      menuPage = false;
      foodSelectionPage = true;
    });
  });

  // BACK FOOD BUTTON
  backFoodButton = createImg('Media/Images-GIFs/backFood.png', 'backFood');
  backFoodButton.position(105, 220);
  backFoodButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (adjustSound.isPlaying()) {
        adjustSound.stop();
      }
      adjustSound.play();

      currentFoodIndex = (currentFoodIndex - 1);
      if (currentFoodIndex < 0) currentFoodIndex = foodItems.length - 1;

      if (currentFoodIndex >= 0 && currentFoodIndex < foodItems.length) {
        loadFoodImage(currentFoodIndex);
        console.log(`Current food index: ${currentFoodIndex}, name: ${foodItems[currentFoodIndex]}`);
      } else {
        console.error(`Invalid food index: ${currentFoodIndex}`);
        currentFoodIndex = 0;
        loadFoodImage(currentFoodIndex);
      }
    });
  });

  // NEXT FOOD BUTTON
  nextFoodButton = createImg('Media/Images-GIFs/nextFood.png', 'nextFood');
  nextFoodButton.position(320, 220);
  nextFoodButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (adjustSound.isPlaying()) {
        adjustSound.stop();
      }
      adjustSound.play();

      currentFoodIndex = (currentFoodIndex + 1) % foodItems.length;

      if (currentFoodIndex >= 0 && currentFoodIndex < foodItems.length) {
        loadFoodImage(currentFoodIndex);
        console.log(`Current food index: ${currentFoodIndex}, name: ${foodItems[currentFoodIndex]}`);
      } else {
        console.error(`Invalid food index: ${currentFoodIndex}`);
        currentFoodIndex = 0;
        loadFoodImage(currentFoodIndex);
      }
    });
  });

  // END PAGE
  restartTimerHomeButton = createImg('Media/Images-GIFs/restartTimerHomeImage.png', 'postTimerReturnToHome');
  restartTimerHomeButton.position(185, 340);
  restartTimerHomeButton.size(85, 27);
  restartTimerHomeButton.mouseClicked(() => {
    handleButtonClick(() => {
      if (backToTitleSound.isPlaying()) {
        backToTitleSound.stop();
      }
      backToTitleSound.play();

      undercookedPage = false;
      endPage = false;
      homePage = true;
      timeSecond = lastTimeSecond;
      countdownActive = false;
      cancelCountdown = true;
      console.log("Restarting timer and returning to home page.");
    });
  });

  sliderButton = createDiv('');
  sliderButton.position(135, 282);
  sliderButton.size(185, 20);
  sliderButton.style('cursor', 'pointer');

  let isDraggingSlider = false;

  sliderButton.mousePressed(() => {
    if (!homePage) return;
    isDraggingSlider = true;
    updateSliderPosition();
  });

  document.addEventListener('mousemove', (e) => {
    if (isDraggingSlider && homePage) {
      updateSliderPosition();
    }
  });

  document.addEventListener('mouseup', () => {
    isDraggingSlider = false;
  });

  function updateSliderPosition() {
    const mouseXRelativeToSlider = mouseX - 135;
    const sliderWidth = 185;

    let ratio = constrain(mouseXRelativeToSlider / sliderWidth, 0, 1);

    if (ratio >= 0.36 && ratio <= 0.45) {
      const decompressedRatio = (ratio - 0.36) / 0.7 + 0.36;
      ratio = decompressedRatio;
    }

    const minMinutes = 5;
    const maxMinutes = 60;
    let newMinutes = minMinutes + ratio * (maxMinutes - minMinutes);
    
    newMinutes = Math.round(newMinutes);
    
    const remainder = newMinutes % 5;
    
    if (remainder !== 0) {
      if (remainder >= 3) {
        newMinutes = newMinutes - remainder + 5;
      } else {
        newMinutes = newMinutes - remainder;
      }
    }
    
    const previousMinutes = Math.floor(lastTimeSecond / 60);
    
    const newSeconds = newMinutes * 60;
    lastTimeSecond = newSeconds;
    if (!countdownActive) {
      timeSecond = lastTimeSecond;
    }

    if (newMinutes !== previousMinutes && newMinutes % 5 === 0) {
      if (adjustSound.isPlaying()) {
        adjustSound.stop();
      }
      adjustSound.play();
    }

    if (frameCount % 5 === 0) {
      console.log(`Timer set to ${newMinutes} minutes via slider (rounded to nearest 5)`);
    }
  }

  sliderButton.style('opacity', '0');
}

// ---------------------------------------------------------------------- 
// -----------Hide All Buttons------------------------------------------- 
// ---------------------------------------------------------------------- 
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

  sliderButton.style('display', 'none');
}

// ---------------------------------------------------------------------- 
// ---------Page Changer------------------------------------------------- 
// ---------------------------------------------------------------------- 
function pageChanger() {
  hideAllButtons();

  if (titlePage) {
    background(225);
    image(titlePageBG, width / 2, height / 2);
    titleBeginButton.show();

    countdownActive = false;
    cancelCountdown = true;
  } else {
    background(255);
    image(framedBG, width / 2, height / 2);
  }

  if (homePage) {
    startTimerButton.show();
    increaseTimerButton.show();
    decreaseTimerButton.show();
    menuButton.show();

    image(timerBarSlider, width / 2, 292);
    
    const currentMinutes = Math.floor(lastTimeSecond / 60);
    displayMinutesBelow(currentMinutes);

    // this is to prevent the timer from running when transitioning to the homePage
    if (countdownActive && !runningPage) {
      countdownActive = false;
      cancelCountdown = true;
      console.log("Timer stopped due to home page transition");
    }

    restartTimerHomeButton.hide();
    dubiousFoodGif.hide();

    if (currentFoodImage) {
      image(currentFoodImage, width / 2, height / 2 - 20, 128, 128);
    }

    sliderButton.style('display', 'block');
  }

  if (foodSelectionPage) {
    backFoodButton.show();
    nextFoodButton.show();
    selectFoodButton.show();

    if (currentFoodImage) {
      image(currentFoodImage, width / 2, height / 2, 128, 128);
    }
    
    displayFoodDescription();
  }

  if (runningPage) {
    cancelTimerButton.show();
  }

  if (menuPage) {
    exitMenuButton.show();
    returnToTitleButton.show();
    enterFoodSelectionButton.show();
  }

  if (undercookedPage) {
    background(225);
    image(framedBG, width / 2, height / 2);
    restartTimerHomeButton.show();
    dubiousFoodGif.show();
    
    displayUndercookedText();
    
    console.log("Undercooked page displayed.");
  } else {
    dubiousFoodGif.hide();
  }

  if (endPage) {
    restartTimerHomeButton.show();
    
    // Display the cooked food image
    if (currentFoodImage) {
      image(currentFoodImage, width / 2, height / 2 - 20, 128, 128);
    }
    
    // Display the COOKED! text
    displayCookedText();
  }
}

function displayMinutesBelow(minutes) {
  if (!digitImages || digitImages.length !== 10) {
    console.error("Digit images not fully loaded for minutes display");
    return;
  }
  const digitWidth = 12;
  const digitHeight = 12;
  const yPosition = 318;
  
  const minMinutes = 5;
  const maxMinutes = 60;
  const sliderMinX = 135;
  const sliderMaxX = 320;
  
  let xPosition;
  
  if (minutes >= 25 && minutes <= 30) {
    const pos25 = sliderMinX + ((25 - minMinutes) / (maxMinutes - minMinutes)) * (sliderMaxX - sliderMinX);
    
    const pos30 = sliderMinX + ((30 - minMinutes) / (maxMinutes - minMinutes)) * (sliderMaxX - sliderMinX);
    
    const progressInRange = (minutes - 25) / 5;
    
    const compressionFactor = 0.7;
    
    xPosition = pos25 + (progressInRange * (pos30 - pos25) * compressionFactor);
    
    // const adjustmentForAfter30 = (pos30 - (pos25 + (pos30 - pos25) * compressionFactor));
  } 
  else if (minutes <= minMinutes) {
    xPosition = sliderMinX;
  } else if (minutes >= maxMinutes) {
    xPosition = sliderMaxX;
  } else if (minutes > 30) {
    const normalRatio = (minutes - minMinutes) / (maxMinutes - minMinutes);
    const normalPosition = sliderMinX + normalRatio * (sliderMaxX - sliderMinX);
    
    const pos25 = sliderMinX + ((25 - minMinutes) / (maxMinutes - minMinutes)) * (sliderMaxX - sliderMinX);
    const pos30 = sliderMinX + ((30 - minMinutes) / (maxMinutes - minMinutes)) * (sliderMaxX - sliderMinX);
    const compressionAmount = (pos30 - pos25) * (1 - 0.7);
    
    xPosition = normalPosition - compressionAmount;
  } else {
    const ratio = (minutes - minMinutes) / (maxMinutes - minMinutes);
    xPosition = sliderMinX + ratio * (sliderMaxX - sliderMinX);
  }
  
  if (minutes < 10) {
    image(digitImages[minutes], xPosition, yPosition, digitWidth, digitHeight);
  } 
  else if (minutes < 100) {
    const tens = Math.floor(minutes / 10);
    const ones = minutes % 10;
    
    image(digitImages[tens], xPosition - digitWidth/2, yPosition, digitWidth, digitHeight);
    image(digitImages[ones], xPosition + digitWidth/2, yPosition, digitWidth, digitHeight);
  }
  else {
    const hundreds = Math.floor(minutes / 100);
    const tens = Math.floor((minutes % 100) / 10);
    const ones = minutes % 10;
    
    image(digitImages[hundreds], xPosition - digitWidth, yPosition, digitWidth, digitHeight);
    image(digitImages[tens], xPosition, yPosition, digitWidth, digitHeight);
    image(digitImages[ones], xPosition + digitWidth, yPosition, digitWidth, digitHeight);
  }
}

// ----------------------------------------------------------------------
// --------------Load Images/GIFs------------------------------------------
// ----------------------------------------------------------------------
const foodAnimations = {
  "toast1.png": {
    hasAnimation: true,
    initialAnimation: "cookToast01.gif",
    loopAnimation: "cookToast02.gif",
    transitionTime: 3000
  },
  "egg1.png": {
    hasAnimation: true,
    initialAnimation: "cookEgg01.gif",
    loopAnimation: "cookEgg02.gif",
    transitionTime: 3000
  },
  "pancakes1.png": {
    hasAnimation: true,
    initialAnimation: "cookPancake01.gif",
    loopAnimation: "cookPancake02.gif",
    transitionTime: 3000
  },
};

function loadFoodImage(index) {
  if (!foodImages[index]) {
    foodImages[index] = loadImage(`Media/Images-GIFs/${foodItems[index]}`);
  }
  currentFoodImage = foodImages[index];
}

function loadGifs() {
  dubiousFoodGif = createImg('Media/Images-GIFs/dubiousFood.gif', 'Dubious Food');
  dubiousFoodGif.position(150, 130);
  dubiousFoodGif.size(150, 150);
  dubiousFoodGif.hide();

  for (const [foodName, config] of Object.entries(foodAnimations)) {
    if (config.hasAnimation) {
      if (config.initialAnimation) {
        const initialGif = createImg(`Media/Images-GIFs/GIFs/${config.initialAnimation}`, `${foodName} Initial Animation`);
        initialGif.position(width / 2 - 75, height / 2 - 95);
        initialGif.size(150, 150);
        initialGif.hide();
        foodInitialGifs[foodName] = initialGif;
      }

      if (config.loopAnimation) {
        const loopGif = createImg(`Media/Images-GIFs/GIFs/${config.loopAnimation}`, `${foodName} Loop Animation`);
        loopGif.position(width / 2 - 75, height / 2 - 95);
        loopGif.size(150, 150);
        loopGif.hide();
        foodLoopGifs[foodName] = loopGif;
      }
    }
  }
}

// ----------------------------------------------------------------------
// ---------Audio Functions----------------------------------------------
// ----------------------------------------------------------------------
function preloadAudio() {
  adjustSound = loadSound('Media/Audio/adjustSound.mp3');
  deadendSound = loadSound('Media/Audio/deadendSound.mp3');
  selectedSound = loadSound('Media/Audio/selectedSound.mp3');
  exitMenuSound = loadSound('Media/Audio/exitMenuSound.mp3');
  backToTitleSound = loadSound('Media/Audio/backToTitleSound.mp3');
  enterMenuSound = loadSound('Media/Audio/enterMenuSound.mp3');
  foodsMenuSound = loadSound('Media/Audio/foodsMenuSound.mp3');
  cooking01Sound = loadSound('Media/Audio/cooking01Sound.mp3');
  beginSound = loadSound('Media/Audio/beginSound.mp3');
  cancelSound = loadSound('Media/Audio/cancelSound.mp3');
  
  // Add cookedSound loading
  cookedSound = loadSound('Media/Audio/cookedSound.mp3',
    () => console.log('Loaded cooked sound'),
    () => console.error('Failed to load cooked sound')
  );
}

function setupAudioVolumes() {
  adjustSound.setVolume(0.3);
  deadendSound.setVolume(0.3);
  selectedSound.setVolume(0.2);
  exitMenuSound.setVolume(0.5);
  backToTitleSound.setVolume(0.3);
  enterMenuSound.setVolume(0.3);
  foodsMenuSound.setVolume(0.2);
  cooking01Sound.setVolume(0.3);
  beginSound.setVolume(0.3);
  cancelSound.setVolume(0.3);
  
  // Add volume for cookedSound
  cookedSound.setVolume(0.4);
}

// ----------------------------------------------------------------------
// ---------Timer Functions----------------------------------------------
// ----------------------------------------------------------------------
function startCountdown() {
  // needed to prevent multiple countdowns from starting
  if (countdownActive) return;
  countdownActive = true;
  cancelCountdown = false;

  // starts countdown here
  targetTime = Date.now() + timeSecond * 1000;
  console.log(`Countdown started. Target time: ${new Date(targetTime).toLocaleTimeString()}`);

  setupNextMessage();

  step(); // !!! function that does more math
}

function step() {
  if (!countdownActive || !runningPage) {
    console.log("Timer stopped: countdown inactive or not on running page");
    countdownActive = false;
    cancelCountdown = false;
    return;
  }

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

function displayTime(seconds = timeSecond) {
  const timeToDisplay = Math.floor(seconds);


  displayTimeWithImages(timeToDisplay);
}

function endCount() {
  runningPage = false;
  endPage = true;
  countdownActive = false;
  cancelCountdown = true;
  currentMessageIndex = -1;

  // Add cookedSound playback
  if (cookedSound.isPlaying()) {
    cookedSound.stop();
  }
  cookedSound.play();

  stopCookingAnimation();
  console.log("Timer completed - Cooked sound played");
}

function checkTimerState() {
  if (frameCount % 60 === 0 && countdownActive) {
    console.log(`TIMER STATE CHECK: countdownActive=${countdownActive}, runningPage=${runningPage}`);
  }
}

function resetTimerState() {
  countdownActive = false;
  cancelCountdown = true;
  console.log("Timer state reset");
}

function displayTimeWithImages(seconds) {
  if (isNaN(seconds)) {
    console.error("Invalid seconds value:", seconds);
    seconds = 0;
  }

  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);

  const minTens = Math.floor(min / 10);
  const minOnes = min % 10;
  const secTens = Math.floor(sec / 10);
  const secOnes = sec % 10;

  if (!digitImages || digitImages.length !== 10 || !colonImage) {
    console.error("Digit images not fully loaded");
    fill(255);
    noStroke();
    textSize(32);
    text(`${minTens}${minOnes}:${secTens}${secOnes}`, width / 2, height / 1.5);
    return;
  }

  const digitWidth = 18;
  const digitHeight = 18;
  const colonWidth = 18;
  const spacing = 2;
  const totalWidth = (digitWidth * 4) + colonWidth + (spacing * 4);

  const startX = width / 1.93 - totalWidth / 2;
  const baseY = height / 1.46 - digitHeight / 2;

  let currentX = startX;

  image(digitImages[minTens], currentX, baseY, digitWidth, digitHeight);
  currentX += digitWidth + spacing;

  image(digitImages[minOnes], currentX, baseY, digitWidth, digitHeight);
  currentX += digitWidth + spacing;

  image(colonImage, currentX, baseY, colonWidth, digitHeight);
  currentX += colonWidth + spacing;

  image(digitImages[secTens], currentX, baseY, digitWidth, digitHeight);
  currentX += digitWidth + spacing;

  image(digitImages[secOnes], currentX, baseY, digitWidth, digitHeight);
}

// ----------------------------------------------------------------------
// --------------Messages------------------------------------------------
// ----------------------------------------------------------------------
function displayRunningMessage() {
  if (currentMessageIndex === -1) return;

  push();
  textSize(24);
  textStyle(BOLD);
  fill(128);
  stroke(128);
  strokeWeight(1.5);
  text(runningMessages[currentMessageIndex], width / 2, height / 4);
  pop();
}

function setupNextMessage() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * runningMessages.length);
  } while (newIndex === currentMessageIndex && runningMessages.length > 1);

  currentMessageIndex = newIndex;

  const randomDelay = Math.floor(Math.random() * (90 - 30 + 1)) + 30;
  nextMessageTime = Date.now() + (randomDelay * 1000);

  console.log(`Next message "${runningMessages[currentMessageIndex]}" in ${randomDelay} seconds`);
}

function displayFoodDescription() {
  const currentFood = foodItems[currentFoodIndex];
  const description = foodDescriptions[currentFood];
  
  if (!description) return;
  
  push();
  textSize(24);
  textStyle(BOLD);
  fill(128);
  stroke(128);
  strokeWeight(1.5);
  text(description, width / 2, height / 4);
  pop();
}

function displayUndercookedText() {
  push();
  textSize(28);
  textStyle(BOLD);
  fill(0);
  stroke(0);
  strokeWeight(2);
  text("undercooked", width / 2, height / 4);
  pop();
}

// Add cooking completion text function
function displayCookedText() {
  push();
  textSize(28);
  textStyle(BOLD);
  fill(0, 128, 0); // Green color
  stroke(0);
  strokeWeight(2);
  text("COOKED!", width / 2, height / 4);
  pop();
}

// ----------------------------------------------------------------------
// --------Cooking Animations--------------------------------------------
// ----------------------------------------------------------------------
function startCookingAnimation() {
  const currentFood = foodItems[currentFoodIndex];
  const foodConfig = foodAnimations[currentFood];

  if (!foodConfig || !foodConfig.hasAnimation) return;

  initialAnimationDone = false;
  animationStartTime = Date.now();

  console.log(`Started cooking animation for ${currentFood}`);
}

function updateCookingAnimation() {
  if (!runningPage) return;

  const currentFood = foodItems[currentFoodIndex];
  const foodConfig = foodAnimations[currentFood];

  if (!foodConfig || !foodConfig.hasAnimation) return;

  const animationElapsed = Date.now() - animationStartTime;
  const transitionTime = foodConfig.transitionTime || 3000;

  if (!initialAnimationDone && animationElapsed >= transitionTime) {
    initialAnimationDone = true;
    console.log(`Switched to loop animation for ${currentFood}`);
  }
}

function stopCookingAnimation() {
  for (const food in foodInitialGifs) {
    if (foodInitialGifs[food]) {
      foodInitialGifs[food].hide();
    }
  }

  for (const food in foodLoopGifs) {
    if (foodLoopGifs[food]) {
      foodLoopGifs[food].hide();
    }
  }

  initialAnimationDone = false;
}

function updateGifVisibility() {
  dubiousFoodGif.hide();

  for (const food in foodInitialGifs) {
    foodInitialGifs[food].hide();
  }
  for (const food in foodLoopGifs) {
    foodLoopGifs[food].hide();
  }

  if (undercookedPage) {
    dubiousFoodGif.show();
  }

  if (runningPage) {
    const currentFood = foodItems[currentFoodIndex];
    const foodConfig = foodAnimations[currentFood];

    if (foodConfig && foodConfig.hasAnimation) {
      if (initialAnimationDone) {
        if (foodLoopGifs[currentFood]) {
          foodLoopGifs[currentFood].show();
        }
      } else {
        if (foodInitialGifs[currentFood]) {
          foodInitialGifs[currentFood].show();
        }
      }
    }
  }
}