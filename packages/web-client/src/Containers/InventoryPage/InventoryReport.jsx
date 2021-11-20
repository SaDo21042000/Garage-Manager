/* eslint-disable no-template-curly-in-string */
import { DownloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Divider, Form, InputNumber, Layout, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { InventoryReportStyles } from './styles';

const dataSource = [
  {
    index: 1,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 2,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 3,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 4,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 5,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 6,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 7,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 8,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 9,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 10,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 11,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
  {
    index: 12,
    itemName: 'Toyota',
    amount: 10,
    used: 8,
    rest: 2,
  },
];

const columns = [
  {
    title: 'STT',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: 'Vật tư phụ tùng',
    dataIndex: 'itemName',
    key: 'itemName',
  },
  {
    title: 'Tồn đầu',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Phát sinh',
    dataIndex: 'used',
    key: 'used',
  },
  {
    title: 'Tồn cuối',
    dataIndex: 'rest',
    key: 'rest',
  },
];

const validateMessages = {
  required: 'Nhập ${label}',
  type: {
    number: "'${label}' không phải là số hợp lệ!",
  },
  number: {
    min: "'${label}' không thể nhỏ hơn ${min}!",
    max: "'${label}' không thể lớn hơn ${max}!",
    range: '${label} phải ở giữa ${min} và ${max}!',
  },
};

const InventoryReport = () => {
  const [showReportResult, setShowReportResult] = useState(false);
  const [time, setTime] = useState({ month: '', year: '' });
  const { Content, Header, Footer } = Layout;
  const { Title } = Typography;

  const onFinishCreateTable = (values) => {
    const { month, year } = values;
    setTime({ ...time, month: month, year: year });
    setShowReportResult(true);
  };

  const onFinishFailedCreateTable = (errorInfo) => {
    console.log('Failed:', errorInfo);
    setShowReportResult(false);
  };

  const ResultTitle = () => (
    <Title className="main-title-result" level={4}>
      Báo cáo tồn tháng {time.month} năm {time.year}
    </Title>
  );

  return (
    <InventoryReportStyles menuSelectedKey={'inventory-report-page'}>
      <Header className="site-layout-background" style={{ padding: 0 }} />

      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Báo cáo tồn</Breadcrumb.Item>
          <Breadcrumb.Item>Báo cáo tồn tháng</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
            Báo cáo tồn
          </Title>
          <Form
            name="basic"
            className="filter-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishCreateTable}
            onFinishFailed={onFinishFailedCreateTable}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Tháng"
              name="month"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 1,
                  max: 12,
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Năm"
              name="year"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 2000,
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xem báo cáo
              </Button>
            </Form.Item>
          </Form>
          <div className={showReportResult ? 'show' : 'hide'}>
            <Divider plain>Kết quả</Divider>
            <ResultTitle />
            <Table
              className="result-table"
              columns={columns}
              dataSource={dataSource}
              pagination={{ defaultPageSize: 5 }}
            />
            <Button
              className="button-finish"
              icon={<DownloadOutlined />}
              type="primary"
              size="middle"
            >
              In báo cáo
            </Button>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </InventoryReportStyles>
  );
};

export default InventoryReport;
