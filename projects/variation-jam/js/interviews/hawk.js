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
 * Display the hawk interview
 */
function hawkDraw() {
    drawElement([bgImage, hawkInterview, dialogsJSON.HAWK]);

    if (!dialogue.active) {
        startDialog(dialogsJSON.HAWK);
    }

    drawElement([dialogPanel]);
    drawText(currentLine(), dialogPanel);
    updateCursor([getDialogPanelSize()]);
}

/**
 * This will be called whenever the mouse is pressed while the hawk interview is active
 */
function hawkMousePressed() {
    // If mouse touches Dialog Panel
    if (mouseInDialogPanel()) {
        // Show next dialog line
        advanceDialog();
    }
}