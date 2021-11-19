import React from 'react';
import { Layout as AntLayout, Breadcrumb,Typography, Table, Input,
Button, Popconfirm, message, Form, Select } from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header, Footer, Content } = AntLayout;
const { Title, Text } = Typography;
const StyledHomePage = styled(AntLayout)`
  .site-layout-background {n
    background: #fff;
  }

  .main-title {
    margin-bottom: 30px;
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

  const { Option } = Select;

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
              <Select
            showSearch
            placeholder="Search to Select"
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

            <Form.Item
              label="Chủ Xe"
              name="year"
            >
            <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            >
            <Option value="Nguyen Van A">Nguyen Van A</Option>
            <Option value="Nguyen Van B">Nguyen Van B</Option>
            <Option value="Nguyen Van C">Nguyen Van C</Option>
            </Select>
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
            >
              <Select
            showSearch
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
            }
            >
            <Option value="0123456789">0123456789</Option>
            <Option value="0123456789">0123456789</Option>
            <Option value="0123456789">0123456789</Option>
            </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
          </div>
        <Table columns={columns} dataSource={data} />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Content>
    </StyledHomePage>
  );
};

export default LookUp;
