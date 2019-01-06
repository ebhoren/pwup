import { isNodeList, isHTMLCollection } from '../../src/core/is';
import { queryAll } from '../../src/dom/query';


test('isNodeList', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '  <ul>' +
    '    <li>Item 1</li>' +
    '    <li>Item 2</li>' +
    '    <li>Item 3</li>' +
    '    <li>Item 4</li>' +
    '  </ul>' +
    '</div>';

  const els = queryAll('li');
  expect(els).toBeInstanceOf( NodeList );
});

test('isHTMLCollection', () => {
  // Set up our document body
  document.body.innerHTML =
    '<form>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '  <ul>' +
    '    <li>Item 1</li>' +
    '    <li>Item 2</li>' +
    '    <li>Item 3</li>' +
    '    <li>Item 4</li>' +
    '  </ul>' +
    '</form>';

  expect( document.forms ).toBeInstanceOf( HTMLCollection );
});
