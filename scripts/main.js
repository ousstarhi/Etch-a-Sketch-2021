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

// Resolution input
const userRes = document.querySelector('form#size');

// Resolution title
const title = document.querySelector('h1');

// Default drawin mode
let mode = 'black';

// Staring value of lightness for the scale mode
let lightness = 97;

// The default grid
let resolution = 16 ** 2;
createGrid(resolution);

// Clear the board
clearBtn.addEventListener('click', () => {
    const pixels = board.querySelectorAll('div');
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'white';
        lightness = 97;
    });
});

// Changing the resolution
userRes.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!userRes.firstElementChild.value) {
        return;
    }
    changeResolution();
    lightness = 97;
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
    lightness = 97;
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
// Toggling drawing state
board.addEventListener('click', (e) => {
    if (drawingState) {
        drawingState = false;
    } else {
        drawingState = true;
    }
});
// Start drawing on hover
board.addEventListener('mouseover', (e) => {
    if (drawingState) {
        switch (mode) {
            case 'random':
                drawRandom(e);
                break;
            case 'black':
                drawBlack(e);
                break;
            case 'scale':
                drawScale(e, lightness);
                lightness -= 0.5;
                const divStyles = window.getComputedStyle(e.target, null);
                const divBgcolor = divStyles.getPropertyValue('background-color');
                console.log(divBgcolor);
        }
    }
});

// Grid creation function
function createGrid(res) {
    for (let i = 0; i < res; i++) {
        const div = document.createElement('div');
        div.style.width = `${(700 / (res ** (1 / 2)))}px`;
        div.style.height = `${(700 / (res ** (1 / 2)))}px`;
        board.appendChild(div);
    }
}

// Drawing functions
// Random colors
function drawRandom(e) {
    if (e.target !== board) {
        const color = Math.floor(Math.random() * n);
        const divStyles = window.getComputedStyle(e.target, null);
        const divBgcolor = divStyles.getPropertyValue('background-color');
        console.log(divBgcolor);
        if (divBgcolor !== 'rgba(0, 0, 0, 0)' && divBgcolor !== 'rgb(255, 255, 255)') {
            return;
        }
        e.target.style.backgroundColor = colorPalette[color];
    }
}
// Black color
function drawBlack(e) {
    if (e.target !== board) {
        e.target.style.backgroundColor = 'black';
    }
}
// Scale mode
function drawScale(e, lightness) {
    if (e.target !== board) {
        e.target.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
    }
}

// Changing Resolution
function changeResolution() {
    const pixels = board.querySelectorAll('div');
    pixels.forEach((pixel) => {
        pixel.remove();
    });
    let value = userRes.firstElementChild.value;
    if (value > 100) {
        alert('The limit is 100');
        userRes.firstElementChild.value = '';
        return;
    }
    resolution = value ** 2;
    title.textContent = `Resolution: ${value} x ${value}`;
    userRes.firstElementChild.value = '';
    createGrid(resolution);
}

// // Setting the drawing state to true and start drawin
// board.addEventListener('mousedown', (e) => {
//     drawingState = true;
//     // Drawing according to the mode
//     switch (mode) {
//         case 'random':
//             drawRandom(e);
//             break;
//         case 'black':
//             drawBlack(e);
//             break;
//         case 'scale':
//             lightness = 97;
//             drawScale(e, lightness);
//     }
// });

// // Continue drawing while the mouse is down and in move
// board.addEventListener('mousemove', (e) => {
//     if (drawingState === true) {
//         // Drawing according to the mode
//         switch (mode) {
//             case 'random':
//                 drawRandom(e);
//                 break;
//             case 'black':
//                 drawBlack(e);
//                 break;
//             case 'scale':
//                 drawScale(e, lightness);
//                 lightness -= 0.5;
//         }
//     }
// });

// // Stop drawing when the mouse is released
// board.addEventListener('mouseup', () => {
//     drawingState = false;
// });