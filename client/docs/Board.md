## Event Handlers

### onKeyDown

The event handler needs to be throttled because if keys are held down we want to repeteadly update state. React was having trouble changing the state that quickly so we only run the event handler every 30ms allowing time for updating state, diffing the vdom, and finally applying the updates. Throttle is placed inside of usecallback so that it is the same function every time.

`eventListener()` is needed to destructure the event...passing the event instance directly to throttleEventHandler will not work because the event is nullified by the the time throttled function is executed. See ["Event Pooling"](https://reactjs.org/docs/events.html#event-pooling)
