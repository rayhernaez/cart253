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
 * Display the tori interview
 */
function toriDraw() {
    drawElement([bgImage, toriInterview, dialogsJSON.TORI]);

    if (!dialogue.active) {
        startDialog(dialogsJSON.TORI);
    }

    drawElement([dialogPanel]);
    drawText(currentLine(), dialogPanel);
    updateCursor([getDialogPanelSize()]);
}

/**
 * This will be called whenever the mouse is pressed while the tori interview is active
 */
function toriMousePressed() {
    // If mouse touches Dialog Panel
    if (mouseInDialogPanel()) {
        // Show next dialog line
        advanceDialog();
    }
}