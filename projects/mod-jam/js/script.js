/**
 * Mod Jam - Froggy, the Avatar
 * Ray Hernaez
 * 
 * A game of defeating bugs
 * using elemental attacks
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch elemental attack
 * - Defeat 15 bugs in total
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";

// State of the game
let state = "title";

// Canvas size
const canvas = {
    w: 640,
    h: 480
};

// Font to use on Title
let fontTitle = undefined;

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
    },
    playAgainButton: {
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

// Map bug type weakness to element that can hit it
const bugWeakness = {
    blue: "water",
    green: "earth",
    red: "fire",
    yellow: "air"
}

// Our frog
const frog = {
    body: {
        x: 320,
        y: 480,
        size: 150
    },
    // Starts as earth
    element: elementByName("earth"),
    skinColour: elementByName("earth").skinColour
};

// Elemental projectiles
let projectiles = [];
const projectileSize = 26;
const projectileSpeed = 7;
const projectileHitRadius = projectileSize * 0.35;

// Bugs info
const maxActiveBugs = 2;
const bugSize = 28;
const bugHitRadius = bugSize * 0.35;
const bugMinSpeed = 0.3;
const bugMaxSpeed = 0.5;
// Keep inside canvas
const bugSpawnX = 24;

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
// 15 bugs to defeat
const maxBugsTotal = 15;
// Total bugs created so far
let numberOfBugsSpawned = 0;
// Total bugs defeated
let bugsDefeated = 0;

// How long a bug stays shrunk after being hit, in frames
const hurtFrames = 8;

// 15 Sky colours from day to night
const skyColours = [
    "#87CEEB",
    "#79B8E6",
    "#6BA2E1",
    "#5D8CDC",
    "#4F76D7",
    "#4261D1",
    "#384FBE",
    "#2E3EAB",
    "#273498",
    "#212A86",
    "#1B216F",
    "#16195A",
    "#121246",
    "#0E0C34",
    "#0A0724"
];

// Ending 3 seconds delay before showing Play Again button
let endStartTime = 0;
const endDelay = 3000;

// Load assets
function preload() {
    // Load font
    fontTitle = loadFont("assets/fonts/Bestime.ttf");
}

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(canvas.w, canvas.h);
}

/**
 * Draws the current screen
 */
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
    else if (state === "win") {
        drawWinScreen();
    }
    else if (state === "fail") {
        drawFailScreen();
    }
}

/**
 * Find element info by name
 */
function elementByName(name) {
    for (const element of elementTypes) {
        if (element.name === name) {
            // Found a match
            return element;
        }
    }
    // No match
    return undefined;
}

/**
 * Find element info by key; keys W E F A
 */
function elementByKey(key) {
    for (const element of elementTypes) {
        if (element.key === key) {
            // Found a match
            return element;
        }
    }
    // No match
    return undefined;
}

/**
 * Use title font or Georgia
 */
function useTitleFont() {
    // Georgia font in case custom font does not work
    textFont(fontTitle || "Georgia");
}

/**
 * Use body font Georgia
 */
function useBodyFont() {
    textFont("Georgia");
}

/**
 * Draw a centered title
 */
function drawCenteredTitle(textString, centerY, size, colour) {
    push();
    textAlign(CENTER, CENTER);
    useTitleFont();
    textSize(size);
    stroke(0);
    strokeWeight(6);
    fill(colour);
    text(textString, width / 2, centerY);
    pop();
}

/**
 * Draw a centered text body
 */
function drawCenteredBody(textString, centerY, size, colour) {
    push();
    textAlign(CENTER, CENTER);
    useTitleFont();
    textSize(size);
    noStroke();
    fill(colour);
    text(textString, width / 2, centerY);
    pop();
}

/**
 * Draw yellow button
 */
function drawButton(x, y, w, h, label) {
    // Box
    push();
    stroke(0);
    strokeWeight(3);
    fill("#ffd54f");
    rect(x, y, w, h, 10);
    pop();

    // Text label
    push();
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    useTitleFont();
    text(label, x + w / 2, y + h / 2 + 1);
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
 * Draw pond at the bottom
 */
function drawPond() {
    push();
    noStroke();
    fill("#41a5e3ff");
    rect(0, height - 60, width, 60);
    pop();
}

/**
 * Draw sky from day to night
 */
function drawSky() {
    // 15 sky colours only
    const skyIndex = constrain(bugsDefeated, 0, skyColours.length - 1);
    background(skyColours[skyIndex]);
}

/**
 * Draw Bugs Left counter
 */
function drawBugsLeftCounter() {
    const bugsLeft = maxBugsTotal - bugsDefeated;
    push();
    textAlign(LEFT, TOP);
    useTitleFont();
    textSize(16);
    fill("yellow");
    strokeWeight(7);
    stroke("black");
    text(bugsLeft + " bugs left!", 12, 12);
    pop();
}

/**
 * Draws title screen
 */
function drawTitleScreen() {
    background("#87ceeb");
    drawPond();

    drawCenteredTitle("Froggy, the Avatar", 140, 50, "#00c853");
    drawCenteredBody("made by Ray Hernaez", 200, 20, "#363636ff");

    // Info button
    drawButton(buttons.infoButton.x, buttons.infoButton.y, buttons.infoButton.w, buttons.infoButton.h, "Info");
}

/**
 * Draw Info screen (instructions)
 */
// Draw info screen
function drawInfoScreen() {
    background("#e3f2fd");
    drawPond();

    drawCenteredTitle("Game Info", 70, 28, "#d56666ff");

    // Story text
    const story =
        "Froggy is the new Avatar and can bend all four elements: Water, Earth, Fire, Air. \n" +
        "He must stop pesky bugs before they reach the pond. \n\n" +
        "Match element to defeat each coloured bug. \n" +
        "Water 💦 against blue bugs 🦋 \n" +
        "Earth 🪨 against green bugs 🪲 \n" +
        "Fire 🔥 against red bugs 🐞 \n" +
        "Air 💨 against yellow bugs 🐝 \n\n" +
        "Controls: \n" +
        "Move Froggy with your mouse \n" +
        "and Click to attack!";

    const switchElem =
        "Switch elements by pressing keys: \n" +
        "W key (water 💦) \n" +
        "E key (earth 🪨) \n" +
        "F key (fire 🔥) \n" +
        "A key (air 💨)";

    push();
    textAlign(LEFT, TOP);
    textSize(16);
    textFont("Georgia");
    noStroke();
    fill(20);
    textLeading(22);
    text(story, 24, 120, width - 48, 400);
    text(switchElem, 350, 185, width - 48, 200);
    pop();

    // Back button
    drawButton(buttons.backButton.x, buttons.backButton.y, buttons.backButton.w, buttons.backButton.h, "Back");

    // Play button
    drawButton(buttons.playButton.x, buttons.playButton.y, buttons.playButton.w, buttons.playButton.h, "Play");
}

/**
 * Draws play screen (actual gameplay)
 */
function drawPlayScreen() {
    drawSky();
    drawPond();

    // Bug system
    keepActiveBugs();
    updateBugs();
    drawBugs();

    // Frog + attacks
    moveFrog();
    updateProjectiles();
    drawProjectiles();
    drawFrog();
    drawFrogEyes();

    // Small bug counter
    drawBugsLeftCounter();

    // Collisions
    checkProjectileBugCollisions();

    // If all 15 bugs are defeated
    if (bugsDefeated >= maxBugsTotal) {
        // Frog wins
        state = "win";
        // Start the 3s delay
        endStartTime = millis();
    }
}

/**
 * Draw end screen
 */
function drawEndScreen(bgColour, title, titleColour, body) {
    background(bgColour);
    drawPond();

    drawCenteredTitle(title, height / 2 - 20, 64, titleColour);
    drawCenteredBody(body, height / 2 + 30, 20, 255);

    // After 3s, show Play Again button
    if (millis() - endStartTime >= endDelay) {
        drawButton(buttons.playAgainButton.x, buttons.playAgainButton.y, buttons.playAgainButton.w, buttons.playAgainButton.h, "Play Again");
    }
}

/**
 * Draw Win screen
 */
function drawWinScreen() {
    const lastSky = skyColours[skyColours.length - 1];
    drawEndScreen(lastSky, "SUCCESS!", "#00e676", "Froggy has saved the pond from pesky bugs!");
}

/**
 * Draw Fail screen
 */
function drawFailScreen() {
    const lastSky = skyColours[skyColours.length - 1];
    drawEndScreen(lastSky, "FAIL!", "#ff5252", "A bug has reached the pond...");
}

/**
 * Keep 2 bugs on screen; max 15 bugs
 */
function keepActiveBugs() {
    while (bugs.length < maxActiveBugs && numberOfBugsSpawned < maxBugsTotal) {
        spawnBug();
    }
}

/**
 * Spawn a bug with random movement
 */
function spawnBug() {
    // Random bug emoji
    const type = random(bugTypes);
    // Random x
    const x = random(bugSpawnX, width - bugSpawnX);
    // Just above the top to keep smooth spawn
    const y = -bugSize;
    // Random speed
    const speedY = random(bugMinSpeed, bugMaxSpeed);

    const bug = {
        name: type.name,
        emoji: type.emoji,
        x,
        y,
        // Bug's center base x position
        baseX: x,
        speedY,
        size: bugSize,
        collision: bugHitRadius,
        // Movement is either buzz or zigzag
        movement: undefined,
        // 2 hits to defeat a bug
        hitsLeft: 2,
        // Countdown while hurt
        hurtFrames: 0,
        // Bug weakness
        weakTo: bugWeakness[type.name]
    };

    // If bug is yellow or red
    if (bug.name === "yellow" || bug.name === "red") {
        // It buzzes
        bug.movement = "buzz";
        // Adds shaky movement
        bug.shake = 3.5;
    }
    // If bug is blue or green
    else if (bug.name === "blue" || bug.name === "green") {
        // It zigzags
        bug.movement = "zigzag";
        // Adds sideway speed
        bug.speedX = random(1, 2);
        // Adds min-max x position that it travels based on its center position
        bug.minX = bug.baseX - 50;
        bug.maxX = bug.baseX + 50;
    }

    // Add new bug in array
    bugs.push(bug);
    // Increase number of bugs spawned by 1
    numberOfBugsSpawned += 1;
}

/**
 * Checks if bug reached the pond
 */
function bugReachedPond(bug) {
    if (bug.y >= height - 60) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Update bugs
 */
function updateBugs() {
    for (let i = bugs.length - 1; i >= 0; i--) {
        const newBug = bugs[i];

        // Skrink countdown
        if (newBug.hurtFrames > 0) {
            newBug.hurtFrames -= 1;
        }

        // if bug reaches the pond
        if (bugReachedPond(newBug)) {
            // You failed
            state = "fail";
            endStartTime = millis();
            // Stop updating...
            return;
        }

        // Slowly descent
        newBug.y += newBug.speedY;

        // If bug is buzzing
        if (newBug.movement === "buzz") {
            // Make it buzz!
            newBug.x += random(-newBug.shake, newBug.shake);
            newBug.y += random(-newBug.shake, newBug.shake);
            // Keep inside canvas
            newBug.x = constrain(newBug.x, bugSpawnX, width - bugSpawnX);
        }
        // If bug is zagzagging
        else if (newBug.movement === "zigzag") {
            // Make it move sideways
            newBug.x += newBug.speedX;
            // If it hits constrains x position
            if (newBug.x < newBug.minX || newBug.x > newBug.maxX) {
                // It goes back
                newBug.speedX *= -1;
                // Keep it constrained!
                newBug.x = constrain(newBug.x, newBug.minX, newBug.maxX);
            }
        }

        // Remove if bug leaves the bottom screen
        if (newBug.y > height + newBug.size) {
            bugs.splice(i, 1);
        }
    }
}

/**
 * Get bug size
 */
function getBugSize(bug) {
    if (bug.hurtFrames > 0) {
        // Shrink
        return 0.5;
    }
    else {
        // Normal size
        return 1;
    }
}

/**
 * Draw bugs
 */
function drawBugs() {
    push();
    textAlign(CENTER, CENTER);
    noStroke();
    for (let i = 0; i < bugs.length; i++) {
        const newBug = bugs[i];
        const size = getBugSize(newBug);
        textSize(newBug.size * size);
        text(newBug.emoji, newBug.x, newBug.y);
    }
    pop();
}

/**
 * Launch an elemental projectile
 */
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

/**
 * Update projectiles
 */
function updateProjectiles() {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        const projectile = projectiles[i];
        projectile.y += projectile.speed;
        if (projectile.y < -projectile.size) {
            // Remove projectile
            projectiles.splice(i, 1);
        }
    }
}

/**
 * Draw projectiles
 */
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

/**
 * Check projectile + bug collision
 */
function checkProjectileBugCollisions() {
    for (let i = bugs.length - 1; i >= 0; i--) {
        const newBug = bugs[i];
        for (let j = projectiles.length - 1; j >= 0; j--) {
            const projectile = projectiles[j];
            const distance = dist(projectile.x, projectile.y, newBug.x, newBug.y);
            if (distance < projectile.collision + newBug.collision) {
                // Remove projectile
                projectiles.splice(j, 1);

                // Hit only if element matches bug's weakness
                if (projectile.element === newBug.weakTo) {
                    // Update hitsLeft if hit
                    newBug.hitsLeft -= 1;
                    // Trigger bug shrinking
                    newBug.hurtFrames = hurtFrames;

                    // If bug is hit twice
                    if (newBug.hitsLeft <= 0) {
                        // Bug is a goner
                        bugs.splice(i, 1);
                        // Record bug kill
                        bugsDefeated = constrain(bugsDefeated + 1, 0, maxBugsTotal);
                    }
                }
                // Move to next bug
                break;
            }
        }
    }
    // Keep 2 bugs
    keepActiveBugs();
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Draws the frog
 */
function drawFrog() {
    // Draw the frog's body
    push();
    fill(frog.skinColour);
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * Draw frog's eyes
 */
function drawFrogEyes() {
    // Relative to frog's body
    const eyeRadius = frog.body.size * 0.18;
    const pupilRadius = eyeRadius * 0.45;
    const spaceBetweenEyes = frog.body.size * 0.38;
    const eyeY = frog.body.y - frog.body.size * 0.25;

    const leftX = frog.body.x - spaceBetweenEyes / 2;
    const rightX = frog.body.x + spaceBetweenEyes / 2;

    const squint = (state === "play" && mouseIsPressed); //condition

    if (squint) {
        // Draw squint eyes ><
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
    }
    else {
        drawEyeWithPupil(leftX, eyeY, eyeRadius, pupilRadius);
        drawEyeWithPupil(rightX, eyeY, eyeRadius, pupilRadius);
    }
}

/**
 * Draws pupil
 */
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
 * Reset everything to start a fresh game
 */
function resetGame() {
    state = "title";
    bugs = [];
    projectiles = [];
    numberOfBugsSpawned = 0;
    bugsDefeated = 0;
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
            // Start new game
            bugs = [];
            projectiles = [];
            // Reset total spawn
            numberOfBugsSpawned = 0;
            bugsDefeated = 0;
            keepActiveBugs();
        }
    }
    // if we're on play screen
    else if (state === "play") {
        launchProjectile();
    }
    else if (state === "win" || state === "fail") {
        // Only click Play Again button after 3 seconds
        if (millis() - endStartTime >= endDelay) {
            if (mouseTouchingButton(mouseX, mouseY, buttons.playAgainButton.x, buttons.playAgainButton.y, buttons.playAgainButton.w, buttons.playAgainButton.h)) {
                resetGame();
            }
        }
    }
}

/**
 * Handles key pressed
 */
function keyPressed() {
    const pressed = elementByKey(key.toLowerCase());
    if (pressed) {
        frog.element = pressed;
        frog.skinColour = pressed.skinColour;
    }
}