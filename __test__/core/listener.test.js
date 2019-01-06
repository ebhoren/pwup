import { on, off, once, trigger } from '../../src/core/listener';

test('on, off, trigger', () => {
  const cb = jest.fn();

  // Listening to 'penny' event on document
  on(document, 'penny', cb);

  // At this point in time, the callback should not have been called yet
  expect(cb).not.toBeCalled();

  // Trigger events on document
  trigger(document, 'penny');
  trigger(document, 'penny');

  // At this point in time, the callback should have been called
  expect(cb).toBeCalled();

  // Unlistening to 'penny' event on document
  off(document, 'penny', cb);

  // Trigger events on document
  trigger(document, 'penny');
  trigger(document, 'penny');
  trigger(document, 'penny');

  // At this point in time, the callback should have been called only twice
  expect(cb).toHaveBeenCalledTimes(2);
});


test('once', () => {
  const cb = jest.fn();

  // Listening to 'penny' event on document
  once(document, 'penny', cb);

  // At this point in time, the callback should not have been called yet
  expect(cb).not.toBeCalled();

  // Trigger event on document
  trigger(document, 'penny');
  trigger(document, 'penny');
  trigger(document, 'penny');
  trigger(document, 'penny');
  trigger(document, 'penny');

  // At this point in time, the callback should have been called once
  expect(cb).toBeCalled();
  expect(cb).toHaveBeenCalledTimes(1);
});
