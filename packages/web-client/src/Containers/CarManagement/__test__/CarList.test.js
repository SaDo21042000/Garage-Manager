import React from 'react';
import CarList from '../CarList';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test('header render with correct text', () => {
  const component = render(<CarList />);
  const headerEl = component.getByTestId('header');
  expect(headerEl.textContent).toBe('Danh sách xe');
});

test('bienSo field should initially be blanked', () => {
  const utils = render(<CarList />);
  const input = utils.getByLabelText('plate-input');
  expect(input.value).toBe('');
});

test('Change value of input works correctly', async () => {
  const utils = render(<CarList />);
  const input = utils.getByLabelText('plate-input');

  fireEvent.change(input, { target: { value: '81ZA-5234' } });
  expect(input.value).toBe('81ZA-5234');
});

test('Special characters should not be included in bienSo field', async () => {
  const utils = render(<CarList />);
  const input = utils.getByLabelText('plate-input');

  fireEvent.change(input, { target: { value: '!!!' } });
  expect(input.value).toBe('!!!');
});

test('The table sheet must include action', () => {
  const utils = render(<CarList />);
  const tableEl = utils.getByText(/Action/i);
  expect(tableEl).toBeVisible();
});
