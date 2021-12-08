import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Layout as AntLayout, Typography, Form, Input, Button, notification} from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from './actions';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {LoadingScreen } from './../../Components'
import background from './../../assets/background-login.jpg'; 
const { Text } = Typography;

const StyledLogIn = styled(AntLayout)`
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
    height:320px;
    top:calc(50% - 160px);
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

const LogIn = () => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const dispatch = useDispatch();
  const params = useParams();
  let history = useHistory();
  let location = useLocation();
  const [isLoading, setIsLoading] =useState(false);

  useEffect(() => {
    const isNumeric = /^\/validate-account\/*/;
    if (isNumeric.test(location.pathname)) {
      vaildateAccount(params.id);
    }
  });
  const vaildateAccount = async (params) => {
    try {
      setIsLoading(true);
      await actions.onValidateAccountRequest(params);
      setIsLoading(false);
      history.push('/');
    } catch (e) {
      setIsLoading(false);
      notification.error({
        message: e.message,
      });
      history.push('/');
    }
  };
  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: 'Nhập ${label}!',
  };
  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const data = {
        tenTaiKhoan: values.tenTaiKhoan,
        matKhau: values.matKhau,
      };
      await dispatch(actions.onGetUserRequest(data));
      setIsLoading(false);
      history.push('/');
    } catch (e) {
      setIsLoading(false);
      notification.error({
        message: e.message,
      });
    }
  };
  return (
    <StyledLogIn>
      <div className="site-layout-background">
        <div className="form-login" style={{ padding: 15 }}>
          <div className="main-title">
            <h3 style={{  marginBottom: '0px' ,color:'white'}}>Đăng nhập</h3>
          </div>
          <Form
            {...layout}
            name="nest-messages"
            validateMessages={validateMessages}
            onFinish={onFinish}
          >
            <Form.Item
              name="tenTaiKhoan"
              label={<label style={{ color: "white" }}>Tên tài khoản</label>}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="matKhau"
              label={<label style={{ color: "white" }}>Mật khẩu</label>}
              rules={[
                {
                  required: true,
                },
                () => ({
                  validator(_, value) {
                    if (!value || value.length >= 8) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu có ít nhất 8 kí tự'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
              <Button type="primary" htmlType="submit">
                Đăng Nhập
              </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 7 }}>
            <Text style={{color:'white'}}>
              Bạn quên mật khẩu? <Link to={'forgot-password'} className="text-primary">Quên mật khẩu</Link>
            </Text>
            </Form.Item>
          </Form>
        </div>
        <LoadingScreen isLoading={isLoading} />
      </div>
    </StyledLogIn>
  );
};

export default LogIn;
