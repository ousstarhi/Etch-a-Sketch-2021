// The board
const board = document.querySelector('#board');

// The clear button
const clearBtn = document.querySelector('#clear');

// Random mode button
const randomBtn = document.querySelector('#random');

// Black mode button
const blackBtn = document.querySelector('#black');

// Scale mode button
const scaleBtn = document.querySelector('#scale');

// Default drawin mode
let mode = 'black';

// Staring value of lightness for the scale mode
let lightness = 97;

// Number of pixels in the board
const grid = 60 ** 2;

// Creating the the pixels and appending them to the board
for (let i = 0; i < grid; i++) {
    const div = document.createElement('div');
    div.style.width = `${(500 / 60)}px`;
    div.style.height = `${(500 / 60)}px`;
    board.appendChild(div);
}

// The pixels that was created
const pixels = board.querySelectorAll('div');

// Clear the board
clearBtn.addEventListener('click', () => {
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'white';
    });
});

/* Choosing the mode  */
// Black mode
blackBtn.addEventListener('click', () => {
    mode = 'black';
});
// Random mode
randomBtn.addEventListener('click', () => {
    mode = 'random';
});
// Scale mode
scaleBtn.addEventListener('click', () => {
    mode = 'scale';
});

// The color palette to choose a random color in each mouse movement
const colorPalette = [
    'red',
    'blue',
    'yellow',
    'green',
    'orange',
    'brown',
    'purple',
    'orchid'
];

// The number of colors in the color pallette
const n = colorPalette.length;

// Setting the default darwin state to false
let drawingState = false;

/* Drawing Code */

// Setting the drawing state to true and start drawin
board.addEventListener('mousedown', (e) => {
    drawingState = true;
    // Drawing according to the mode
    if (mode === 'random') {
        const color = Math.floor(Math.random() * n);
        e.target.style.backgroundColor = colorPalette[color];
    } else if (mode === 'black') {
        e.target.style.backgroundColor = 'black';
    } else if (mode === 'scale') {
        lightness = 97;
        e.target.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
    }
});

// Continue drawing while the mouse is down and in move
board.addEventListener('mousemove', (e) => {
    if (drawingState === true) {
        // Drawing according to the mode
        if (mode === 'random') {
            const color = Math.floor(Math.random() * n);
            e.target.style.backgroundColor = colorPalette[color];
        } else if (mode === 'black') {
            e.target.style.backgroundColor = 'black';
        } else if (mode === 'scale') {
            e.target.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
            lightness -= 0.5;
        }
    }
});

// Stop drawing when the mouse is released
board.addEventListener('mouseup', () => {
    drawingState = false;
});