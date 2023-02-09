import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/common.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('input#datetime-picker', options);

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  span: document.querySelector('span'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.btnStart.disabled = true;
