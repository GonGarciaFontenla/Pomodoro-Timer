let studyTime = 60 * 60; // 1 hora en segundos
let breakTime = 10 * 60; // 10 minutos en segundos
let currentTime = studyTime;
let isStudy = true;
let interval;
let isPaused = false;
let pomodoroCount = 0;

const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const statusElement = document.getElementById('status');
const pomodoroCountElement = document.getElementById('pomodoroCount');
const alarmSound = document.getElementById('alarmSound');
const pauseIcon = document.getElementById('pauseIcon');

function updateTimer() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function switchMode() {
    isStudy = !isStudy;
    if (isStudy) {
        pomodoroCount++;
        pomodoroCountElement.textContent = pomodoroCount;
    }
    currentTime = isStudy ? studyTime : breakTime;
    statusElement.textContent = isStudy ? 'Tiempo de estudio' : 'Tiempo de descanso';
    updateTimer();
}

function startTimer() {
    interval = setInterval(() => {
        if (!isPaused) {
            currentTime--;
            updateTimer();
            if (currentTime <= 0) {
                clearInterval(interval);
                alarmSound.play();
                switchMode();
                startTimer();
            }
        }
    }, 1000);
}

startBtn.addEventListener('click', () => {
    clearInterval(interval);
    isPaused = false;
    startTimer();
});

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseIcon.src = isPaused ? 'play-icon.png' : 'pause-icon.png'; // Cambia el ícono según el estado
});

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    isStudy = true;
    currentTime = studyTime;
    isPaused = false;
    pauseIcon.src = 'pause-icon.png'; // Reinicia el ícono
    statusElement.textContent = 'Tiempo de estudio';
    pomodoroCount = 0;
    pomodoroCountElement.textContent = pomodoroCount;
    updateTimer();
});

updateTimer();
