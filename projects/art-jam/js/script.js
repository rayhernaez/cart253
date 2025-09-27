/**
 * Art Jam
 * Ray Hernaez
 * 
 * My Self Portrait using p5
 */

"use strict";

// Head info
const head = {
    x: 300,
    y: 250,
    width: 200,
    height: 240,
}

// Draggable state of cookie & spider
let cookie = {
    x: 100,
    y: 90,
    r: 40,
};
let spider = {
    x: 510,
    y: 90,
    r: 30,
};
let dragging = null;
let grabOffsetX = 0;
let grabOffsetY = 0;
let isSmiling = false;
let isSad = false;

let bgImage = undefined;

// Load Halloween Background image
function preload() {
    bgImage = loadImage("assets/images/halloween-bg.png");
}

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(600, 600);
}

/**
 * Draws my self-portrait art
*/
function draw() {
    // DELETE LATER - SHOW MOUSE COORDINATES
    console.log(mouseX, mouseY);

    drawBackground();
    drawTorso();
    drawNeck();

    // Update mouth states before drawing head/mouth
    isSmiling = cookieTouchingHead();
    isSad = spiderTouchingHead();

    // Text above head
    drawText();

    drawHead();
    drawCookie();
    drawSpider();
}

// Pressing using the mouse
function mousePressed() {
    // If cookie is pressed
    if (dist(mouseX, mouseY, cookie.x, cookie.y) <= cookie.r) {
        dragging = "cookie";
        grabOffsetX = mouseX - cookie.x;
        grabOffsetY = mouseY - cookie.y;
        return;
    }
    // If spider is pressed
    else if (dist(mouseX, mouseY, spider.x, spider.y) <= spider.r) {
        dragging = "spider";
        grabOffsetX = mouseX - spider.x;
        grabOffsetY = mouseY - spider.y;
        return;
    }
    else {
        dragging = null;
    }
}

// Dragging using the mouse
function mouseDragged() {
    // If mouse is dragging cookie
    if (dragging === "cookie") {
        cookie.x = constrain(mouseX - grabOffsetX, cookie.r, width - cookie.r);
        cookie.y = constrain(mouseY - grabOffsetY, cookie.r, height - cookie.r);
    }
    // If mouse is dragging spider
    else if (dragging === "spider") {
        // Added padding to keep legs visible in the canvas
        const spiderPadding = 50;
        spider.x = constrain(mouseX - grabOffsetX, spiderPadding, width - spiderPadding);
        spider.y = constrain(mouseY - grabOffsetY, spiderPadding, height - spiderPadding);
    }
}

// Releasing the mouse
function mouseReleased() {
    dragging = null;
}

// Draws the background
function drawBackground() {
    // Draw background image to fill the canvas
    image(bgImage, 0, 0);

    // background("#e5e5e5ff");
}

// Draws Torso + Shirt
function drawTorso() {
    push();
    noStroke();
    fill("#ee7373ff");
    triangle(300, 390, 150, 450, 450, 450);
    rect(150, 450, 300, 150);
    triangle(150, 450, 150, 600, 100, 600);
    triangle(450, 450, 450, 600, 500, 600);
    pop();

    // Shirt lines
    push();
    stroke("#d16666ff");
    strokeWeight(5);
    line(190, 530, 190, 600);
    line(410, 530, 410, 600);
    pop();
}

// Draws Neck
function drawNeck() {
    push();
    noStroke();
    fill("#c5a591ff");
    rect(270, 355, 60, 50);
    triangle(270, 405, 330, 405, 300, 450);
    pop();
}

// Draws Text above head
function drawText() {
    // Neutral message text
    let message = "Trick or treat!\nWhich one will you give me?";
    // If smiling
    if (isSmiling) {
        message = "That looks yummy!\nThanks for the treat!";
    }
    // If sad
    else if (isSad) {
        message = "Uh no thanks?\nKeep it to yourself.";
    }

    push();
    // noStroke();
    strokeWeight(7);
    stroke("black");
    textAlign(CENTER, BOTTOM);
    textSize(20);
    fill("white");
    text(message, head.x, 70);
    pop();
}

// Draws Head - Face body parts + Hair
function drawHead() {

    // Draw Ears
    push();
    noStroke();
    fill("#c5a591ff");

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

    // Draw Head
    push();
    noStroke();
    fill("#d8b59fff");
    ellipse(head.x, head.y, head.width, head.height);
    pop();

    // Draw Eyes
    // Eyeballs
    push();
    // noStroke();
    fill("#ffffffff");
    arc(260, 260, 50, 40, 0, -PI, CHORD);
    arc(340, 260, 50, 40, 0, -PI, CHORD);
    pop();

    // Pupils
    // push();
    // noStroke();
    // fill("#5d3f2eff");
    // ellipse(260, 270, 15);
    // ellipse(340, 270, 15);
    // pop();

    push();
    noStroke();
    fill("#5d3f2eff");
    drawPupil(260, 270, 15, 50);
    drawPupil(340, 270, 15, 50);
    pop();

    // Draw Nose
    push();
    stroke("#5d3f2eff");
    line(305, 290, 310, 310);
    line(310, 310, 305, 315);
    pop();

    // Draw Mouth
    push();
    stroke("#d48587ff");
    strokeWeight(5);
    noFill();

    // Smile when cookie touches head
    if (isSmiling) {
        // Draw a smile
        arc(300, 330, 40, 20, 0, PI, OPEN);
    }
    // Sad when spider touches head
    else if (isSad) {
        // Draw sad mouth
        arc(300, 340, 40, 20, PI, TWO_PI, OPEN);
    }
    // If no cookie/spider on head
    else {
        // Draw neutral mouth
        line(290, 340, 310, 340);
    }
    pop();

    // Draw Hair
    push();
    noStroke();
    fill("#46413eff");

    arc(300, 205, 200, 150, -PI, 0, CHORD);

    // Bangs
    triangle(200, 205, 250, 205, 225, 240);
    triangle(250, 205, 300, 205, 275, 240);
    triangle(300, 205, 350, 205, 325, 240);
    triangle(350, 205, 400, 205, 375, 240);

    pop();
}

// Draw Pupils - Tracking Mouse Cursor
function drawPupil(x, y, pupilDiam, eyeWidth) {
    let pupilRadius = pupilDiam / 2;
    let range = eyeWidth / 2 - pupilRadius - 5;
    let xOffset = constrain(mouseX - x, -range, range);
    let yOffset = constrain(y - mouseY, 0, 2);
    ellipse(x + xOffset, y - yOffset, pupilDiam);
}

// Draws Cookie - Biscuit + Chips
function drawCookie() {
    push();
    noStroke();

    // Biscuit
    fill("#a67e5dff");
    ellipse(cookie.x, cookie.y, cookie.r * 2);

    // Chips
    fill("#684c34ff");
    ellipse(cookie.x - 20, cookie.y - 10, 10);
    ellipse(cookie.x + 5, cookie.y - 25, 8);
    ellipse(cookie.x - 8, cookie.y + 15, 8);
    ellipse(cookie.x + 15, cookie.y - 5, 10);
    ellipse(cookie.x + 15, cookie.y + 18, 5);

    pop();
}

// Draws Spider - Head + Body + Legs
function drawSpider() {
    push();

    // Translate from original coordinates to new coordinates
    translate(spider.x - 510, spider.y - 90);

    noFill();
    stroke(0);
    strokeWeight(3);

    // Legs
    beginShape();
    vertex(495, 90);
    quadraticVertex(470, 90, 470, 60);
    endShape();

    beginShape();
    vertex(500, 90);
    quadraticVertex(480, 95, 470, 105);
    endShape();

    beginShape();
    vertex(500, 95);
    quadraticVertex(480, 110, 480, 120);
    endShape();

    beginShape();
    vertex(500, 100);
    quadraticVertex(490, 125, 500, 135);
    endShape();

    beginShape();
    vertex(525, 90);
    quadraticVertex(550, 90, 550, 60);
    endShape();

    beginShape();
    vertex(520, 90);
    quadraticVertex(540, 95, 550, 105);
    endShape();

    beginShape();
    vertex(520, 95);
    quadraticVertex(540, 110, 540, 120);
    endShape();

    beginShape();
    vertex(520, 100);
    quadraticVertex(530, 125, 520, 135);
    endShape();

    // Head + Body
    noStroke();
    fill("#353535ff");
    ellipse(510, 80, 40);
    ellipse(510, 100, 20);

    // Eyes
    fill("#c1a674ff");
    ellipse(507, 105, 3);
    ellipse(513, 105, 3);

    pop();
}

// Does cookie touch head?
function cookieTouchingHead() {

    // Using y radius as head circle
    const headRadius = head.height / 2;

    // If cookie and head are touching
    if (dist(cookie.x, cookie.y, head.x, head.y) <= headRadius + cookie.r) {
        return true;
    }
}

// Does spider touch head?
function spiderTouchingHead() {

    // Using y radius as head circle
    const headRadius = head.height / 2;

    // If spider and head are touching
    if (dist(spider.x, spider.y, head.x, head.y) <= headRadius + spider.r) {
        return true;
    }
}