import has from '../../src/core/has';

test('has', () => {
  const obj = {
    name: 'Dominic',
    age: 33,
    sex: 'M'
  };

  expect( has(obj, 'name') ).toBeTruthy();
  expect( has(obj, 'age') ).toBeTruthy();
  expect( has(obj, 'sex') ).toBeTruthy();
  expect( has(obj, 'lastname') ).toBeFalsy();
});
