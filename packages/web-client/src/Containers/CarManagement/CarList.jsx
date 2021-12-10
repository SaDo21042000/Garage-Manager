/* eslint-disable no-template-curly-in-string */
import { DeleteOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Layout as AntLayout,
  notification,
  Popconfirm,
  Table,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosClient from '../../Configs/Axios';
import { LoadingScreenCustom } from './../../Components';

const { Title } = Typography;
const { Search } = Input;

const StyledHomePage = styled(AntLayout)`
  .site-layout-background {n
    background: #fff;
    position:relative
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

const CarList = () => {
  const [dataDisplay, setDataDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      title: '#',
      dataIndex: 'number',
      key: 'number',
      width: 60,
      render: (v, index) => {
        return <span>{dataDisplay.indexOf(index) + 1}</span>;
      },
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
      key: 'tenKhachHang',
    },
    {
      title: 'Phone',
      dataIndex: 'soDT',
      key: 'soDT',
    },
    {
      title: 'Tiền Nợ',
      dataIndex: 'tienNo',
      key: 'tienNo',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
            onConfirm={() => handleDelete(index)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(() => {
    getDataListCar();
  }, []);

  const getDataListCar = async (data = null) => {
    try {
      setIsLoading(true);
      let url = '/phieutiepnhan/getCarByPlate';
      if (data) {
        url += `?bienSo=${data}`;
      }
      let listCar = await axiosClient.get(url);
      listCar = listCar.map((item, index) => {
        return {
          ...item,
          key: index + 1,
        };
      });
      setDataDisplay(listCar);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      notification.error({
        message: 'Lỗi lấy danh sách xe. Vui lòng thử lại',
      });
    }
  };

  const onFinish = async (values) => {
    await getDataListCar(values);
  };

  const handleDelete = async (item) => {
    try {
      setIsLoading(true);
      await axiosClient.post('/phieutiepnhan/deleteXe', { _id: item._id });
      await getDataListCar();
      notification.success({
        message: 'Xóa xe thành công',
      });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      notification.error({
        message: 'Đã có lỗi xảy ra. Vui lòng thử lại',
      });
    }
  };

  return (
    <StyledHomePage>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản Lý Xe</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách Xe</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
        <Title data-testid="header" className="main-title" level={2}>
          Danh sách xe
        </Title>
        <Form
          name="basic"
          className="filter-form"
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="inline"
          validateMessages={validateMessages}
          onFinish={onFinish}
        >
          <Form.Item label="Biển Số" name="plate" style={{ width: '300px' }}>
            <Search
              aria-label='plate-input'
              placeholder="input search text"
              enterButton="Search"
              onSearch={onFinish}
              allowClear
            />
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={dataDisplay} />
        <LoadingScreenCustom isLoading={isLoading} />
      </div>
    </StyledHomePage>
  );
};

export default CarList;
