import React from 'react';
import CarReception from '../CarReception';
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

test('Should be clear form after I submit', async () => {
  const utils = render(<CarReception />);
  const button = utils.getByText('Xác nhận');
  const input1 = utils.getByLabelText('plate-input');

  fireEvent.change(input1, { target: { value: '81ZA-5234' } });
  await fireEvent.click(button);
  expect(input1.value).toBe('');
});

test('Change value of input works correctly', async () => {
  const utils = render(<CarReception />);
  const input = utils.getByLabelText('plate-input');

  fireEvent.change(input, { target: { value: '81ZA-5234' } });
  expect(input.value).toBe('81ZA-5234');
});

test('The table sheet must include action', () => {
  const utils = render(<CarReception />);
  const tableEl = utils.getByText(/Action/i);
  expect(tableEl).toBeVisible();
});

test('Email address should be validated with regular expression', () => {
  const utils = render(<CarReception />);
  const input = utils.getByLabelText('email-input');

  fireEvent.change(input, { target: { value: '1234' } });
  expect(input.value).toBe('1234@gmail.com');
});

test('header render with correct text', () => {
  const utils = render(<CarReception />);
  const header = utils.getByTestId('header');
  expect(header.textContent).toBe('Form tiếp nhận xe sửa');
});
