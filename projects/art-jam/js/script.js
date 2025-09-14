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
    // DELETE LATER - SHOW MOUSE COORDINATES
    console.log(mouseX, mouseY);

    background("#e5e5e5ff");

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
    line(290, 340, 310, 340);
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