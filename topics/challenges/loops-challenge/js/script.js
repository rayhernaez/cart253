/**
 * Lines
 * Ray Hernaez
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws lines across the canvas with increasing thickness and
 * gradually lightening colour
 */
function draw() {
    // background("pink");

    // STEP 4
    for (let posX = 0; posX < width; posX++) {
        // 50 & 255 to make the lines from steps 2 & 3 visible
        let colourX = map(posX, 0, width, 50, 205);

        push();
        stroke(colourX);
        line(posX, 0, posX, height);
        pop();
    }

    // STEP 2
    let colour = 0;
    let x = 0;
    let gapColour = 25;
    let gapX = 50;

    while (x <= width) {
        push();
        stroke(colour);
        line(x, 0, x, height);
        pop();

        colour += gapColour;
        x += gapX;
    }

    // STEP 3
    let colourY = 0;
    let y = 0;
    let gapColourY = 25;
    let gapY = 50;

    while (y <= height) {
        push();
        stroke(colourY);
        line(0, y, width, y);
        pop();

        colourY += gapColourY;
        y += gapY;
    }

    // stroke(0);
    // line(0, 0, 0, height);

    // stroke(25);
    // line(50, 0, 50, height);

    // stroke(50);
    // line(100, 0, 100, height);

    // stroke(75);
    // line(150, 0, 150, height);

    // stroke(100);
    // line(200, 0, 200, height);

    // stroke(125);
    // line(250, 0, 250, height);

    // stroke(150);
    // line(300, 0, 300, height);

    // stroke(175);
    // line(350, 0, 350, height);

    // stroke(200);
    // line(400, 0, 400, height);

    // stroke(225);
    // line(450, 0, 450, height);

    // stroke(250);
    // line(500, 0, 500, height);
}