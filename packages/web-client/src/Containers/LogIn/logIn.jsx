import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Typography, Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from '../../Configs/Axios'

const { Title } = Typography;

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
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Nhập ${label}!',
  };
  const onFinish=(values)=>{
    console.log(values);
    getUser();
  }
  const getUser= async()=>{
    let data= await axios.post("/api/taikhoans/login",{
        "tenTaiKhoan":"QuocDT",
        "matKhau":"quocdeptrai"

    })
    console.log(data);

  }
  return (
    <StyledLogIn menuSelectedKey={'sales-report-form'}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 20 }}>
        <Title className="main-title" level={2} style={{ marginTop: '5em' }}>
          Đăng Nhập
        </Title>

        <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish}>
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
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Đăng Nhập
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            Nếu chưa có tài khoản <Link to="/sign-up">Đăng ký ngay!</Link>
          </Form.Item>
        </Form>
      </div>
    </StyledLogIn>
  );
};

export default LogIn;
