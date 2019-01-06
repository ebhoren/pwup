import round from '../../src/math/round';

const VALUE = 10.1234321;

test('round', () => {
  expect.assertions(6);
  
  expect(round(VALUE, 0)).toBe(10);
  expect(round(VALUE, 1)).toBeCloseTo(10.1);
  expect(round(VALUE, 2)).toBeCloseTo(10.12);
  expect(round(VALUE, 3)).toBeCloseTo(10.123);

  expect(() => round(VALUE, -1)).toThrow();
  expect(() => round(VALUE, 4)).toThrow();
});
