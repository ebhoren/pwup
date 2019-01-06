import { getUrlParam, setUrlParam, deleteUrlParam } from '../../src/core/url';

test('get URL parameter', () => {
  const url = 'https://dominic-mercier.com/?page=2&sort=asc';

  expect( getUrlParam('page', url) ).toMatch('2');
  expect( getUrlParam('sort', url) ).toMatch('asc');
  expect( getUrlParam('sort', url) ).not.toMatch('desc');
});
