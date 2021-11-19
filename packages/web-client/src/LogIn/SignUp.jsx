import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Breadcrumb, Typography, Form, Input, Button } from 'antd';
const { Header, Footer, Content } = AntLayout;
const { Title, Text } = Typography;

const StyledSignUp = styled(AntLayout)`
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

const SignUp = () => {

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
    <StyledSignUp menuSelectedKey={'sales-report-form'}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Đăng ký</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 20 }}>
          <Title className="main-title" level={2}>
            Đăng Ký
          </Title>
          </div>
      
        <div className="site-layout-background" style={{ padding: 24, minHeight: 300 }}>

          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
          >
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
              <Input.Password/>
            </Form.Item>
            <Form.Item
              name="confirmpassword"
              label="Nhập Lại Mật Khẩu"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Đăng Ký
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
              Đã có tài khoản <a href="/log-in">Đăng nhập ngay!</a>
            </Form.Item>
          </Form>
            
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledSignUp>
  );
};

export default SignUp;
