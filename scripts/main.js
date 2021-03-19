// The board
const board = document.querySelector('#board');

// The clear button
const clearBtn = document.querySelector('#clear');

// Random mode button
const randomBtn = document.querySelector('#random');

// Black mode button
const blackBtn = document.querySelector('#black');

// Default drawin mode
let mode = 'black';

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
        pixel.style.backgroundColor = 'grey';
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


// The color palette to choose a random color in each mouse movement
const colorPalette = [
    'red',
    'blue',
    'yellow',
    'green',
    'orange',
    'brown',
    'purple',
    'orchid'];

// The number of colors in the color pallette
const n = colorPalette.length;

// Setting the default darwin state to false
let drawingState = false;

// Setting the drawing state to true and start drawin
board.addEventListener('mousedown', (e) => {
    drawingState = true;
    // Drawing according to the mode
    if (mode === 'random') {
        const color = Math.floor(Math.random() * n);
        e.target.style.backgroundColor = colorPalette[color];
    } else if (mode === 'black') {
        e.target.style.backgroundColor = 'black';
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
        }
    }
});

// Stop drawing when the mouse is released
board.addEventListener('mouseup', (e) => {
    drawingState = false;
});