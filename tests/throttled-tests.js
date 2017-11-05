const { feature } = require('kuta/lib/bdd');
const { throttled } = require('../index.js');
const { expect } = require('chai');
const sinon = require('sinon');

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
 
feature('throttled', (scenario) => {
  scenario('throttling a a function', ({ when, then }) => {
    let value = 0;
    const increase = () =>
      new Promise((resolve) =>
        setTimeout(() => {
          value++;
          resolve();
        }, 500));

    throttledIncrease = throttled(1)(increase)

    when('six increases are queued', () => {
      throttledIncrease();
      throttledIncrease();
      throttledIncrease();
      throttledIncrease();
    });

    when('wating 750ms', () => wait(750));

    then('the first is completed', () => {
      expect(value).to.eql(1);
    });

    when('wating 500ms', () => wait(500));
    then('the second is completed', () => { expect(value).to.eql(2); });

    when('wating 500ms', () => wait(500));
    then('the third is completed', () => { expect(value).to.eql(3); });

    when('wating 500ms', () => wait(500));
    then('the forth is completed', () => { expect(value).to.eql(4); });
  });
});

