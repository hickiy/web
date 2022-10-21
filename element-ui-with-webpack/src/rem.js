const baseSize = 80;

function setRem() {
    const clientWidth = Math.max(document.documentElement.clientWidth, 1366);
    const scale = clientWidth / 1920;
    document.documentElement.style.fontSize = `${baseSize * Math.min(scale, 2)}px`;
}

window.addEventListener('resize', setRem);

setRem();