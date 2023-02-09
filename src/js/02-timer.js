import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/common.css';

let selectedTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    getTime.call(options, selectedDates[0]);
  },
};

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  input: document.querySelector('#datetime-picker'),
  timer: document.querySelector('.timer'),
  span: document.querySelector('span'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

flatpickr(refs.input, options);

refs.btnStart.disabled = true;

refs.btnStart.addEventListener('click', onStartClick);

function getTime(selectedDate) {
  if (this.defaultDate > selectedDate) {
    Notify.failure('Please choose a date in the future', {
      clickToClose: true,
    });
    return;
  }

  selectedTime = selectedDate;
  refs.btnStart.disabled = false;
}

function onStartClick() {
  setTimer();
  intervalId = setInterval(setTimer, 1000);
  refs.btnStart.disabled = true;
}

function setTimer() {
  const currentTime = Date.now();
  const deltaTime = selectedTime - currentTime;

  if (deltaTime < 1000) {
    outputTimerValue(convertMs(deltaTime));
    clearInterval(intervalId);
    return;
  }
  outputTimerValue(convertMs(deltaTime));
}

function outputTimerValue({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));

  const hours = addLeadingZero(Math.floor((ms % day) / hour));

  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
