const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
}

refs.startBtn.addEventListener('click', changeColorStart);
refs.stopBtn.addEventListener('click', changeColorStop);
refs.stopBtn.setAttribute('disabled', '');
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function changeColorStart() { 
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
        refs.startBtn.setAttribute('disabled', '');
        refs.stopBtn.removeAttribute('disabled');        
}, 1000);
};

function changeColorStop() { 
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
    refs.stopBtn.setAttribute('disabled', '');
};