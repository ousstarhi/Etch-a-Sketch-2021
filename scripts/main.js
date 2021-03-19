const main = document.querySelector('#main');
for (let i = 0; i < 16; i++) {
    const div = document.createElement('div');
    div.style.width = `${(204 / 4)}px`;
    div.style.height = `${(204 / 4)}px`;
    main.appendChild(div);
}