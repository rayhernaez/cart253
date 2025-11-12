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

let bgImage = undefined;
let logo = undefined;
let storyBtn = undefined;
let instructionsBtn = undefined;

const logoFloatPX = 10;
const logoFloatSpeed = 0.05;

function preload() {
    bgImage = loadImage('./assets/images/background/living-room.png');
    logo = loadImage('./assets/images/menu/logo.png');
    storyBtn = loadImage('./assets/images/menu/buttons/story-btn.png');
    instructionsBtn = loadImage('./assets/images/menu/buttons/instructions-btn.png');
}

/**
 * Display the main menu
 */
function menuDraw() {
    drawElement(bgImage);
    drawElement(logo);
    drawElement(storyBtn);
    drawElement(instructionsBtn);
}

function drawElement(element) {
    let y = 0;
    imageMode(CORNER);
    if (element === logo) {
        // Sine wave to get a smooth animation
        y = Math.sin(frameCount * logoFloatSpeed) * logoFloatPX;
        image(element, 0, y, width, height);
    }
    else {
        image(element, 0, y, width, height);
    }
}

// /**
//  * Listen to the keyboard
//  */
// function menuKeyPressed(event) {
//     switch (event.keyCode) {
//         case 82:
//             state = "red-variation";
//             redSetup();
//             break;

//         case 71:
//             state = "green-variation";
//             greenSetup();
//             break;

//         case 66:
//             state = "blue-variation";
//             blueSetup();
//             break;
//     }
// }

// /**
//  * This will be called whenever the mouse is pressed while the menu is active
//  */
// function menuMousePressed() {

// }