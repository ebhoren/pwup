import { getCookie, setCookie, deleteCookie } from '../../src/core/cookie';

test('cookies', () => {

  // set a cookie
  setCookie('penny', 'Pénélope');

  // expect cookie value to be Pénélope
  expect( getCookie('penny') ).toBe('Pénélope');

  // delete cookie
  deleteCookie('penny');

  // cookie should not exist anymore
  expect( getCookie('penny') ).toBeNull();
});
