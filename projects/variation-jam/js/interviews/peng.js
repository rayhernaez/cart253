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
 * Display the peng interview
 */
function pengDraw() {
    drawElement([bgImage, pengInterview, dialogsJSON.PENG]);

    if (!dialogue.active) {
        startDialog(dialogsJSON.PENG);
    }

    drawElement([dialogPanel]);
    drawText(currentLine(), dialogPanel);
    updateCursor([getDialogPanelSize()]);
}

/**
 * This will be called whenever the mouse is pressed while the peng interview is active
 */
function pengMousePressed() {
    // If mouse touches Dialog Panel
    if (mouseInDialogPanel()) {
        // Show next dialog line
        advanceDialog();
    }
}