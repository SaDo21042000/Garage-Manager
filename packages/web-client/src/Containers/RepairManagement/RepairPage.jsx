/* eslint-disable no-template-curly-in-string */
import React, {useEffect, useState}from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Table,
  Button,
  Popconfirm,
  message,
  Form,
  DatePicker,
  notification
} from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axiosClient from '../../Configs/Axios';
import { LoadingScreenCustom, Helper } from './../../Components';

const { Title } = Typography;
const DATEFORMAT = 'MM-DD-YYYY';
const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
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

const RepairPage = () => {
  const [dataSource,setDataSource] = useState([]);
  const [isSearch, setIsSearch] = useState([false]);
  const [dataSearch, setDataSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'number',
    },
    {
      title: 'Biển Số',
      dataIndex: 'bienSo',
      key: 'plate',
    },
    {
      title: 'Chủ Xe',
      dataIndex: 'tenKhachHang',
      key: 'name',
    },
    {
      title: 'Ngày SC',
      dataIndex: 'ngaySC',
      key: 'ngaySC',
    },
    {
      title: 'Tổng Tiền Sửa Chữa',
      dataIndex: 'tongTienSC',
      key: 'money',
    },
    {
      title: 'Tình trạng sửa',
      dataIndex: 'status',
      key: 'done',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, i) => (
        <>
          <Popconfirm
            placement="top"
            title="Bạn có muốn xóa phiếu sửa chữa này?"
            onConfirm={() => handleDelete(i)}
            okText="Yes"
            cancelText="No"
          >
            <Button className="btn" icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  useEffect(()=>{
    getAllPSC(dataSearch);
  },[isSearch])

  const getAllPSC = async (date = null )=>{
    try{
      setIsLoading(true);
      let url = '/phieusuachua/getAllPSC'
      if(date){
        url +='?keyword='+date;
      }
      let data = await axiosClient.get(url);
      data = data.map((item,index)=>{
        return {
          ...item,
          key:index+1,
          tongTienSC:Helper.convertNumberToMoney(item.tongTienSC)
        }
      })
      setDataSource(data);
      setIsLoading(false);
    }catch(e){
      setIsLoading(false);
      notification.error({
        message: "Đã có lỗi lấy danh sách phiếu sửa chữa",
    });
    }
    
  }

  const onFinishAddItem = (values)=>{
    if(!values.date) {
      setDataSearch(null);
    }else{
      let date = values.date.format(DATEFORMAT);
      setDataSearch(date);
    }
    setIsSearch(!isSearch);
  }

  

  async function handleDelete(value) {
    try{  
      setIsLoading(true);
      let body ={
        _id:value._id
      }
      await axiosClient.post('/phieusuachua/xoaPSC',body);
        notification.success({
        message: "Xóa chi tiết sản phẩm thành công",
      });
      setIsLoading(false);
    }catch(e){
      notification.error({
        message: "Đã có lỗi vui lòng kiểm tra lại.",
      });
      setIsLoading(false);
    }
    setIsSearch(!isSearch);
    
  }

  return (
    <StyledHomePage>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Phiếu sửa chữa</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách sửa chữa</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <Title className="main-title" level={2}>
            Danh sách sửa chữa
          </Title>
          <Form
            name="basic"
            className="filter-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinishAddItem}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
          >
            <Form.Item name="date" label="Ngày">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
          <Table columns={columns} dataSource={dataSource} />
          <LoadingScreenCustom isLoading={isLoading} />
        </div>
    </StyledHomePage>
  );
};

export default RepairPage;
