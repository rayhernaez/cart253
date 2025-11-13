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

const logoFloatPX = 10;
const logoFloatSpeed = 0.05;

/**
 * Display the main menu
 */
function menuDraw() {
    // console.log(mouseX, mouseY);

    updateCursor([storyBtnHitBox, instructionsBtnHitBox]);

    drawElement([bgImage, logo, storyBtn, instructionsBtn]);
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    // If mouse touches Story Button
    if (mouseTouchesHitBox(storyBtnHitBox)) {
        // Go to story page
        state = "story";
        checkedStory = true;
    }
    // If mouse touches Instructions Button
    else if (mouseTouchesHitBox(instructionsBtnHitBox)) {
        // Go to instructions page
        state = "instructions";
        checkedInstructions = true;
    }
}