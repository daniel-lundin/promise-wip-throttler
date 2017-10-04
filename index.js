export default function createThrottler(length) {
  const promises = Array.from({ length }).map((_, index) => Promise.resolve(index));
  let completetionPromise = Promise.resolve();

  return (factory) => {
    completetionPromise = completetionPromise.then(() =>
      Promise.race(promises)
        .then((index) => {
          promises[index] = factory()
            .then(() => Promise.resolve(index))
            .catch(() => Promise.resolve(index));
        })
    );
  };
}
