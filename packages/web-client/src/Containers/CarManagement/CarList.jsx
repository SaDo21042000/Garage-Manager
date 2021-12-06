/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Table,
  Button,
  Popconfirm,
  message,
  Form,
  Input,
  Select,
  Option
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosClient from '../../Configs/Axios';

const { Title } = Typography;



const StyledHomePage = styled(AntLayout)`
  .site-layout-background {n
    background: #fff;
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
  const { Option } = Select;
  const [dataBienso, setDataBienSo] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);

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
    },
    {
      title: 'Biển Số',
      dataIndex: 'plate',
      key: 'plate',
    },
    {
      title: 'Hiệu Xe',
      dataIndex: 'carName',
      key: 'carName',
    },
    {
      title: 'Chủ Xe',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Tiền Nợ',
      dataIndex: 'debt',
      key: 'debt',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
          <Button className="btn" icon={<EditOutlined />} />
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
             onConfirm={() => handleDelete(index.number)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      number: '1',
      plate: '81A-12345',
      carName: 'Audi',
      name: 'Nguyen Van A',
      phone: '0123456789',
      debt: '0',
    },
    {
      key: '2',
      number: '2',
      plate: '81A-12345',
      carName: 'Mercedes',
      name: 'Nguyen Van B',
      phone: '0123456789',
      debt: '0',
    },
    {
      key: '3',
      number: '3',
      plate: '81A-12345',
      carName: 'Toyota',
      name: 'Nguyen Van C',
      phone: '0123456789',
      debt: '0',
    },
  ];

  function confirm() {
    message.info('Clicked on Yes.');
  }

  useEffect(() => {
    axiosClient.get('/xes/').then((res) => {
      setDataBienSo(res);
    }).catch((err) => {console.log("ERROR GET XE: ", err)});
  }, [])

  const onFinish = async (values) => {
    const { plate } = values;
    if(plate != "all") {
      await axiosClient.get(`/phieutiepnhan/getCarByPlate?bienSo=${plate}`)
      .then(res => {
        console.log("DATA RETURN: ", res);
      }).catch(err => {
        {console.log("ERROR GET XE: ", err)}
      })
    }
    else {
      await axiosClient.get(`/phieutiepnhan/getCarByPlate`)
      .then(res => {
        console.log("DATA RETURN: ", res);
      }).catch(err => {
        {console.log("ERROR GET XE: ", err)}
      })
    }
  };

  const handleDelete = async (number) => {
    console.log(number);  
    const itemDelete = dataDisplay[number-1];
    await axiosClient.post('/phieutiepnhan/deleteXe', itemDelete);
  };

  return (
    <StyledHomePage>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Quản Lý Xe</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách Xe</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
        <Title className="main-title" level={2}>
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
          <Form.Item label="Biển Số" name="plate" style={{ width: '500px' }}>
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
              <Option key='123' value="all">Tất cả</Option>
              {dataBienso.map((item, id) => {
                return(
                  <Option key={id} value={item.bienSo}>{item.bienSo}</Option>
                )
              })}
            
              
            </Select>
          </Form.Item>

          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={data} />
      </div>
    </StyledHomePage>
  );
};

export default CarList;
