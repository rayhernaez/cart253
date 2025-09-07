/**
 * Starter House
 * Pippin Barr
 * 
 * Draws a house with shapes.
 * 
 * Disclaimer: Not actually my house.
 * 
 * Uses:
 * p5.js
 * https://p5js.org/
 */

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(640, 480);
}

/**
 * Draws a house and its immediate environment
 */
function draw() {
    drawSky();
    drawCloud();
    drawGround();
    drawHouse();
}

/**
 * Displays a blue sky
 */
function drawSky() {
    background(150, 200, 250);
}

/**
 * Draws a fluffy white cloud
 */
function drawCloud() {
    push();
    noStroke();
    // Note: using a single number for a colour will be greyscale
    // (As if you used the same number for R, G, and B)
    // So this is white:
    fill(255);
    ellipse(100, 100, 100, 100);
    ellipse(180, 80, 100, 100);
    ellipse(160, 120, 60, 60);
    ellipse(190, 130, 60, 60);
    ellipse(220, 120, 60, 60);
    pop();
}

/**
 * Draws the ground
 */
function drawGround() {
    push();
    noStroke();
    fill(200);
    rect(0, 400, 640, 480);
    pop();
}

/**
 * Draws the house with a window, door, roof, etc.
 */
function drawHouse() {
    drawHouseBody();
    drawHouseRoof();
    drawHouseWindow();
    drawHouseDoor();
}

/**
 * Draws the body of the house
 */
function drawHouseBody() {
    push();
    noStroke();
    fill(250, 250, 200);
    rect(200, 240, 280, 180);
    pop();
}

/**
 * Draws the roof of the house
 */
function drawHouseRoof() {
    push();
    noStroke();
    // You can also write colors in hex code in quote marks
    fill("#dc143c");
    triangle(180, 240, 340, 120, 500, 240);
    pop();
}

/**
 * Draws the window of the house
 */
function drawHouseWindow() {
    push();
    // You can also write colour names from the CSS standard in quotes
    // https://www.w3.org/wiki/CSS/Properties/color/keywords
    stroke("deeppink");
    strokeWeight(5);
    fill("blanchedalmond");
    rect(220, 260, 80, 80);
    pop();
}

/**
 * Draws the door and doorknob of the house
 */
function drawHouseDoor() {
    // The door
    push();
    noStroke();
    fill(0, 128, 0);
    rect(320, 300, 80, 120);
    pop();

    // The doorknob
    push();
    noStroke();
    fill(255, 215, 0);
    ellipse(340, 360, 10, 10);
    pop();
}