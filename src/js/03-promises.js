const form = document.querySelector('.form');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', formSubmit);

function formSubmit(e) { 
  e.preventDefault();
  submitBtn.setAttribute('disabled', 'true'); // деактивую кнопку
  const promises = []; // для коректного відпрацювання та активування кнопки після всіх промісів
  const { delay, step, amount } = e.target.elements;
  const initialDelay = parseInt(delay.value, 10);
  const stepValue = parseInt(step.value, 10);  
  for (let index = 1; index <= amount.value; index += 1) { 
    const promise = createPromise(index, initialDelay + (index - 1) * stepValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      })
    promises.push(promise);
  };
  Promise.all(promises) // для коректного відпрацювання та активування кнопки після всіх промісів
    .finally(() => {
      submitBtn.removeAttribute('disabled');
    });
    // event.target.reset(); // або простіше, без створення масиву
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      shouldResolve ? resolve({ position, delay }) : reject({ position, delay });
    }, delay);
  });
}
