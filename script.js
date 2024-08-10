let studyTime = 60 * 60; // 1 hora en segundos
let breakTime = 10 * 60; // 10 minutos en segundos
let currentTime = studyTime;
let isStudy = true;
let interval;

const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const statusElement = document.getElementById('status');

function updateTimer() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function switchMode() {
    isStudy = !isStudy;
    currentTime = isStudy ? studyTime : breakTime;
    statusElement.textContent = isStudy ? 'Tiempo de estudio' : 'Tiempo de descanso';
    updateTimer();
}

function startTimer() {
    interval = setInterval(() => {
        currentTime--;
        updateTimer();
        if (currentTime <= 0) {
            clearInterval(interval);
            switchMode();
            startTimer();
        }
    }, 1000);
}

startBtn.addEventListener('click', () => {
    clearInterval(interval);
    startTimer();
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    isStudy = true;
    currentTime = studyTime;
    statusElement.textContent = 'Tiempo de estudio';
    updateTimer();
});

updateTimer();
