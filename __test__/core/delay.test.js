import Delay from '../../src/core/delay';

test('delay for 1 second', () => {

  const cb = jest.fn();
  const delay = new Delay(cb, 1000);
        delay.start();

  // At this point in time, the callback should not have been called yet
  expect(cb).not.toBeCalled();

  // At this point in time, the callback should not have been called yet
  setTimeout(() => {
    expect(cb).not.toBeCalled();
  }, 500);

  // Now our callback should have been called!
  setTimeout(() => {
    expect(cb).toBeCalled();
    expect(cb).toHaveBeenCalledTimes(1);
  }, 1000);
});


test('delay for 500ms and stop', () => {
  const cb = jest.fn();
  const delay = new Delay(cb, 1000);
        delay.start();

  // At this point in time, the callback should not have been called yet
  expect(cb).not.toBeCalled();

  // At this point in time, the callback should not have been called yet
  // Stop delay
  setTimeout(() => {
    delay.stop();
  }, 500);

  // Our callback should not have been called because we stop it at 500ms
  setTimeout(() => {
    expect(cb).not.toBeCalled();
  }, 1000);
});



test('delay for 1 second, reset and start', () => {
  const cb = jest.fn();
  const delay = new Delay(cb, 1000);
        delay.start();

  // At this point in time, the callback should not have been called yet
  expect(cb).not.toBeCalled();

  // Stop, reset and start delay after 1 second in time
  setTimeout(() => {
    delay.stop();
    delay.reset();
    delay.start();
  }, 1000);

  // Now our callback should have been called!
  setTimeout(() => {
    expect(cb).toBeCalled();
    expect(cb).toHaveBeenCalledTimes(2);
  }, 2000);
});
