"use strict";

// Elements
const elevator = document.querySelector(".elevator");
const arrowButtons = document.querySelectorAll(".arrow-button");
const buttonOne = document.querySelector(".button-1"); // Down button
const buttonTwo = document.querySelector(".button-2"); // Up button
const buttonThree = document.querySelector(".button-3"); // Down button
const buttonFour = document.querySelector(".button-4"); // Up button
const soundEffect = document.querySelector("#sound-effect");

// Constants
const floorTwo = "-126%";
const floorOne = "-26%";
const floorZero = elevator.style.top;

const shortDuration = "5s";
const longDuration = "10s";

let isTransitionInProgress = false; // Track Elevator Transition

// Helper Functions
function playAudioEffect() {
  soundEffect.currentTime = 0; // Reset Audio
  soundEffect.volume = 1; // Set Volume
  soundEffect.play();
}

function moveElevatorTo(floor, duration) {
  if (isTransitionInProgress) return;

  return new Promise((resolve) => {
    isTransitionInProgress = true; // Set Transition Status

    elevator.style.transition = `top ${duration} ease`;
    elevator.style.top = floor;

    elevator.addEventListener(
      "transitionend",
      () => {
        isTransitionInProgress = false; // Reset Transition Status
        playAudioEffect(); // Play Sound Effect
        resolve();
      },
      { once: true }
    );
  });
}

// Add Togglable Functionality
arrowButtons.forEach((button) => {
  button.addEventListener("click", function () {
    if (isTransitionInProgress) return; // Prevent Multiple Clicks

    this.classList.toggle("active");
  });
});

// Top Floor
// Down Button
buttonOne.addEventListener("click", async function () {
  if (elevator.style.top !== floorTwo) return this.classList.remove("active");

  this.classList.remove("active");

  if (buttonThree.classList.contains("active")) {
    await moveElevatorTo(floorOne, shortDuration);
    return buttonThree.classList.remove("active");
  }

  await moveElevatorTo(floorZero, longDuration);
});

// Middle Floor
// Up Button
buttonTwo.addEventListener("click", async function () {
  if (elevator.style.top !== floorOne) return;

  this.classList.remove("active");

  await moveElevatorTo(floorTwo, shortDuration);
});

// Down Button
buttonThree.addEventListener("click", async function () {
  if (elevator.style.top !== floorOne) return;

  this.classList.remove("active");

  await moveElevatorTo(floorZero, shortDuration);
});

// Ground Floor
// Up Button
buttonFour.addEventListener("click", async function () {
  if (elevator.style.top !== floorZero) return this.classList.remove("active");

  this.classList.remove("active");

  if (buttonTwo.classList.contains("active")) {
    await moveElevatorTo(floorOne, shortDuration);
    return buttonTwo.classList.remove("active");
  }

  await moveElevatorTo(floorTwo, longDuration);
});
