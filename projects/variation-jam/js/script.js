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

// Panels
const panel = {
    type: "panel",
    padX: 150,
    padY: 100,
    cornerRadius: 30,
    opacity: 170
}
const dialogPanel = {
    type: "dialogPanel",
    padX: 80,
    padTop: 490,
    padBottom: 30,
    // height: 190,
    cornerRadius: 30,
    opacity: 170
}

// Dialog Next Line Indicator
const dialogNextIcon = {
    size: 18,
    padRight: 24,
    padBottom: 35,
    floatPX: 6,
    floatSpeed: 0.08
}

// Character Hit Boxes
const erickHitBox = {
    x: 325,
    y: 190,
    w: 105,
    h: 495
}
const pengHitBox = {
    x: 600,
    y: 205,
    w: 100,
    h: 475
}
const toriHitBox = {
    x: 845,
    y: 320,
    w: 95,
    h: 365
}
const hawkHitBox = {
    x: 1055,
    y: 370,
    w: 90,
    h: 320
}

// Image variables
let bgImage = undefined;
let logo = undefined;
let storyBtn = undefined;
let instructionsBtn = undefined;
let backBtn = undefined;
let playBtn = undefined;
let erickStanding = undefined;
let pengStanding = undefined;
let toriStanding = undefined;
let hawkStanding = undefined;
let erickInterview = undefined;
let pengInterview = undefined;
let toriInterview = undefined;
let hawkInterview = undefined;

// Font
let fontBestime = undefined;

// Dialogs JSON
let dialogsJSON = undefined;

// Dialogue
let dialogue = {
    lines: [],
    index: 0,
    active: false
}

// Preload
function preload() {
    bgImage = loadImage('./assets/images/background/living-room.png');
    logo = loadImage('./assets/images/menu/logo.png');

    // Buttons
    storyBtn = loadImage('./assets/images/menu/buttons/story-btn.png');
    instructionsBtn = loadImage('./assets/images/menu/buttons/instructions-btn.png');
    backBtn = loadImage('./assets/images/menu/buttons/back-btn.png');
    playBtn = loadImage('./assets/images/menu/buttons/play-btn.png');

    // Characters - Standing
    erickStanding = loadImage('./assets/images/family/standing/erick-full.png');
    pengStanding = loadImage('./assets/images/family/standing/peng-full.png');
    toriStanding = loadImage('./assets/images/family/standing/tori-full.png');
    hawkStanding = loadImage('./assets/images/family/standing/hawk-full.png');

    // Characters - Interview Closeups
    erickInterview = loadImage('./assets/images/family/mouths/erick-scene.png');
    pengInterview = loadImage('./assets/images/family/mouths/peng-scene.png');
    toriInterview = loadImage('./assets/images/family/mouths/tori-scene.png');
    hawkInterview = loadImage('./assets/images/family/mouths/hawk-scene.png');

    // Font
    fontBestime = loadFont('./assets/fonts/Bestime.ttf');

    // JSON
    dialogsJSON = loadJSON('./assets/data/dialogs.json')
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
        case "erick":
            erickDraw();
            break;
        case "peng":
            pengDraw();
            break;
        case "tori":
            toriDraw();
            break;
        case "hawk":
            hawkDraw();
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
        case "erick":
            erickMousePressed();
            break;
        case "peng":
            pengMousePressed();
            break;
        case "tori":
            toriMousePressed();
            break;
        case "hawk":
            hawkMousePressed();
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

function drawText(textString, thePanel) {
    // Padding for the text block
    const textPad = 30;

    let x = undefined;
    let y = undefined;
    let w = undefined;
    let h = undefined;

    if (thePanel.type === "dialogPanel") {
        x = thePanel.padX + textPad;
        y = thePanel.padTop + textPad;
        w = width - (thePanel.padX * 2) - (textPad * 2);
        h = height - thePanel.padTop - thePanel.padBottom - (textPad * 2);

        push();
        textFont(fontBestime || 'Georgia');
        fill("white");
        noStroke();
        textAlign(LEFT, CENTER);
        textSize(25);
        text(textString, x, y, w, h);
        pop();
    }
    // Story/Instructions Panel
    else {
        x = panel.padX + textPad;
        y = panel.padY + textPad;
        w = width - (panel.padX * 2) - (textPad * 2);
        h = height - (panel.padY * 2) - (textPad * 2);

        push();
        textFont(fontBestime || 'Georgia');
        fill("white");
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(30);
        text(textString, x, y, w, h);
        pop();
    }
}

function drawDialogNextIcon() {
    // Only show while dialog is active
    if (!dialogue.active) {
        return;
    }
    const dialogPanelSize = getDialogPanelSize();
    const size = dialogNextIcon.size;
    const sizeHalf = size / 2;
    const floatY = Math.sin(frameCount * dialogNextIcon.floatSpeed) * dialogNextIcon.floatPX;

    // Position
    const x = dialogPanelSize.x + dialogPanelSize.w - dialogNextIcon.padRight;
    const y = dialogPanelSize.y + dialogPanelSize.h - dialogNextIcon.padBottom + floatY;

    push();
    noStroke();
    fill('white');
    // Upside down triangle
    // triangle(x - sizeHalf, y - size * 0.6, y + sizeHalf, y - size * 0.06, x, y + size * 0.6)
    triangle(x - sizeHalf, y - sizeHalf * 0.1, x + sizeHalf, y - size * 0.06, x, y + size * 0.6)
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
        // If element is a panel for Story/Instructions
        else if (element.type === "panel") {
            push();
            noStroke();
            fill(0, element.opacity);
            rectMode(CORNER);
            rect(element.padX, element.padY, width - element.padX * 2, height - element.padY * 2, element.cornerRadius);
            pop();
        }
        // If element is a dialog panel
        else if (element.type === "dialogPanel") {
            push();
            noStroke();
            fill(0, element.opacity);
            rectMode(CORNER);
            rect(element.padX, element.padTop, width - element.padX * 2, height - element.padTop - element.padBottom, element.cornerRadius);
            pop();

            // Draw the Next Line Indicator thigny
            drawDialogNextIcon();
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

// Get Dialog Panel Size
function getDialogPanelSize() {
    const x = dialogPanel.padX;
    const y = dialogPanel.padTop;
    const w = width - dialogPanel.padX * 2;
    const h = height - dialogPanel.padTop - dialogPanel.padBottom;
    return {
        x, y, w, h
    };
}

// Check mouse inside dialog panel
function mouseInDialogPanel() {
    const dialogPanelSize = getDialogPanelSize();
    if (mouseX >= dialogPanelSize.x && mouseX < dialogPanelSize.x + dialogPanelSize.w && mouseY >= dialogPanelSize.y && mouseY < dialogPanelSize.y + dialogPanelSize.h) {
        return true;
    }
}

// Start dialog
function startDialog(linesArray) {
    dialogue.lines = linesArray;
    dialogue.index = 0;
    dialogue.active = dialogue.lines.length > 0;
}

// Get current line or empty string
function currentLine() {
    if (!dialogue.active) {
        return "";
    }
    else {
        return dialogue.lines[dialogue.index] || "";
    }
}

// Move to next line or finish
function advanceDialog() {
    if (!dialogue.active) {
        return;
    }

    if (dialogue.index < dialogue.lines.length - 1) {
        dialogue.index += 1;
    }
    else {
        dialogue.active = false;
        // back to living room
        state = "living room"
    }
}