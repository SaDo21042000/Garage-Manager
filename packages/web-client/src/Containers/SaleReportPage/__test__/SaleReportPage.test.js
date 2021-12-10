import React from 'react';
import SaleReportPage from '../SaleReportPage';
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
  const component = render(<SaleReportPage />);
  const headerEl = component.getByTestId('header');
  expect(headerEl.textContent).toBe('Báo cáo doanh thu tháng');
});

test('A month must between 1 and 12', () => {
  const component = render(<SaleReportPage />);
  const inputMonth = component.getByLabelText('month-input');

  fireEvent.change(inputMonth, { target: { value: '13' } });
  const linkElement = component.getByText('Tháng phải ở giữa 1 và 12');

  expect(linkElement).toBeInTheDocument();
});

test('A month must between 1 and 12', () => {
  // const component = render(<SaleReportPage />);
  // const inputMonth = component.getByLabelText('month-input');
  // fireEvent.change(inputMonth, { target: { value: '13' } });
  // const linkElement = component.getByText('Tháng phải ở giữa 1 và 12');
  // expect(linkElement).toBeInTheDocument();
});

test('Button', () => {
  const component = render(<SaleReportPage />);
  const button = component.getByTestId('btn');
  const inputMonth = component.getByLabelText('month-input');

  fireEvent.change(inputMonth, { target: { value: '12' } });
  fireEvent.click(button);

  const tableEl = component.getByText(/Kết quả báo cáo doanh thu tháng 12 năm 2021/i);
  expect(tableEl).toBeInTheDocument();
});

test('Has button In bao cao doanh thu', () => {
  const component = render(<SaleReportPage />);

  const tableEl = component.getByText(/In báo cáo doanh thu/i);
  expect(tableEl).toBeInTheDocument();
});
