import React from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Typography, Form, Input, Button} from 'antd';
import { Link } from 'react-router-dom';
import * as actions from './actions'
import {useHistory} from 'react-router-dom'
const { Text } = Typography;

const StyleForgotPassword = styled(AntLayout)`
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

const ForgotPassword = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  let history = useHistory();

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Nhập ${label}!',
  };
  const onFinish=async(values)=>{
    try{
      console.log(values);
      const data={
        email:values.email,
      }
        await actions.onForgotPasswordRequest(data);
        alert('Account của bạn đã được cấp mật khẩu mới. Bạn vui lòng truy cập email để lấy mật khẩu này!');
        history.push('/log-in');
    }catch(e){
        alert(e.message);
    }
}
  return (
    <StyleForgotPassword>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 20 }}>
        <div className="main-title">
          <h3 style={{ marginTop: '5em', marginBottom: '0px'}} >
            Quên mật khẩu
          </h3>
          <Text className="text-info">Bạn vui lòng điền thông tin email bạn đã đăng kí tài khoản</Text>
        </div>

        
        <Form {...layout} name="nest-messages" validateMessages={validateMessages} onFinish={onFinish}>
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
              Gửi
            </Button>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8}}>
            Quay lại trang đăng nhập <Link to="/" className="btn btn-primary">Đăng nhập ngay!</Link>
          </Form.Item>
        </Form>
      </div>
    </StyleForgotPassword>
  );
};

export default ForgotPassword;
