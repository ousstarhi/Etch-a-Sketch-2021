const main = document.querySelector('#board');
const grid = 60 ** 2;
for (let i = 0; i < grid; i++) {
    const div = document.createElement('div');
    div.style.width = `${(500 / 60)}px`;
    div.style.height = `${(500 / 60)}px`;
    main.appendChild(div);
}

const colorPalette = [
    'red',
    'blue',
    'yellow',
    'green',
    'orange',
    'brown',
    'purple',
    'orchid'];
const n = colorPalette.length;
let drawingState = false;

main.addEventListener('mousedown', (e) => {
    drawingState = true;
    const color = Math.floor(Math.random() * n);
    e.target.style.backgroundColor = colorPalette[color];
});

main.addEventListener('mousemove', (e) => {
    if (drawingState === true) {
        const color = Math.floor(Math.random() * n);
        e.target.style.backgroundColor = colorPalette[color];
    }
});

main.addEventListener('mouseup', (e) => {
    drawingState = false;
});