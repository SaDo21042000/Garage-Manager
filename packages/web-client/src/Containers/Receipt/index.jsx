import { PrinterFilled, ReloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, DatePicker, Form, Input, InputNumber, Layout, Typography } from 'antd';
import React from 'react';

import { ButtonWrapper, ReceiptStyles } from './receipt.styles';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Item } = Form;

const dateFormat = 'YYYY-MM-DD';

const Receipt = () => {
  const onFinishCreateTable = (values) => {
    console.info(values);
  };

  const onFinishFailedCreateTable = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      number: '${label} không hợp lệ!',
    },
    number: {
      min: '${label} không thể nhỏ hơn ${min}',
    },
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  return (
    <ReceiptStyles>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Thu tiền</Breadcrumb.Item>
          <Breadcrumb.Item>Lập phiếu thu tiền</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background">
          <Title className="main-title" level={2}>
            Lập phiếu thu tiền
          </Title>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishCreateTable}
            onFinishFailed={onFinishFailedCreateTable}
            autoComplete="off"
            validateMessages={validateMessages}
          >
            <Item
              name="BienSo"
              label="Biển số"
              rules={[
                {
                  required: true,
                  type: 'string',
                },
              ]}
            >
              <Input />
            </Item>
            <Form.Item name="NgayThuTien" label="Ngày thu tiền" rules={[{ required: true }]}>
              <DatePicker format={dateFormat} placeholder="Chọn ngày" style={{ width: '100%' }} />
            </Form.Item>
            <Item
              label="Số tiền"
              name="SoTien"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 1,
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Item>

            <Form.Item name="CustomerName" label="Họ tên chủ xe" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="PhoneNumber" label="Số điện thoại" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="CustomerEmail" label="Email" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <ButtonWrapper>
              <Button
                type="primary"
                icon={<ReloadOutlined style={{ fontSize: '20px' }} />}
                style={{
                  marginLeft: '20%',
                  borderRadius: '10px',
                }}
              >
                Lập phiếu mới
              </Button>
              <Button
                type="primary"
                icon={<PrinterFilled style={{ fontSize: '20px' }} />}
                style={{
                  backgroundColor: '#237804',
                  width: 'fit-content',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: '10px',
                }}
              >
                In báo cáo và lưu
              </Button>
            </ButtonWrapper>
          </Form>
        </div>
      </Content>
    </ReceiptStyles>
  );
};

export default Receipt;
