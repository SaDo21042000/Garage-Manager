import { Layout, Table } from 'antd';
import React from 'react';
import { MONTHS, YEARS } from '../../Constants';
import {
  CreateReportButton,
  PrintReportButton,
  TimePicker,
  Wrapper,
} from './styles';

const dataSource = [
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    id: '001',
    name: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
];

const BaoCaoTon = () => {
  const title = 'Danh sách báo cáo tồn kho tháng 6/2021';
  const tableTitle = 'Báo cáo tồn kho tháng  6/2021';
  const { Column } = Table;
  const { Content } = Layout;

  return (
    <Layout>
      <Content>
        <Wrapper>
          <div style={{ height: '4rem' }} />
          <h1>{title}</h1>
          <TimePicker>
            <div className="month-picker-wrapper">
              <span className="month-picker-title">Tháng</span>
              <select name="" id="" className="month-picker">
                {MONTHS.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div className="year-picker-wrapper">
              <span className="year-picker-title">Năm</span>
              <select name="" id="">
                {YEARS.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <CreateReportButton>Lập báo cáo tồn kho</CreateReportButton>
          </TimePicker>
          <hr style={{ marginTop: '3rem' }} />
          <div className="content">
            <h2 style={{ margin: '2rem 0' }}>{tableTitle}</h2>
            <Table dataSource={dataSource}>
              <Column title="Mã vật tư" dataIndex="id" />
              <Column title="Tên vật tư" dataIndex="name" />
              <Column title="Tồn đầu" dataIndex="amount" />
              <Column title="Phát sinh" dataIndex="used" />
              <Column title="Tồn cuối" dataIndex="rest" />
            </Table>
          </div>
          <div className="btn-wrapper">
            <PrintReportButton>In báo cáo</PrintReportButton>
          </div>
        </Wrapper>
      </Content>
    </Layout>
  );
};

export default BaoCaoTon;
