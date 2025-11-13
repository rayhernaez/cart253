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

/**
 * Display the living room
 */
function livingRoomDraw() {
    background("green");

    // console.log(mouseX, mouseY);

    // updateCursor([backBtnHitBox, playBtnHitBox]);

    // drawElement(bgImage);
    // drawElement(backBtn);
    // drawElement(playBtn);
}

/**
 * This will be called whenever the mouse is pressed while the living room is active
 */
function livingRoomMousePressed() {
    // If mouse touches Back Button
    if (mouseTouchesHitBox(backBtnHitBox)) {
        // Go to main menu
        state = "menu";
    }
    else if (mouseTouchesHitBox(playBtnHitBox)) {
        // Go to living room
        state = "living room";
    }
}