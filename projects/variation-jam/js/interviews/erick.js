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
 * Display the erick interview
 */
function erickDraw() {
    // background('yellow');
    // console.log(mouseX, mouseY);

    drawElement([bgImage, erickInterview, dialogsJSON.ERICK]);

    if (!dialogue.active) {
        startDialog(dialogsJSON.ERICK);
    }

    drawElement([dialogPanel]);
    drawText(currentLine(), dialogPanel);
    updateCursor([getDialogPanelSize()]);

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
 * This will be called whenever the mouse is pressed while the erick interview is active
 */
function erickMousePressed() {
    // If mouse touches Dialog Panel
    if (mouseInDialogPanel()) {
        // Show next dialog line
        advanceDialog();
    }
    // // If mouse touches Back Button
    // if (mouseTouchesHitBox(backBtnHitBox)) {
    //     // Go to main menu
    //     state = "menu";
    // }
    // else if (mouseTouchesHitBox(playBtnHitBox) && checkedStory && checkedInstructions) {
    //     // Go to living room
    //     state = "living room";
    // }
}