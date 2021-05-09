const promisify = (item, delay) =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve(item), delay));

const a = () => promisify('a', 0);
const b = () => promisify('b', 1000);
const c = () => promisify('c', 5000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [resp1, resp2, resp3] = await Promise.all(promises);
  return `parallel is done: ${resp1} ${resp2} ${resp3}`
}

async function race() {
  const promises = [a(), b(), c()];
  const resp = await Promise.race(promises);
  return `race is done: ${resp}`;
}

async function sequence() {
  const resp1 = await a();
  const resp2 = await b();
  const resp3 = await c();
  return `sequence is done ${resp1} ${resp2} ${resp3}`
}

// parallel().then(console.log);
// race().then(console.log);
// sequence().then(console.log);

// Promise settled

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 2000)
})

// Returns the array with the promise resolve and reject status and reason. .allSettled() is a ES 2020 feature

Promise.allSettled([promise1, promise2]).then((data) => console.log(data))

