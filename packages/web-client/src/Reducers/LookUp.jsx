import React from 'react';
import { Layout as AntLayout, Breadcrumb,Typography, Table, InputNumber, Button, Popconfirm, message, Form } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header, Footer, Content } = AntLayout;
const { Title, Text } = Typography;
const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 10px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .filter-form {
    justify-content: center;
    margin-bottom: 30px;
  }
`;


const LookUp = () => {
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

  const columns = [
    {
      title: '#',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Biển Số',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Hiệu Xe',
      dataIndex: 'carName',
      key: 'carName',
    },
    {
      title: 'Chủ Xe',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tiền Nợ',
      dataIndex: 'debt',
      key: 'debt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, i) => (
        <>
          <Button className="btn" icon={<EditOutlined />} />
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      number: '1',
      plate: '81A-12345',
      carName: 'Audi',
      name: 'Nguyen Van A',
      phone: '0123456789',
      debt: '0',
    },
    {
      key: '2',
      number: '2',
      plate: '81A-12345',
      carName: 'Mercedes',
      name: 'Nguyen Van B',
      phone: '0123456789',
      debt: '0',
    },
    {
      key: '3',
      number: '3',
      plate: '81A-12345',
      carName: 'Toyota',
      name: 'Nguyen Van C',
      phone: '0123456789',
      debt: '0',
    },
  ];

  function confirm() {
    message.info('Clicked on Yes.');
  }

  return (
    <StyledHomePage>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản Lý Xe</Breadcrumb.Item>
          <Breadcrumb.Item>Tra Cứu Xe</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <Title className="main-title" level={2}>
            Danh sách xe
          </Title>
          </div>
          <Form
            name="basic"
            className="filter-form"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Biển Số"
              name="plate"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Chủ Xe"
              name="year"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
        <Table columns={columns} dataSource={data} />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Content>
    </StyledHomePage>
  );
};

export default LookUp;
