/* eslint-disable no-template-curly-in-string */

import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Form,
  Modal,
  Table,
  Button,
  Divider,
  InputNumber,
  Input,
  Popconfirm,
} from 'antd';

import { DeleteOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = AntLayout;
const { Title } = Typography;

const StyledSaleReportPage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }

  .main-title {
    margin-bottom: 50px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  .max-car-number {
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const SettingPage = () => {
  const [visibleCarNumber, setVisibleCarNumber] = useState(false);
  const [visibleSupply, setVisibleSupply] = useState(false);
  const [dataSourceCarNumber] = useState([
    {
      key: '1',
      carName: 'Toyota',
    },
    {
      key: '2',
      carName: 'Honda',
    },
    {
      key: '3',
      carName: 'Suzuki',
    },
  ]);
  const [dataSourceSupply] = useState([
    {
      key: '1',
      supplyName: 'Đèn xe Toyota',
    },
    {
      key: '2',
      supplyName: 'Lốp xe Honda',
    },
    {
      key: '3',
      supplyName: 'Tay lái Suzuki',
    },
  ]);

  const columnsCarNumber = [
    {
      title: '#',
      dataIndex: 'carNumber',
      key: 'carNumber',
    },
    {
      title: 'Mã Hiệu Xe',
      dataIndex: 'carName',
      key: 'carName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
            // onConfirm={() => handleDelete(index.carNumber)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const columnsSupply = [
    {
      title: '#',
      dataIndex: 'supplyNumber',
      key: 'supplyNumber',
    },
    {
      title: 'Tên loại vật tư',
      dataIndex: 'supplyName',
      key: 'supplyName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
            // onConfirm={() => handleDelete(index.carNumber)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  dataSourceCarNumber.map((item, index) => (item.carNumber = index + 1));
  dataSourceSupply.map((item, index) => (item.supplyNumber = index + 1));

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <StyledSaleReportPage menuSelectedKey={'sales-report-page'}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Cài đặt và thay đổi quy định</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          <Title className="main-title" level={2}>
            Cài đặt và thay đổi quy định
          </Title>

          <div>
            <Divider />
            <Form
              name="basic"
              layout="inline"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="max-car-number"
            >
              <Form.Item
                label="Số xe tiếp nhận tối đa trong ngày"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>

            <Divider />

            <Form
              name="basic"
              layout="inline"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="max-car-number"
            >
              <Form.Item label="Số hiệu xe" name="username">
                <InputNumber disabled={true} defaultValue={3} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit" onClick={() => setVisibleCarNumber(true)}>
                  Chỉnh sửa danh sách
                </Button>
              </Form.Item>
              <Modal
                title="Số hiệu xe"
                centered
                visible={visibleCarNumber}
                onOk={() => setVisibleCarNumber(false)}
                onCancel={() => setVisibleCarNumber(false)}
                width={1000}
              >
                <Form
                  name="basic"
                  layout="inline"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  className="max-car-number"
                  style={{ marginBottom: '10px' }}
                >
                  <Form.Item label="Thêm số hiệu xe mới" name="username">
                    <Input />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Thêm mới
                    </Button>
                  </Form.Item>
                </Form>
                <Table
                  className="result-table"
                  columns={columnsCarNumber}
                  dataSource={dataSourceCarNumber}
                  pagination={false}
                />
              </Modal>
            </Form>

            <Divider />

            <Form
              name="basic"
              layout="inline"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="max-car-number"
            >
              <Form.Item
                label="Số loại vật tư"
                name="username"
              >
                <InputNumber disabled={true} defaultValue={3} />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit"  onClick={() => setVisibleSupply(true)}>
                  Chỉnh sửa danh sách
                </Button>
                <Modal
                  title="Số loại vật tư"
                  centered
                  visible={visibleSupply}
                  onOk={() => setVisibleSupply(false)}
                  onCancel={() => setVisibleSupply(false)}
                  width={1000}
                >
                  <Form
                    name="basic"
                    layout="inline"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="max-car-number"
                    style={{ marginBottom: '10px' }}
                  >
                    <Form.Item label="Thêm loại vật tư mới" name="username">
                      <Input />
                    </Form.Item>
                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Thêm mới
                      </Button>
                    </Form.Item>
                  </Form>
                  <Table
                    className="result-table"
                    columns={columnsSupply}
                    dataSource={dataSourceSupply}
                    pagination={false}
                  />
                </Modal>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledSaleReportPage>
  );
};

export default SettingPage;
