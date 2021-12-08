import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Form, Button, InputNumber, notification } from 'antd';

import axiosClient from '../../Configs/Axios';

const StyledForm = styled(Form)`
  .max-car-number {
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const MaxCarForm = (props) => {

  const {setIsLoading} = props;

  const [form] = Form.useForm();

  useEffect(() => {
    const getAPI = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.post('/quydinhs/get');
        form.setFieldsValue({
          soXeMax: response.object.quyDinh.soXeMax,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getAPI();
  }, [form, setIsLoading]);

  const onFinishMaxCar = (values) => {

    const postData = async () => {
      try {
        setIsLoading(true);
        await axiosClient.post('/quydinhs/update', {
          ...values,
          maQuyDinh: 'QD-598-867-527',
        });
        notification.success({
          message: 'Cập nhật số xe tiếp nhận tối đa thành công!',
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    postData();
  };

  const onFinishFailed = (errorInfo) => {
  };

  return (
    <StyledForm
      name="basic"
      layout="inline"
      form={form}
      onFinish={onFinishMaxCar}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="max-car-number"
    >
      <Form.Item
        label="Số xe tiếp nhận tối đa trong ngày"
        name="soXeMax"
        rules={[
          {
            required: true,
            type: 'number',
            min: 1,
            max: 50,
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
    </StyledForm>
  );
};

export default MaxCarForm;
