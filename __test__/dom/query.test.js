import { query, queryAll } from '../../src/dom/query';


test('query with css selectors', () => {
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

  expect( query('#username') ).toBeDefined();
  expect( query('button#button') ).toBeDefined();
  expect( query('body div ul li') ).toBeDefined();
});

test('queryAll with css selectors', () => {
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

  expect( queryAll('#username') ).toBeDefined();
  expect( queryAll('#username').length ).toBe(1);
  expect( queryAll('li').length ).toBe(4);
});

test('query non-existing css selector', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <span id="username" />' +
    '  <button id="button" />' +
    '</div>';

  expect( query('li') ).toBeNull();
});

test('queryAll non-existing css selector', () => {
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

  expect( queryAll('p').length ).toBe(0);
})

test('query with DOM node', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <button id="button" />' +
    '</div>';

  const btn = query('#button');
  expect( query(btn) ).toBe( btn );
});

test('query with NodeList', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <ul>' +
    '    <li>Item 1</li>' +
    '    <li>Item 2</li>' +
    '    <li>Item 3</li>' +
    '    <li>Item 4</li>' +
    '  </ul>' +
    '</div>';

  const listItems = queryAll('li');
  const firstListItem = listItems[0];

  expect( query(listItems) ).toBe( firstListItem );
});

test('queryAll with DOM node', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <button id="button" />' +
    '</div>';

  const btn = query('#button');

  expect( queryAll(btn) ).toBeDefined();
  expect( queryAll(btn).length ).toBe(1);
});

test('queryAll with NodeList', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div>' +
    '  <ul>' +
    '    <li>Item 1</li>' +
    '    <li>Item 2</li>' +
    '    <li>Item 3</li>' +
    '    <li>Item 4</li>' +
    '  </ul>' +
    '</div>';

  const listItems = queryAll('li');

  expect( queryAll(listItems) ).toBeDefined();
  expect( queryAll(listItems) ).toBe( listItems );
  expect( queryAll(listItems).length ).toBe(4);
});
