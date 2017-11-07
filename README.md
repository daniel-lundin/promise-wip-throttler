# promise-wip-throttler

Set a WIP(work in progress) limit for your promises.

`npm install promise-wip-throttler`

## Example use cases

 - Make sure to not overload an external service.
 - Limit the number of concurrent memory heavy and/or CPU intensive tasks.

## Usage

The following example creates a throttler that will only allow 2 `heavyOperation`s to run concurrently.
The third one will not be started until one of the first two resolves.

```js

import { createThrottler } from 'promise-wip-throttler';

const throttler = createThrottler(2);

throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
```


## Decorator

The throttler is also available as a higher order function that can wraps the target function. The throttled function returns a promise that will resolve once the function has finished executing.

```js

import { throttled } from 'promise-wip-throttler';


function mySlowFunction() {
 // Heavy lifting, retuns a promise
}

const myThrottledSlowFunction = throttled(1)(mySlowFunction);

// Will only run one at a time
myThrottledSlowFunction().then(() => { console.log('I\'m done'); });
myThrottledSlowFunction().then(() => { console.log('I\'m done'); });
myThrottledSlowFunction().then(() => { console.log('I\'m done'); });
myThrottledSlowFunction().then(() => { console.log('I\'m done'); });
myThrottledSlowFunction().then(() => { console.log('I\'m done'); });
myThrottledSlowFunction().then(() => { console.log('I\'m done'); });

```

## License

MIT
 
Copyright Daniel Lundin 2017
