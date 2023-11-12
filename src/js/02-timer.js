import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    daysTimer: document.querySelector('[data-days]'),
    hoursTimer: document.querySelector('[data-hours]'),
    minutesTimer: document.querySelector('[data-minutes]'),
    secondsTimer: document.querySelector('[data-seconds]'),
};

refs.timer.style.display = 'flex';
refs.timer.style.gap = '10px';
refs.startBtn.setAttribute('disabled', '');
refs.startBtn.addEventListener('click', startTimer);
let timerId = null;
let finishData;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
        return window.alert("Please choose a date in the future");
    } else {
        refs.startBtn.removeAttribute('disabled');
        finishData = selectedDates[0];
    }
    },
};

const calendar = flatpickr('#datetime-picker', options);

function formatTimeUnit(value) {
  return String(value).padStart(2, '0');
}

function startTimer() { 
    timerId = setInterval(() => { 
        const timerValue = convertMs(finishData - new Date())
        if (timerValue.seconds === -1) {
        clearInterval(timerId);
        return;
        }
        refs.daysTimer.textContent = formatTimeUnit(timerValue.days);
        refs.hoursTimer.textContent = formatTimeUnit(timerValue.hours);
        refs.minutesTimer.textContent = formatTimeUnit(timerValue.minutes);
        refs.secondsTimer.textContent = formatTimeUnit(timerValue.seconds);
    }, 1000);
};




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

