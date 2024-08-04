// script.js
let intervalId;
let isRunning = false;
let seconds = 0;
let lapCount = 0;
const displayElement = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsElement = document.getElementById('laps');

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(() => {
            seconds++;
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secondsDisplay = seconds % 60;
            displayElement.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(secondsDisplay)}`;
        }, 1000);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
}

function resetStopwatch() {
    seconds = 0;
    lapCount = 0;
    displayElement.textContent = '00:00:00';
    lapsElement.innerHTML = '';
    clearInterval(intervalId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCount}: ${displayElement.textContent}`;
        lapsElement.appendChild(li);
    }
}

function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}