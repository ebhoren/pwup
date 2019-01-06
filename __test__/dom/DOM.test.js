import DOM from '../../src/dom/DOM';

test('DOM', () => {
  expect(DOM.html).toBe(document.documentElement);
  expect(DOM.body).toBe(document.body);
});
