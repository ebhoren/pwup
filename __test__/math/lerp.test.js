import lerp from '../../src/math/lerp';

test('lerp', () => {
  expect.assertions(3);

  expect( lerp(0, 1, 0) ).toBeCloseTo( 0 );
  expect( lerp(0, 1, 0.5) ).toBeCloseTo( 0.5 );
  expect( lerp(0, 1, 1) ).toBeCloseTo( 1 );
});
