const form = document.querySelector('.form')

form.addEventListener('submit', formSubmit);

function formSubmit(e) { 
  e.preventDefault();
  const { delay, step, amount } = e.target.elements;
  const initialDelay = parseInt(delay.value, 10);
  const stepValue = parseInt(step.value, 10);
  for (let index = 1; index <= amount.value; index += 1) { 
    createPromise(index, initialDelay + (index - 1) * stepValue)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  };
};

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      shouldResolve ? resolve({ position, delay }) : reject({ position, delay });
    }, delay);
  });
}
