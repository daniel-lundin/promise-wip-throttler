const { feature } = require('kuta/lib/bdd');
const { createThrottler } = require('../index.js');
const { expect } = require('chai');
const sinon = require('sinon');

const createPromise = () => {
  let resolver, rejecter;

  const promise = new Promise((resolve, reject) => {
    resolver = resolve;
    rejecter = reject;
  });
  return { promise, resolver, rejecter };
}

feature('throttler', (scenario) => {
  scenario('throttling', ({ when, then }) => {
    const throttler = createThrottler(2);
    const promises = Array.from({ length: 6 }).map(createPromise);
    const promiseFactories = promises.map(({ promise }) => sinon.stub().returns(promise));

    when('six operations are queued', () => {
      promiseFactories.forEach((factory) => {
        throttler(factory);
      });
    });

    then('the first two are started', () => {
      expect(promiseFactories[0].calledOnce).to.be.true;
      expect(promiseFactories[1].calledOnce).to.be.true;
      expect(promiseFactories[2].calledOnce).to.be.false;
    });

    when('the first is completed', () => {
      promises[0].resolver();
    });

    then('the third is started', () => {
      expect(promiseFactories[2].calledOnce).to.be.true;
    });

    when('the second is started and third fails', () => {
      promises[1].resolver();
      promises[2].rejecter();
    });

    then('the forth and fifth are started', () => {
      expect(promiseFactories[3].calledOnce).to.be.true;
      expect(promiseFactories[4].calledOnce).to.be.true;
    });
  });
});
