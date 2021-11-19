import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Breadcrumb, Typography, Form, Input, Button } from 'antd';
const { Header, Footer, Content } = AntLayout;
const { Title, Text } = Typography;

const StyledLogIn = styled(AntLayout)`
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

`;

const LogIn = () => {

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const validateMessages = {
    required: 'Nhập ${label}!'
  };



  return (
    <StyledLogIn menuSelectedKey={'sales-report-form'}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Đăng nhập</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 20 }}>
          <Title className="main-title" level={2}>
            Đăng Nhập
          </Title>
          </div>
      
        <div className="site-layout-background" style={{ padding: 24, minHeight: 300 }}>

          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="account"
              label="Tên Tài Khoản"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Mật Khẩu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Đăng Nhập
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              Nếu chưa có tài khoản <a href="/sign-up">Đăng ký ngay!</a>
            </Form.Item>
          </Form>

        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledLogIn>
  );
};

export default LogIn;
