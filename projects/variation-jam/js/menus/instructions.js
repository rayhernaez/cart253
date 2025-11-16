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

const textInstructions =
    "~ INSTRUCTIONS ~\n\n\n" +
    "Tap the person you want to talk to\n" +
    "Pay attention to little details\n" +
    "Finish all three interviews";

/**
 * Display the instructions page
 */
function instructionsDraw() {
    // console.log(mouseX, mouseY);

    updateCursor([backBtnHitBox, playBtnHitBox]);

    // If user have read both story and instructions
    if (checkedStory && checkedInstructions) {
        drawElement([bgImage, panel, backBtn, playBtn]);
    }
    else {
        drawElement([bgImage, panel, backBtn]);
    }

    drawText(textInstructions, panel);
}

/**
 * This will be called whenever the mouse is pressed while the instructions page is active
 */
function instructionsMousePressed() {
    // If mouse touches Back Button
    if (mouseTouchesHitBox(backBtnHitBox)) {
        // Go to main menu
        state = "menu";
    }
    else if (mouseTouchesHitBox(playBtnHitBox) && checkedStory && checkedInstructions) {
        // Go to living room
        state = "living room";
    }
}