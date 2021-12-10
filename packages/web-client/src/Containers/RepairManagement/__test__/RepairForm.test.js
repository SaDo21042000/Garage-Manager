import React from 'react';
import RepairForm from '../RepairForm';
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

test('header render with correct text!', () => {
  const utils = render(<RepairForm />);
  const header = utils.getByTestId('header');
  expect(header.textContent).toBe('Lập phiếu sửa chữa');
});

test('soLuong only contains number!', async () => {
  const utils = render(<RepairForm />);
  const amount = utils.getByTestId('amount-input');
  const btnThem = utils.getByLabelText('btn');

  fireEvent.change(amount, { target: { value: '123abcde' } });
  fireEvent.click(btnThem);
  const amoutAfter = utils.getByTestId('amount-input');
  expect(amoutAfter.value).toBe('123');
});

test('The table sheet must include action', () => {
  const utils = render(<RepairForm />);
  const tableEl = utils.getByText(/Action/i);
  expect(tableEl).toBeVisible();
});
