// The board
const board = document.querySelector('#board');

// The clear button
const clearBtn = document.querySelector('#clear');

// Help button
const helpBtn = document.querySelector('#help');

// Instructions
const instructions = document.querySelector('#instructions');

// Close button
const closeBtn = document.querySelector('#close');

// Mode buttons wrapper
const modeWrapper = document.querySelector('#mode-btns');

// Mode buttons list
const modeBtns = document.querySelectorAll('#mode-btns button');

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
let boardChildren = board.childNodes;
createGrid(resolution);

// Clear the board
clearBtn.addEventListener('click', () => {
    const pixels = board.querySelectorAll('div');
    pixels.forEach((pixel) => {
        pixel.style.backgroundColor = 'rgb(255, 255, 255)';
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
    boardChildren.forEach(div => {
        div.addEventListener('mouseenter', (e) => {
            if (!drawingState) {
                if(e.target.style.backgroundColor === 'rgb(255, 255, 255)') {
                    e.target.style.backgroundColor = 'rgb(230, 230, 230)';
                }
            }
        });
        div.addEventListener('mouseleave', (e) => {
            if (!drawingState) {
                if(e.target.style.backgroundColor === 'rgb(230, 230, 230)') {
                    e.target.style.backgroundColor = 'rgb(255, 255, 255)';
                }
            }
        });
    });
});


// Adding and removinge active class from mode buttons
modeWrapper.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        modeBtns.forEach(btn => {
            if (btn === e.target) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
});

// Show the instructions
helpBtn.addEventListener('click', () => {
    instructions.classList.add('visible');
});

// Close the instructions
closeBtn.addEventListener('click', (e) => {
    e.target.parentElement.classList.remove('visible');
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
        switch (mode) {
            case 'random':
                drawRandom(e);
                break;
            case 'black':
                drawBlack(e);
                break;
            case 'scale':
                e.target.style.backgroundColor = 'rgb(230, 230, 230)';
        }
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
                drawScale2(e);
        }
    }
});

// Add an effect on mouse over when drawingState is false
boardChildren.forEach(div => {
    div.addEventListener('mouseenter', (e) => {
        if (!drawingState) {
            if(e.target.style.backgroundColor === 'rgb(255, 255, 255)') {
                e.target.style.backgroundColor = 'rgb(230, 230, 230)';
            }
        }
    });
    div.addEventListener('mouseleave', (e) => {
        if (!drawingState) {
            if(e.target.style.backgroundColor === 'rgb(230, 230, 230)') {
                e.target.style.backgroundColor = 'rgb(255, 255, 255)';
            }
        }
    });
});

// Grid creation function
function createGrid(res) {
    for (let i = 0; i < res; i++) {
        const div = document.createElement('div');
        div.style.width = `${(700 / (res ** (1 / 2)))}px`;
        div.style.height = `${(700 / (res ** (1 / 2)))}px`;
        div.style.backgroundColor = 'rgb(255, 255, 255)'
        board.appendChild(div);
        boardChildren = board.childNodes;
    }
}

// Drawing functions
// Random colors
function drawRandom(e) {
    if (e.target !== board) {
        const color = Math.floor(Math.random() * n);
        const divStyles = window.getComputedStyle(e.target, null);
        const divBgcolor = divStyles.getPropertyValue('background-color');
        // if (divBgcolor !== 'rgba(0, 0, 0, 0)' && divBgcolor !== 'rgb(255, 255, 255)') {
        //     return;
        // }
        e.target.style.backgroundColor = colorPalette[color];
    }
}
// Black color
function drawBlack(e) {
    if (e.target !== board) {
        e.target.style.backgroundColor = 'black';
    }
}

// Scale mode version 2
function drawScale2(e) {
    if (e.target !== board) {
        const divStyles = window.getComputedStyle(e.target, null);
        const divBgColor = divStyles.getPropertyValue('background-color');
        const start = divBgColor.indexOf('(') + 1;
        const end = divBgColor.indexOf(')');
        const values = divBgColor.slice(start, end).split(', ');
        const red = +values[0];
        const green = +values[1];
        const blue = +values[2];
        if (red === green && red === blue && red !== 0) {
            e.target.style.backgroundColor = `rgb(${red - 25}, ${green - 25}, ${blue - 25})`;
        } else {
            return;
        }
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