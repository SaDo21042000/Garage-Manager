/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Breadcrumb, Typography, Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { PrinterFilled } from '@ant-design/icons';
import { DATEFORMAT, layout, StyledBill, validateMessages } from './Bill.constants';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import axios from 'axios';

const { Title } = Typography;

const Bill = () => {
  const onFinish = (values) => {
    const { plate, date, money, name, phone, email } = values;
    console.log();
    const dataPost = {
      bienSo: plate,
      ngayTT: date.format(DATEFORMAT),
      soTienThu: money,
      hoTen: name,
      dienThoai: phone,
      email,
    };

    try {
      axios.post(`${process.env.REACT_APP_API_URL}/phieuthutiens`, dataPost);
      exportToCSV(['Phiếu thu tiền', dataPost], 'Phiếu thu tiền');
    } catch (error) {
      console.log('Error:', error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  const exportToCSV = (csvData, fileName) => {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };
  return (
    <StyledBill>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Phiếu sữa chữa</Breadcrumb.Item>
        <Breadcrumb.Item>Lập phiếu thu tiền</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
        <Title className="main-title" level={2}>
          Lập phiếu thu tiền
        </Title>

        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Biển Số"
            name="plate"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày Thanh Toán"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="money"
            label="Số Tiền Thu"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="name"
            label="Họ Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
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
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button
              type="success"
              icon={<PrinterFilled style={{ fontSize: '20px' }} />}
              htmlType="submit"
              style={{ backgroundColor: '#237804', color: '#fff' }}
            >
              In báo cáo và lưu
            </Button>
          </Form.Item>
        </Form>
      </div>
    </StyledBill>
  );
};

export default Bill;
