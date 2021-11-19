import React, { useState } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Breadcrumb, Typography, Form, Input, Button, InputNumber, Select, DatePicker } from 'antd';

const { Header, Footer, Content } = AntLayout;
const { Title, Text } = Typography;

const StyledBill = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .result-table {
    margin-bottom: 30px;
  }

  .button-finish {
    display: flex;
    align-items: center;
    margin-left: auto;
    border-radius: 10px;
    border-color: #058d23;
    background-color: #058d23;
  }
`;

const Bill = () => {

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const validateMessages = {
    required: 'Nhập ${label}!',
    types: {
      email: '${label} không phải là email hợp lệ!',
      number: '${label} không phải là số hợp lệ!',
    },
    number: {
      min: "'${label}' không thể nhỏ hơn ${min}",
      max: "'${label}' không thể lớn hơn ${max}",
      range: '${label} phải ở giữa ${min} và ${max}',
    },
  };


  const { Option } = Select;

  const [form] = Form.useForm();


  return (
    <StyledBill menuSelectedKey={'sales-report-form'}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý xe</Breadcrumb.Item>
          <Breadcrumb.Item>Lập phiếu thu tiền</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <Title className="main-title" level={2}>
          Lập phiếu thu tiền
          </Title>

          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Biển Số"
              name="plate"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            >
            <Option value="81A-12345">81A-12345</Option>
            <Option value="81B-12345">81B-12345</Option>
            <Option value="81C-12345">81C-12345</Option>
            </Select>
            </Form.Item>
            <Form.Item name="date"
              label="Ngày Thanh Toán"
              rules={[
                {
                  required: true,
                },
              ]}>
            <DatePicker  style={{ width: '100%' }} />
           </Form.Item>

            <Form.Item
              name="money"
              label="Số Tiền Thu"
              rules={[
                {
                  required: true,
                  type: 'number',
                  min: 0,
                },
              ]}
            >
            <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="name"
              label="Họ Tên"
              rules={[
              {
              required: true,
              },
            ]}
            >
            <Input />
          </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[
                {
                  required: true,
                },
              ]}
            >
            <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
            <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Form>
          
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledBill>
  );
};

export default Bill;
