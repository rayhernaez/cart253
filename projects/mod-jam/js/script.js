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

// Elements + emojis; collection of elements
const elementTypes = [
    {
        name: "fire",
        emoji: "🔥",
        skinColour: "#e15654ff",
        key: "f"
    },
    {
        name: "water",
        emoji: "💦",
        skinColour: "#3581e5ff",
        key: "w"
    },
    {
        name: "air",
        emoji: "💨",
        skinColour: "#e2d098ff",
        key: "a"
    },
    {
        name: "earth",
        emoji: "🪨",
        skinColour: "#00ff00",
        key: "e"
    }
];

// 
function elementByName(name) {
    for (const element of elementTypes) {
        if (element.name === name) {
            return element; // found a match
        }
    }
    return undefined; // no match found
}

// 
function elementByKey(key) {
    for (const element of elementTypes) {
        if (element.key === key) {
            return element; // found a match
        }
    }
    return undefined; // no match found
}

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 480,
        size: 150
    },
    // start as earth
    element: elementByName("earth"),
    skinColour: elementByName("earth").skinColour
};

// Elemental projectiles
let projectiles = [];

const projectileSize = 26;
const projectileSpeed = 7;
const projectileHitRadius = projectileSize * 0.35;

function launchProjectile() {
    const element = frog.element;
    projectiles.push({
        x: frog.body.x,
        y: frog.body.y - frog.body.size * 0.45,
        speed: -projectileSpeed,
        element: element.name,
        emoji: element.emoji,
        size: projectileSize,
        collision: projectileHitRadius
    });
}

function updateProjectiles() {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.y += projectile.speed;
        if (projectile.y < -projectile.size) {
            projectiles.splice(i, 1);
        }
    }
}

function drawProjectiles() {
    push();
    textAlign(CENTER, CENTER);
    textSize(projectileSize);
    noStroke();
    for (const projectile of projectiles) {
        text(projectile.emoji, projectile.x, projectile.y);
    }
    pop();
}

// Pesky bugs info
const maxActiveBugs = 3;
const bugSize = 28;
const bugHitRadius = bugSize * 0.35; // Hit collision
const bugMinSpeed = 1;
const bugMaxSpeed = 1.5;
const bugSpawnX = 24; // Keep inside canvas

// Bug types + emojis; collection of bugs
const bugTypes = [
    {
        name: "red",
        emoji: "🐞"
    },
    {
        name: "blue",
        emoji: "🦋"
    },
    {
        name: "yellow",
        emoji: "🐝"
    },
    {
        name: "green",
        emoji: "🪲"
    }
];

// Active bugs array
let bugs = [];

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(canvas.w, canvas.h);
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

// Draw play screen; actual gameplay
function drawPlayScreen() {
    background("#87ceeb");
    drawPond();

    // Bug system
    keepThreeActiveBugs();
    updateBugs();
    drawBugs();

    moveFrog();
    updateProjectiles();
    drawProjectiles();
    drawFrog();
    drawFrogEyes();

    // Collision
    checkProjectileBugCollisions();
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

// Always keep 3 bugs active
function keepThreeActiveBugs() {
    while (bugs.length < maxActiveBugs) {
        spawnBug();
    }
}

// Spawns a new bug at random x at the top
function spawnBug() {
    const type = random(bugTypes); // Random bug emoji
    const x = random(bugSpawnX, width - bugSpawnX); // Random x
    const y = -bugSize; // Just above the top to keep smooth spawn
    const speed = random(bugMinSpeed, bugMaxSpeed); // Random speed

    // Add new bug in array
    bugs.push({
        x,
        y,
        speed,
        emoji: type.emoji,
        name: type.name,
        size: bugSize,
        collision: bugHitRadius
    });
}

// Bugs go down slowly
function updateBugs() {
    for (let i = bugs.length - 1; i >= 0; i--) {
        const newBug = bugs[i];
        newBug.y += newBug.speed;

        // Remove if bug leaves the bottom screen
        if (newBug.y > height + newBug.size) {
            bugs.splice(i, 1);
        }
    }
}

// Draw bugs
function drawBugs() {
    push();
    textAlign(CENTER, CENTER);
    textSize(bugSize);
    noStroke();
    for (const newBug of bugs) {
        text(newBug.emoji, newBug.x, newBug.y);
    }
    pop();
}

// Check tongue + bug collision
function checkTongueBugCollisions() {
    for (let i = bugs.length - 1; i >= 0; i--) {
        const newBug = bugs[i];
        const distance = dist(frog.tongue.x, frog.tongue.y, newBug.x, newBug.y);
        const tongueRadius = frog.tongue.size / 2;

        if (distance < tongueRadius + newBug.collision) {
            bugs.splice(i, 1); // remove bug
            frog.tongue.state = "inbound"; // bring tongue back
        }
    }
    keepThreeActiveBugs();
}

// Check projectile + bug collision
function checkProjectileBugCollisions() {
    for (let i = bugs.length - 1; i >= 0; i--) {
        const newBug = bugs[i];
        for (let j = projectiles.length - 1; j >= 0; j--) {
            const projectile = projectiles[j];
            const distance = dist(projectile.x, projectile.y, newBug.x, newBug.y);
            if (distance < projectile.collision + newBug.collision) {
                bugs.splice(i, 1);
                projectiles.splice(j, 1);
                break;
            }
        }
    }
    keepThreeActiveBugs();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the frog's body
    push();
    fill(frog.skinColour);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

function drawFrogEyes() {
    // relative to frog's body
    const eyeRadius = frog.body.size * 0.18;
    const pupilRadius = eyeRadius * 0.45;
    const spaceBetweenEyes = frog.body.size * 0.38;
    const eyeY = frog.body.y - frog.body.size * 0.25;

    const leftX = frog.body.x - spaceBetweenEyes / 2;
    const rightX = frog.body.x + spaceBetweenEyes / 2;

    const squint = (state === "play" && mouseIsPressed); //condition

    if (squint) {
        // Draw squint ><
        push();
        stroke(20);
        strokeWeight(max(2, floor(eyeRadius * 0.35)));
        noFill();
        // Left eye as >
        line(leftX - eyeRadius, eyeY - eyeRadius * 0.5, leftX + eyeRadius, eyeY);
        line(leftX - eyeRadius, eyeY + eyeRadius * 0.5, leftX + eyeRadius, eyeY);
        // Right eye as <
        line(rightX + eyeRadius, eyeY - eyeRadius * 0.5, rightX - eyeRadius, eyeY);
        line(rightX + eyeRadius, eyeY + eyeRadius * 0.5, rightX - eyeRadius, eyeY);
        pop();
        return;
    }
    else {
        drawEyeWithPupil(leftX, eyeY, eyeRadius, pupilRadius);
        drawEyeWithPupil(rightX, eyeY, eyeRadius, pupilRadius);
    }
}

function drawEyeWithPupil(x, y, eyeRadius, pupilRadius) {
    // Eyeball
    push();
    noStroke();
    fill("white");
    ellipse(x, y, eyeRadius * 2);
    // Pupil
    fill("black");
    ellipse(x, y - 12, pupilRadius * 2);
    pop();
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
            // fresh start
            bugs = [];
            projectiles = [];
            keepThreeActiveBugs();
        }
    }
    // if we're on play screen
    else if (state === "play") {
        launchProjectile();
    }
}

function keyPressed() {
    const pressed = elementByKey(key.toLowerCase());
    if (pressed) {
        frog.element = pressed;
        frog.skinColour = pressed.skinColour;
    }
}