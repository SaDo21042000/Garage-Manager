/* eslint-disable no-template-curly-in-string */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Form,
  Input,
  Button,
  Table,
  Popconfirm,
  Select,
  notification,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { LoadingScreenCustom } from './../../Components';
import axiosClient from '../../Configs/Axios';

const { Title } = Typography;
const { Option } = Select;

const StyledCarReception = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
    position: relative;
  }

  .main-title {
    margin-bottom: 30px;
    text-align: center;

    &-result {
      text-align: center;
    }
  }

  .result-table {
    margin-bottom: 30px;
  }
`;

const CarReception = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataHieuXe, setDataHieuXe] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getListPTNInDB();
    getHieuXe();
  }, []);

  const getHieuXe = async () => {
    try {
      setIsLoading(true);
      let data = await axiosClient.post('/hieuxes/get');
      setDataHieuXe(data.object.listHieuXe);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const getListPTNInDB = async () => {
    try {
      setIsLoading(true);
      let data = await axiosClient.get('phieutiepnhan/getListCarInToday');
      data = data.map((item, index) => {
        return {
          ...item,
          key: index + 1,
          index: index + 1,
        };
      });
      setDataSource(data);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      notification.error({
        message: 'Đã có lỗi xảy ra khi lấy thông tin phiếu tiếp nhận hôm nay',
      });
    }
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

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

  const columns = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: 'index',
    },
    {
      title: 'Biển Số',
      dataIndex: 'bienSo',
      key: 'bienSo',
    },
    {
      title: 'Hiệu Xe',
      dataIndex: 'hieuXe',
      key: 'hieuXe',
    },
    {
      title: 'Chủ Xe',
      dataIndex: 'tenKhachHang',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDT',
      key: 'phone',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (v, item) => (
        <>
          <Popconfirm
            placement="top"
            title="Bạn có chắc chắn muốn xóa phiếu tiếp nhận này không?"
            onConfirm={() => handleDelete(item)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleDelete = async (PTN) => {
    try {
      setIsLoading(true);
      await axiosClient.post('/phieutiepnhan/deletePTNByMaPTN', { maPTN: PTN._id });
      notification.success({
        message: 'Xóa phiếu tiếp nhận thành công',
      });
      await getListPTNInDB();
      setIsLoading(false);
    } catch (e) {
      notification.error({
        message: 'Đã có lỗi xảy ra vui lòng thử lại',
      });
      setIsLoading(false);
    }
  };

  const onFinishAddItem = async (values) => {
    try {
      setIsLoading(true);
      const newData = {
        maHieuXe: values.carName,
        bienSo: values.plate,
        tenChuXe: values.name,
        dienThoai: values.phone,
        email: values.email,
        diaChi: values.address,
      };

      let data = await axiosClient.post('/phieutiepnhan/createOne', newData);
      if (data.status === 1) {
        notification.info({
          message: data.message,
        });
      }
      if (data.status === 0) {
        notification.success({
          message: data.message,
        });
      }
      form.resetFields();
      // CCap nhat lai index trong dataSourcce
      await getListPTNInDB();
      setIsLoading(false);
    } catch (e) {
      notification.error({
        message: 'Đã có lỗi xảy ra . Vui lòng kiểm tra lại',
      });
      setIsLoading(false);
    }
  };

  return (
    <StyledCarReception>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản lý xe</Breadcrumb.Item>
        <Breadcrumb.Item>Tiếp nhận xe sửa</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
        <Title data-testid="header" className="main-title" level={2}>
          Lập phiếu tiếp nhận xe sửa
        </Title>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishAddItem}
          validateMessages={validateMessages}
          form={form}
        >
          <Form.Item
            name="plate"
            label="Biển Số"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input aria-label="plate-input" />
          </Form.Item>
          <Form.Item
            name="carName"
            label="Hiệu Xe"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              {dataHieuXe.map((item, id) => {
                return (
                  <Option key={id} value={item.maHieuXe}>
                    {item.tenHieuXe}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            label="Chủ Xe"
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
            label="Số điện thoại"
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
            <Input aria-label="email-input" />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
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
              Xác nhận
            </Button>
          </Form.Item>
        </Form>

        <Title className="main-title" level={2}>
          Danh sách xe tiếp nhận trong ngày
        </Title>
        <Table className="result-table" columns={columns} dataSource={dataSource} />
        <LoadingScreenCustom isLoading={isLoading} />
      </div>
    </StyledCarReception>
  );
};

export default CarReception;
