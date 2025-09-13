/**
 * Art Jam
 * Ray Hernaez
 * 
 * My Self Portrait using p5
 */

"use strict";

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
    background("#e5e5e5ff");

    // Draw Head
    push();
    noStroke();
    fill("#d8b59fff");
    ellipse(300, 250, 200, 240);
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
    push();
    noStroke();
    fill("#5d3f2eff");
    ellipse(260, 270, 15);
    ellipse(340, 270, 15);
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
    line(290, 330, 310, 330);
    pop();
}