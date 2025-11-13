/**
 * Variation Jam - The Missing Boy
 * Ray Hernaez
 * 
 * // description
 * 
 * // instructions
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

let state = "menu";

// Button Hit Boxes
const storyBtnHitBox = {
    x: 210,
    y: 580,
    w: 160,
    h: 60
}
const instructionsBtnHitBox = {
    x: 840,
    y: 590,
    w: 330,
    h: 50
}
const backBtnHitBox = {
    x: 85,
    y: 590,
    w: 135,
    h: 55
}
const playBtnHitBox = {
    type: "play",
    x: 1075,
    y: 600,
    w: 125,
    h: 50
}

// Panel
const panel = {
    type: "panel",
    padX: 150,
    padY: 100,
    cornerRadius: 30,
    opacity: 170
}

// Image variables
let bgImage = undefined;
let logo = undefined;
let storyBtn = undefined;
let instructionsBtn = undefined;
let backBtn = undefined;
let playBtn = undefined;

// Font
let fontBestime = undefined;

// Preload
function preload() {
    bgImage = loadImage('./assets/images/background/living-room.png');
    logo = loadImage('./assets/images/menu/logo.png');
    storyBtn = loadImage('./assets/images/menu/buttons/story-btn.png');
    instructionsBtn = loadImage('./assets/images/menu/buttons/instructions-btn.png');
    backBtn = loadImage('./assets/images/menu/buttons/back-btn.png');
    playBtn = loadImage('./assets/images/menu/buttons/play-btn.png');
    fontBestime = loadFont('./assets/fonts/Bestime.ttf');
}

// Menu checks
let checkedStory = false;
let checkedInstructions = false;

/**
 * Create the canvas
*/
function setup() {
    createCanvas(1280, 720);
}


/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "story":
            storyDraw();
            break;
        case "instructions":
            instructionsDraw();
            break;
        case "living room":
            livingRoomDraw();
            break;
    }
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "story":
            storyMousePressed();
            break;
        case "instructions":
            instructionsMousePressed();
            break;
        case "living room":
            livingRoomMousePressed();
            break;
    }
}

// Pointer cursor feedback when hovering buttons
function updateCursor(hitBoxes) {
    let hovering = false;
    for (const hitBox of hitBoxes) {
        // If it's play button hit box
        // and user has not checked Story and Instructions
        if (hitBox.type === "play" && !(checkedStory && checkedInstructions)) {
            continue;
        }
        else if (mouseTouchesHitBox(hitBox)) {
            hovering = true;
            break;
        }
    }
    if (hovering) {
        cursor('pointer');
    }
    else {
        cursor('default');
    }
}

function drawText(textString, panel) {
    // Padding for the text block
    const textPad = 30;

    const x = panel.padX + textPad;
    const y = panel.padY + textPad;
    const w = width - (panel.padX * 2) - (textPad * 2);
    const h = height - (panel.padY * 2) - (textPad * 2);

    push();
    textFont(fontBestime || 'Georgia');
    fill("white");
    noStroke;
    textAlign(CENTER, CENTER);
    textSize(30);
    text(textString, x, y, w, h);
    pop();
}

function drawElement(elements) {
    for (const element of elements) {
        // If element is a p5 image
        if (element instanceof p5.Image) {
            let y = 0;
            imageMode(CORNER);
            if (element === logo) {
                // Sine wave to get a smooth animation
                y = Math.sin(frameCount * logoFloatSpeed) * logoFloatPX;
                image(element, 0, y, width, height);
            }
            else {
                image(element, 0, y, width, height);
            }
        }
        // If element is a panel
        else if (element.type === "panel") {
            push();
            noStroke();
            fill(0, element.opacity);
            rectMode(CORNER);
            rect(element.padX, element.padY, width - element.padX * 2, height - element.padY * 2, element.cornerRadius);
            pop();
        }
    }
}

// Checks if mouse touches hit box
function mouseTouchesHitBox(hitBox) {
    if (mouseX >= hitBox.x && mouseX <= hitBox.x + hitBox.w && mouseY >= hitBox.y && mouseY <= hitBox.y + hitBox.h) {
        return true;
    }
    else {
        return false;
    }
}