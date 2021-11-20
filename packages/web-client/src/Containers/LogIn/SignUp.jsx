import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Typography, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
const { Title } = Typography;

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
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Nhập ${label}!',
  };

  return (
    <StyledSignUp menuSelectedKey={'sales-report-form'}>
      <div className="site-layout-background" style={{ padding: 20, minHeight: 20 }}>
        <Title className="main-title" level={2} style={{ marginTop: '5em' }}>
          Đăng Ký
        </Title>

        <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
          <Form.Item
            name="account"
            label="Tên Tài Khoản"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
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
            <Input.Password style={{ width: '100%' }} />
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
            <Input.Password style={{ width: '100%' }} />
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
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Đăng Ký
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            Đã có tài khoản <Link to="/log-in">Đăng nhập ngay!</Link>
          </Form.Item>
        </Form>
      </div>
    </StyledSignUp>
  );
};

export default SignUp;
