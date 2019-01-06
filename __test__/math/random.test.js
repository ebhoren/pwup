import { randomColor, randomFromArray, randomFromA2B } from '../../src/math/random';


test('random color', () => {
  expect( randomColor() ).toMatch(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i);
});

test('random from array', () => {
  const values = [0, 10, 20, 30, 40, 50];
  expect(values).toContain( randomFromArray(values) );
});

test('random from A to B', () => {
  expect( randomFromA2B(0, 100) ).toBeGreaterThanOrEqual( 0 );
  expect( randomFromA2B(0, 100) ).toBeLessThanOrEqual( 100 );
});
