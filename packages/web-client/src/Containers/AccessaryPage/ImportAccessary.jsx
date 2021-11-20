/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as AntLayout, Breadcrumb, Button, Form, Input, Typography } from 'antd';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Content } = AntLayout;
const { Title, Text } = Typography;

const StyledImportAccessary = styled(AntLayout)`
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

const ImportAccessary = () => {
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

  const onFinish = (values) => {
    console.log(values);
  };

  const ImportAccessaryView = () => {
    return (
      <>
        <Title className="main-title" level={2}>
          Nhập vật tư phụ tùng
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
          onFinish={onFinish}
        >
          <Form.Item label="Tên phụ tùng" name="accessaryName">
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Số lượng" name="quantity">
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Nhập
            </Button>
          </Form.Item>
        </Form>

        <Text type="secondary">
          <InfoCircleOutlined style={{ fontSize: '16px' }} />
          &nbsp;Để nhập loại phụ tùng mới, bạn vui lòng thêm phụ tùng đó vào danh sách của garage{' '}
          <Link to="list-accessary">tại đây</Link>
        </Text>
      </>
    );
  };

  return (
    <StyledImportAccessary>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Nhập vật tư phụ tùng</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <ImportAccessaryView />
        </div>
      </Content>
    </StyledImportAccessary>
  );
};

export default ImportAccessary;
