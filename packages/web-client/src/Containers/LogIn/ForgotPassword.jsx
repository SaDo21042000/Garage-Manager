import React, {useState} from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Typography, Form, Input, Button, notification} from 'antd';
import { Link } from 'react-router-dom';
import * as actions from './actions'
import {useHistory} from 'react-router-dom'
import {LoadingScreen } from './../../Components'
import background from './../../assets/background-login.jpg'; 
const { Text } = Typography;

const StyleForgotPassword = styled(AntLayout)`
.site-layout-background {
  position: 'relative';
  width:100%;
  background-size: 100% 100%;
  background-image: url(${background}); 
  background-repeat: no-repeat;
  height:100vh;  
  
}

.form-login{
  width:550px;
  position:absolute;
  height:230px;
  top:calc(50% - 115px);
  left:calc(50% - 275px);
  background-color:rgba(0,0,0,0.6);
  border-radius: 7px;
}

.main-title {
  margin-bottom: 15px;
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
      span:12,
    },
  };
  let history = useHistory();
  const [isLoading, setIsLoading] =useState(false);

  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Nhập ${label}!',
  };
  const onFinish=async(values)=>{
    try{
      setIsLoading(true);
      const data={
        email:values.email,
      }
      await actions.onForgotPasswordRequest(data);
      setIsLoading(false);
      notification.success({
        message: 'Account của bạn đã được cấp mật khẩu mới. Bạn vui lòng truy cập email để lấy mật khẩu này!',
      });
      history.push('/log-in');
    }catch(e){
      setIsLoading(false);
      notification.error({
        message: e.message,
      });
    }
}
  return (
    <StyleForgotPassword>
      <div className="site-layout-background">
        <div className="form-login" style={{ padding: 15 }}>
          <div className="main-title">
            <h3 style={{  marginBottom: '0px' ,color:'white'}}>Quên mật khẩu</h3>
            <Text style={{color:'white'}}>Quay lại trang đăng nhập <Link to="/log-in" >Đăng nhập ngay!</Link></Text>
          </div>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item
            name="email"
            label={<label style={{ color: "white" }}>Email đã đăng kí</label>}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
            
          </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 9 }}>
              <Button type="primary" htmlType="submit">
                Lấy lại mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
        <LoadingScreen isLoading={isLoading} />
      </div>
    </StyleForgotPassword>
  );
};

export default ForgotPassword;
