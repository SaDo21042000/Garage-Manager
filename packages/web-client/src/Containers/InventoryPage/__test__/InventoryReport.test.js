import React from 'react';
import InventoryReport from '../InventoryReport';
import { render, fireEvent, getByLabelText } from '@testing-library/react';
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
  const component = render(<InventoryReport />);
  const headerEl = component.getByTestId('header');
  expect(headerEl.textContent).toBe('Báo cáo tồn');
});

test('Has button inbaocao when i click xembaocao', () => {
  const component = render(<InventoryReport />);
  const inputMonth = component.getByLabelText('month-input');
  const btn = component.getByLabelText('btn');

  fireEvent.change(inputMonth, { target: { value: '12' } });
  fireEvent.click(btn);
  const headerEl = component.getByTestId('header');
  expect(headerEl.textContent).toBe('Báo cáo tồn');

  const tableEl = await waitFor(() => component.getByText('In báo cáo'));
  expect(tableEl).toBeInTheDocument();
});

test('Baocaotonthangnam should be initially displayed ', () => {
  const component = render(<InventoryReport />);
  const headerEl = component.getByText('Tên vật tư');

  expect(headerEl).toBeInTheDocument();
});
