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

    throttledIncrease = throttled(1)(increase);
    const completers = Array.from({ length: 4 }).map(() => sinon.stub());


    when('four increases are queued', () => {
      completers.forEach((completer) => {
        throttledIncrease().then(completer);
      });
    });

    when('wating 750ms', () => wait(750));

    then('the first is completed', () => {
      expect(value).to.eql(1);
      expect(completers[0].calledOnce).to.be.ok;
    });

    when('wating 500ms', () => wait(500));
    then('the second is completed', () => {
      expect(value).to.eql(2);
      expect(completers[1].calledOnce).to.be.ok;
    });

    when('wating 500ms', () => wait(500));
    then('the third is completed', () => {
      expect(value).to.eql(3);
      expect(completers[2].calledOnce).to.be.ok;
    });

    when('wating 500ms', () => wait(500));
    then('the forth is completed', () => {
      expect(value).to.eql(4);
      expect(completers[3].calledOnce).to.be.ok;
    });
  });
});

