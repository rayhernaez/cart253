/**
 * Mod Jam - Froggy, the Avatar
 * Ray Hernaez
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// State of the game: title | info | play
let state = "title";

// Canvas size
const canvas = {
    w: 640,
    h: 480
};

// Menu buttons
const buttons = {
    infoButton: {
        x: canvas.w / 2 - 60,
        y: 300,
        w: 120,
        h: 50
    },
    backButton: {
        x: 20,
        y: 20,
        w: 90,
        h: 36
    },
    playButton: {
        x: canvas.w / 2 - 80,
        y: canvas.h - 70,
        w: 160,
        h: 50
    }
};

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(canvas.w, canvas.h);

    // Give the fly its first random position
    resetFly();
}

function draw() {
    if (state === "title") {
        drawTitleScreen();
    }
    else if (state === "info") {
        drawInfoScreen();
    }
    else if (state === "play") {
        drawPlayScreen();
    }

    // background("#87ceeb");
    // moveFly();
    // drawFly();
    // moveFrog();
    // moveTongue();
    // drawFrog();
    // checkTongueFlyOverlap();
}

// Draw title screen
function drawTitleScreen() {
    background("#87ceeb");
    drawPond();

    // Title text
    push();
    textAlign(CENTER, TOP);
    textSize(48);
    textFont("Georgia");
    stroke(0);
    strokeWeight(6);
    fill("#00c853");
    text("Froggy, the Avatar", width / 2, 80);
    pop();

    // Creator credits
    push();
    textAlign(CENTER, TOP);
    textSize(16);
    textFont("Georgia");
    noStroke();
    fill(0);
    text("made by Ray Hernaez", width / 2, 150);
    pop();

    // Info button
    drawButton(buttons.infoButton.x, buttons.infoButton.y, buttons.infoButton.w, buttons.infoButton.h, "Info");
}

// Draw info screen
function drawInfoScreen() {
    background("#e3f2fd");
    drawPond();

    // Heading text
    push();
    textAlign(LEFT, TOP);
    textSize(28);
    textFont("Georgia");
    noStroke();
    fill("#1b5e20");
    text("Game Info", 24, 70);
    pop();

    // Story text
    const story =
        "Froggy is the new Avatar and can bend all four elements: Water, Earth, Fire, Air. \n" +
        "He must stop pesky flies before they reach the pond. \n\n" +
        "Use the matching element to defeat each coloured fly. \n" +
        "Water 💦 against blue flies; Earth 🪨 against green flies; \n" +
        "Fire 🔥 against red flies; Air 💨 against yellow flies.";

    const controls =
        "Controls: \n" +
        "Move Froggy with your mouse and click to attack! \n" +
        "Switch elements by pressing keys: \n" +
        "W key (💦); E key (🪨); F key (🔥); A key (💨).";

    push();
    textAlign(LEFT, TOP);
    textSize(16);
    textFont("Georgia");
    noStroke();
    fill(20);
    textLeading(22);
    text(story, 24, 120, width - 48, 140);
    text(controls, 24, 280, width - 48, 200);
    pop();

    // Back button
    drawButton(buttons.backButton.x, buttons.backButton.y, buttons.backButton.w, buttons.backButton.h, "Back");

    // Play button
    drawButton(buttons.playButton.x, buttons.playButton.y, buttons.playButton.w, buttons.playButton.h, "Play");
}

// Draw play screen
function drawPlayScreen() {
    // Actual gameplay
    background("#87ceeb");
    drawPond();
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
}

// Draw button
function drawButton(x, y, w, h, label) {
    // button
    push();
    stroke(0);
    strokeWeight(3);
    fill("#ffd54f");
    rect(x, y, w, h, 10);
    pop();

    // label
    push();
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    textFont("Georgia");
    text(label, x + w / 2, y + h / 2 + 1);
    pop();
}

// Draw pond
function drawPond() {
    push();
    noStroke();
    fill("#41a5e3ff");
    rect(0, height - 60, width, 60);
    pop();
}

// Checks mouse (m) touching button (b)
function mouseTouchingButton(mX, mY, bLeft, bTop, bWidth, bHeight) {
    const bRight = bLeft + bWidth;
    const bBottom = bTop + bHeight;

    // If mouse is on the button
    if (((mX >= bLeft) && (mX <= bRight)) && ((mY >= bTop) && (mY <= bBottom))) {
        return true;
    }
    // If mouse is not on the button
    else {
        return false;
    }
}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Handles mouse clicking depending on which screens user is on
 */
function mousePressed() {
    // if we're on title screen
    if (state === "title") {
        if (mouseTouchingButton(mouseX, mouseY, buttons.infoButton.x, buttons.infoButton.y, buttons.infoButton.w, buttons.infoButton.h)) {
            state = "info";
        }
    }
    // if we're on info screen
    else if (state === "info") {
        if (mouseTouchingButton(mouseX, mouseY, buttons.backButton.x, buttons.backButton.y, buttons.backButton.w, buttons.backButton.h)) {
            state = "title";
        }
        if (mouseTouchingButton(mouseX, mouseY, buttons.playButton.x, buttons.playButton.y, buttons.playButton.w, buttons.playButton.h)) {
            state = "play";
        }
    }
    // if we're on play screen
    else if (state === "play") {
        // Launch the tongue on click
        if (frog.tongue.state === "idle") {
            frog.tongue.state = "outbound";
        }
    }
}