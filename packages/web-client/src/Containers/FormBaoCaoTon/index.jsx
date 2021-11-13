import { Button, DatePicker, Form, Input, Layout } from 'antd';
import React from 'react';
import { ButtonWrapper, Title } from './styles';

const FormText = [
  'Mã vật tư',
  'Tên vật tư',
  'Tồn đầu',
  'Phát sinh',
  'Tồn cuối',
  'Mã nhân viên',
];

const FormBaoCaoTon = () => {
  const { Item } = Form;

  return (
    <Layout>
      <Layout.Content style={{ width: '100%', clear: 'both' }}>
        <Title>Lập báo cáo</Title>

        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          style={{ width: '80%', margin: 'auto' }}
        >
          {FormText.map((text, index) => (
            <Item key={index} label={text}>
              <Input size="large" />
            </Item>
          ))}
          <Item label="Ngày tháng">
            <DatePicker style={{ width: '100%', padding: '10px' }} />
          </Item>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit">
              Đồng ý
            </Button>
          </ButtonWrapper>
        </Form>
      </Layout.Content>
    </Layout>
  );
};

export default FormBaoCaoTon;
