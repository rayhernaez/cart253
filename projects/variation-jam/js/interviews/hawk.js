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

// const textStory =
//     "~ STORY ~\n\n\n" +
//     "Hawk is missing!\n\nThe family is sure he floated off with the silver balloon, but nothing makes sense. As the interviewer, your job is to listen closely and gather the pieces. Talk to each family member and see what they remember.";

/**
 * Display the hawk interview
 */
function hawkDraw() {
    background('blue');
    // console.log(mouseX, mouseY);

    // updateCursor([backBtnHitBox, playBtnHitBox]);

    // // If user have read both story and instructions
    // if (checkedStory && checkedInstructions) {
    //     drawElement([bgImage, panel, backBtn, playBtn]);
    // }
    // else {
    //     drawElement([bgImage, panel, backBtn]);
    // }

    // drawText(textStory, panel);
}

/**
 * This will be called whenever the mouse is pressed while the hawk interview is active
 */
function hawkMousePressed() {
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