function createThrottler(length) {
  const promises = Array.from({ length }).map((_, index) => Promise.resolve(index));
  let completetionPromise = Promise.resolve();

  return (factory) => {
    return new Promise((resolve, reject) => {
      completetionPromise = completetionPromise.then(() =>
        Promise.race(promises)
        .then((index) => {
          promises[index] = factory()
            .then(resolve, reject)
            .then(() => Promise.resolve(index));
        })
      );
    });
  }
}

function throttled(length) {
  const throttler = createThrottler(length);
  return (fn) => (...args) =>
    new Promise((resolve, reject) => {
      throttler(() => fn(...args).then(resolve, reject));
    });
}

module.exports = {
  createThrottler,
  throttled
};
