import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

const inputValueForm = {};

form.addEventListener('submit', onFormSumit);

function onFormSumit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  getValueForm(delay, step, amount);
  promisesFunction();
}

function getValueForm(delay, step, amount) {
  inputValueForm.delay = Number(delay.value);
  inputValueForm.step = Number(step.value);
  inputValueForm.amount = Number(amount.value);
}

function promisesFunction() {
  for (let i = 1; i <= inputValueForm.amount; i += 1) {
    createPromise(i, inputValueForm.delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    inputValueForm.delay += inputValueForm.step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
