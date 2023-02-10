import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

let valuePromise = {};

let result = '';

form.addEventListener('submit', onFormSumit);

function onFormSumit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;
  createPromise(2, delay.value);
  // .then(({ position, delay }) => {
  //   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
  // })
  // .catch(({ position, delay }) => {
  //   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
  // });
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    }
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  promise
    .then(({ delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
