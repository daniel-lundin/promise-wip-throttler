# promise-wip-throttler

Set a WIP(work in progress) limit for your promises.

`npm install promise-wip-throttler`

## Example use cases

 - Make sure to not over load an external service
 - Limit memory heavy and/or CPU intensive tasks

## Usage

The following example creates a throttler that will only allow 2 `heavyOperation`s to run concurrently.
The third one will not be started until one of the first two resolves.

```js

import createThrottler from 'promise-wip-throttler';

const throttler = createThrottler(2);

throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
throttler(() => heavyOperation());
```

## License

MIT
 
Copyright Daniel Lundin 2017
