/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout as AntLayout, Breadcrumb, Button, Form, InputNumber, Typography, Select, notification } from 'antd';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';

import axiosClient from '../../Configs/Axios';
import {LoadingScreenCustom } from './../../Components'
const { Content } = AntLayout;
const { Title, Text } = Typography;


const StyledImportAccessary = styled(AntLayout)`
  .site-layout-background {n
    background: #fff;
    position:relative;
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [form] = Form.useForm();
  const history = useHistory();

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

  useEffect(()=>{
    const getAPI = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get('/accessories')
        setData(response)
        setIsLoading(false);
      } catch (error) {
        notification.error({
          message: 'Đã có lỗi lấy danh sách tên loại phụ tùng. Vui lòng thử lại',
        })
        setIsLoading(false);
      }
    }
    getAPI();
  },[])

  const onFinish = (values) => {
    const postData = async () => {
      try {
        setIsLoading(true);
        await axiosClient.post('/accessory-import-forms',values)
        notification.success({
          message: 'Thêm vật tư phụ tùng thành công',
        })
        history.push('/list-accessary');
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notification.error({
          message: 'Đã có lỗi xảy ra vui lòng thử lại',
        })
      }
    }
    postData();
    form.resetFields()
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
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 12,
          }}
          autoComplete="off"
          layout="horizontal"
          validateMessages={validateMessages}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Tên phụ tùng" name="accessoryId">
            <Select
              placeholder="Select a option"
              showSearch="true"
              showArrow
              allowClear
              style={{ width: '100%' }}
            >
              {data.map((item) => {
                return (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label="Số lượng"
            name="amount"
            rules={[
              {
                required: true,
                type: 'number',
                min: 1,
                max: 100,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 11,
              span: 19,
            }}
          >
            <Button type="primary" htmlType="submit">
              Thêm Ngay
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
          <LoadingScreenCustom isLoading ={isLoading} />
        </div>
      </Content>
    </StyledImportAccessary>
  );
};

export default ImportAccessary;
