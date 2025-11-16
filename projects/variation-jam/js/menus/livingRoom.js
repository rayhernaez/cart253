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
    // background("green");

    // console.log(mouseX, mouseY);

    updateCursor([erickHitBox, pengHitBox, toriHitBox]);
    drawElement([bgImage, erickStanding, pengStanding, toriStanding]);

    // updateCursor([erickHitBox, pengHitBox, toriHitBox, hawkHitBox]);
    // drawElement([bgImage, erickStanding, pengStanding, toriStanding, hawkStanding]);
}

/**
 * This will be called whenever the mouse is pressed while the living room is active
 */
function livingRoomMousePressed() {
    // If mouse touches Erick
    if (mouseTouchesHitBox(erickHitBox)) {
        // Go to erick interview
        state = "erick";
    }
    // If mouse touches Peng
    else if (mouseTouchesHitBox(pengHitBox)) {
        // Go to peng interview
        state = "peng";
    }
    // If mouse touches Tori
    else if (mouseTouchesHitBox(toriHitBox)) {
        // Go to tori interview
        state = "tori";
    }
    // // If mouse touches Hawk
    // else if (mouseTouchesHitBox(hawkHitBox)) {
    //     // Go to hawk interview
    //     state = "hawk";
    // }
}