/**
 * Art Jam
 * Ray Hernaez
 * 
 * Interactive Self-Portrait
 * - Cookie and spider are draggable
 * - Eyes follow mouse
 * - Smile when cookie touches head
 * - Sad when spider touches head
 * 
 * Uses:
 * p5.js
 * https://p5js.org
 */

"use strict";

// Canvas
const canvas = {
    w: 600,
    h: 600
};

// Head
const head = {
    x: 300,
    y: 250,
    w: 200,
    h: 240
};

// Head radius
const headRadius = head.h / 2;

// Eyes
const eyes = {
    left: {
        x: 260,
        y: 260,
        w: 50,
        h: 40,
        pupilY: 270
    },
    right: {
        x: 340,
        y: 260,
        w: 50,
        h: 40,
        pupilY: 270
    },
    pupilDiameter: 15
};

// Mouth
const mouth = {
    x: 300,
    neutralY: 340,
    smileY: 330,
    sadY: 340,
    w: 40,
    h: 20
};

// Spider anchor to coordinate body + legs
const spiderAnchor = {
    x: 510,
    y: 90
};

// Keeps legs visible on canvas
const spiderPadding = 50;

// Text position
const textY = 70;

// Colour palette
const colours = {
    skin: "#d8b59fff",
    skinShadow: "#c5a591ff",
    shirt: "#ee7373ff",
    shirtLine: "#d16666ff",
    hair: "#46413eff",
    eyeWhite: "#ffffffff",
    pupil: "#5d3f2eff",
    mouth: "#d48587ff",
    bgColour: "#e5e5e5ff",
    cookie: "#a67e5dff",
    chip: "#684c34ff",
    spiderBody: "#353535ff",
    spiderEye: "#c1a674ff",
    textFill: "#ffffff",
    textStroke: "#000000"
};

// Draggable state of cookie
let cookie = {
    x: 110,
    y: 160,
    r: 40
};

// Draggable state of spider
let spider = {
    x: 490,
    y: 160,
    r: 30
};

// Dragging "cookie" or "spider"; else null
let dragging = null;
let grabOffsetX = 0;
let grabOffsetY = 0;

// Checks if I'm smiling, or sad, or neither
let isSmiling = false;
let isSad = false;

// Background image will be loaded
let backgroundImage = undefined;

// Load Halloween Background image
function preload() {
    backgroundImage = loadImage("assets/images/halloween-bg.png");
}

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(canvas.w, canvas.h);
}

/**
 * Draws my self-portrait artwork
*/
function draw() {
    // Back layers
    drawBackground();
    drawTorso();
    drawNeck();

    // Update expression before drawing mouth
    isSad = spiderTouchingHead();
    isSmiling = cookieTouchingHead();

    // Text above head
    drawText();

    // Front layers
    drawHead();
    drawCookie();
    drawSpider();
}

/**
 * Pressing using the mouse
 */
function mousePressed() {
    // If cookie is pressed
    if (dist(mouseX, mouseY, cookie.x, cookie.y) <= cookie.r) {
        // Change null to "cookie"
        dragging = "cookie";
        // Cursor grabs cookie
        grabOffsetX = mouseX - cookie.x;
        grabOffsetY = mouseY - cookie.y;
    }
    // If spider is pressed
    else if (dist(mouseX, mouseY, spider.x, spider.y) <= spider.r) {
        // Change null to "spider"
        dragging = "spider";
        // Cursor grabs spider
        grabOffsetX = mouseX - spider.x;
        grabOffsetY = mouseY - spider.y;
    }
    else {
        // Keep it null
        dragging = null;
    }
}

/**
 * Dragging using the mouse
 */
function mouseDragged() {
    // If mouse is dragging cookie
    if (dragging === "cookie") {
        // Move cookie as user drags across within canvas
        cookie.x = constrain(mouseX - grabOffsetX, cookie.r, width - cookie.r);
        cookie.y = constrain(mouseY - grabOffsetY, cookie.r, height - cookie.r);
    }
    // If mouse is dragging spider
    else if (dragging === "spider") {
        // Move spider as user drags across within canvas
        spider.x = constrain(mouseX - grabOffsetX, spiderPadding, width - spiderPadding);
        spider.y = constrain(mouseY - grabOffsetY, spiderPadding, height - spiderPadding);
    }
}

/**
 * Released the mouse
 */
function mouseReleased() {
    // Back to null
    dragging = null;
}

/**
 * Draws background
 */
function drawBackground() {
    // Check if backgroundImage is undefined
    if (backgroundImage === undefined) {
        // Set to bgColour
        background(colours.bgColour);
    }
    // If image is loaded
    else {
        // Draw background image to fill the canvas
        image(backgroundImage, 0, 0, width, height);
    }
}

/**
 * Draws Torso
 */
function drawTorso() {
    // Shirt
    push();
    noStroke();
    fill(colours.shirt);
    triangle(300, 390, 150, 450, 450, 450);
    rect(150, 450, 300, 150);
    triangle(150, 450, 150, 600, 100, 600);
    triangle(450, 450, 450, 600, 500, 600);
    pop();

    // Shirt lines
    push();
    stroke(colours.shirtLine);
    strokeWeight(5);
    line(190, 530, 190, 600);
    line(410, 530, 410, 600);
    pop();
}

/**
 * Draws Neck
 */
function drawNeck() {
    push();
    noStroke();
    fill(colours.skinShadow);
    rect(270, 355, 60, 50);
    triangle(270, 405, 330, 405, 300, 450);
    pop();
}

/**
 * Draws Text above head
 */
function drawText() {
    // Neutral message text
    let message = "Trick or treat!\nWhich one will you give me?";
    // If sad
    if (isSad) {
        message = "Uh no thanks?\nKeep it to yourself.";
    }
    // If smiling
    else if (isSmiling) {
        message = "That looks yummy!\nThanks for the treat!";
    }

    // Text info
    push();
    strokeWeight(7);
    stroke(colours.textStroke);
    textAlign(CENTER, BOTTOM);
    textSize(20);
    fill(colours.textFill);
    text(message, head.x, textY);
    pop();
}

/**
 * Draws Head
 */
function drawHead() {
    // Ears
    push();
    noStroke();
    fill(colours.skinShadow);
    // Right ear
    beginShape();
    vertex(395, 245);
    bezierVertex(430, 225, 420, 290, 390, 285);
    endShape();
    // Left ear
    beginShape();
    vertex(205, 245);
    bezierVertex(170, 225, 180, 290, 210, 285);
    endShape();
    pop();

    // Draw Head shape
    push();
    noStroke();
    fill(colours.skin);
    ellipse(head.x, head.y, head.w, head.h);
    pop();

    // Eyeballs
    push();
    fill(colours.eyeWhite);
    // Left eye
    arc(eyes.left.x, eyes.left.y, eyes.left.w, eyes.left.h, 0, -PI, CHORD);
    // Right eye
    arc(eyes.right.x, eyes.right.y, eyes.right.w, eyes.right.h, 0, -PI, CHORD);
    pop();

    // Pupils
    push();
    noStroke();
    fill(colours.pupil);
    // Call drawPupil() to track mouse cursor
    drawPupil(eyes.left.x, eyes.left.pupilY, eyes.pupilDiameter, eyes.left.w);
    drawPupil(eyes.right.x, eyes.right.pupilY, eyes.pupilDiameter, eyes.right.w);
    pop();

    // Draw Nose
    push();
    stroke(colours.pupil);
    line(305, 290, 310, 310);
    line(310, 310, 305, 315);
    pop();

    // Draw Mouth
    push();
    stroke(colours.mouth);
    strokeWeight(5);
    noFill();

    // Sad when spider touches head
    if (isSad) {
        // Draw sad mouth
        arc(mouth.x, mouth.sadY, mouth.w, mouth.h, PI, TWO_PI, OPEN);
    }
    // Smile when cookie touches head
    else if (isSmiling) {
        // Draw a smile
        arc(mouth.x, mouth.smileY, mouth.w, mouth.h, 0, PI, OPEN);
    }
    // If no cookie/spider on head
    else {
        // Draw neutral mouth
        line(mouth.x - 10, mouth.neutralY, mouth.x + 10, mouth.neutralY);
    }
    pop();

    // Draw Hair
    push();
    noStroke();
    fill(colours.hair);
    // Top hair
    arc(300, 205, 200, 150, -PI, 0, CHORD);
    // Bangs
    triangle(200, 205, 250, 205, 225, 240);
    triangle(250, 205, 300, 205, 275, 240);
    triangle(300, 205, 350, 205, 325, 240);
    triangle(350, 205, 400, 205, 375, 240);
    pop();
}

/**
 * Draws Pupils that track mouse cursor
 */
function drawPupil(x, y, pupilDiameter, eyeWidth) {
    // Pupil stays inside white eyeball
    let pupilRadius = pupilDiameter / 2;
    let range = eyeWidth / 2 - pupilRadius - 5;
    let xOffset = constrain(mouseX - x, -range, range);
    let yOffset = constrain(y - mouseY, 0, 2);
    ellipse(x + xOffset, y - yOffset, pupilDiameter);
}

/**
 * Draws cookie
 */
function drawCookie() {
    push();
    noStroke();
    // Biscuit
    fill(colours.cookie);
    ellipse(cookie.x, cookie.y, cookie.r * 2);
    // Chips
    fill(colours.chip);
    ellipse(cookie.x - 20, cookie.y - 10, 10);
    ellipse(cookie.x + 5, cookie.y - 25, 8);
    ellipse(cookie.x - 8, cookie.y + 15, 8);
    ellipse(cookie.x + 15, cookie.y - 5, 10);
    ellipse(cookie.x + 15, cookie.y + 18, 5);
    pop();
}

/**
 * Draws spider
 */
function drawSpider() {
    push();
    // Move from original coordinates to new coordinates
    translate(spider.x - spiderAnchor.x, spider.y - spiderAnchor.y);
    // Legs
    noFill();
    stroke(0);
    strokeWeight(3);
    // Leg 1
    beginShape();
    vertex(495, 90);
    quadraticVertex(470, 90, 470, 60);
    endShape();
    // Leg 2
    beginShape();
    vertex(500, 90);
    quadraticVertex(480, 95, 470, 105);
    endShape();
    // Leg 3
    beginShape();
    vertex(500, 95);
    quadraticVertex(480, 110, 480, 120);
    endShape();
    // Leg 4
    beginShape();
    vertex(500, 100);
    quadraticVertex(490, 125, 500, 135);
    endShape();
    // Leg 5
    beginShape();
    vertex(525, 90);
    quadraticVertex(550, 90, 550, 60);
    endShape();
    // Leg 6
    beginShape();
    vertex(520, 90);
    quadraticVertex(540, 95, 550, 105);
    endShape();
    // Leg 7
    beginShape();
    vertex(520, 95);
    quadraticVertex(540, 110, 540, 120);
    endShape();
    // Leg 8
    beginShape();
    vertex(520, 100);
    quadraticVertex(530, 125, 520, 135);
    endShape();
    // Soider body
    noStroke();
    fill(colours.spiderBody);
    ellipse(510, 80, 40);
    // Spider head
    ellipse(510, 100, 20);
    // Spider eyes
    fill(colours.spiderEye);
    ellipse(507, 105, 3);
    ellipse(513, 105, 3);
    pop();
}

/**
 * Checks if cookie is touching head
 */
function cookieTouchingHead() {
    // If cookie and head are touching
    if (dist(cookie.x, cookie.y, head.x, head.y) <= headRadius + cookie.r) {
        // Returns "true"
        return true;
    }
}

/**
 * Checks if spider is touching head
 */
function spiderTouchingHead() {
    // If spider and head are touching
    if (dist(spider.x, spider.y, head.x, head.y) <= headRadius + spider.r) {
        // Returns true
        return true;
    }
}