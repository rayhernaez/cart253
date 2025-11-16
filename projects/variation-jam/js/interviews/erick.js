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
    drawElement([bgImage, erickInterview, dialogsJSON.ERICK]);

    if (!dialogue.active) {
        startDialog(dialogsJSON.ERICK);
    }

    drawElement([dialogPanel]);
    drawText(currentLine(), dialogPanel);
    updateCursor([getDialogPanelSize()]);
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
}