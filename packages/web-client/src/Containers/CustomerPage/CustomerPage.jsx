import React from 'react';
// import { Table } from 'antd';
import { Layout as AntLayout, Breadcrumb, Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Header, Footer, Content } = AntLayout;
const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }
`;

const CustomerPage = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
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
      name: 'John Brown',
      phone: '0123456789',
      email: 'johnbrown@gmail.com',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      number: '2',
      name: 'Jim Green',
      phone: '0123456789',
      email: 'jimgreen@gmail.com',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      number: '3',
      name: 'Joe Black',
      phone: '0123456789',
      email: 'joeblack@gmail.com',
      address: 'Sidney No. 1 Lake Park',
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
          <Breadcrumb.Item>Customer List</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <Table columns={columns} dataSource={data} />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Content>
    </StyledHomePage>
  );
};

export default CustomerPage;
