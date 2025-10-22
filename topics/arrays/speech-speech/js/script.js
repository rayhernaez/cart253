/**
 *Speech! Speech!
 * Ray Hernaez
 * 
 * Interactive speech-playing interface
 */

"use strict";

// The speech itself
const speech = ["Veni.", "Vidi.", "Vici.", "Sensi malum."];
// Which sentence in the speech to display
let speechIndex = 0;

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(600, 100);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    // Get the current line of the speech
    let currentLine = speech[speechIndex];

    // DIsplay the line
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentLine, width / 2, height / 2);
    pop();
}

function mousePressed() {
    speechIndex++;
    // handle end of speech
    if (speechIndex >= speech.length) {
        // startover
        speechIndex = 0;
    }
}