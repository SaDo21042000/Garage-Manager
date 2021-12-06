/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Typography,
  Table,
  Button,
  Popconfirm,
  Form,
  Select,
  notification,
} from 'antd';
import DeleteOutlined from '@ant-design/icons';
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
      width: 60,
      render: (v, index) => {
        return <span>{dataDisplay.indexOf(index) + 1}</span>;
      },
    },
    {
      title: 'Biển Số',
      dataIndex: 'bienSo',
      key: 'bienSo',
      width: 120,
    },
    {
      title: 'Hiệu Xe',
      dataIndex: 'hieuXe',
      key: 'hieuXe',
      width: 120,
    },
    {
      title: 'Chủ Xe',
      dataIndex: 'tenKhachHang',
      key: 'tenKhachHang',
      width: 250,
    },
    {
      title: 'Phone',
      dataIndex: 'soDT',
      key: 'soDT',
      width: 160,
    },
    {
      title: 'Tiền Nợ',
      dataIndex: 'tienNo',
      key: 'tienNo',
      width: 140,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, index) => (
        <>
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


  useEffect(() => {
    axiosClient.get('/xes').then((res) => {
      setDataBienSo(res);
    }).catch((err) => {console.log("ERROR GET XE: ", err)});
  }, [])

  const onFinish = async (values) => {
    const { plate } = values;
    if(plate != "all") {
      await axiosClient.get(`/phieutiepnhan/getCarByPlate?bienSo=${plate}`)
      .then(res => {
        console.log("DATA RETURN: ", res);
        setDataDisplay([res]);
      }).catch(err => {
        {console.log("ERROR GET XE: ", err)}
      })
    }
    else {
      await axiosClient.get(`/phieutiepnhan/getCarByPlate`)
      .then(async res => {
        let dataDL = [];
       
        setDataDisplay([]);
        let xe = res.xe;
        let kh = res.khachang;
       
        for(var i in xe) {
          let data = {
            bienSo: '',
            hieuXe: '',
            soDT: '',
            tenKhachHang: '',
            tienNo: '',
            _id: '',
            number: parseInt(i) + 1
          }
          data.bienSo = xe[i].bienSo; 
          data.hieuXe = xe[i].maHieuXe;
          data.tienNo = xe[i].tienNo;
          data._id = xe[i]._id;
          for(var j of kh) {
            if(xe[i].maKhachHang == j[0]._id) {
              data.tenKhachHang = j[0].tenKhachHang;
              data.soDT = j[0].soDT;
            }
          }
          dataDL.push(data)
        }
        console.log("DATA RETURN: ", dataDL);
        setDataDisplay(dataDL);
        


      }).catch(err => {
        {console.log("ERROR GET XE: ", err)}
      })
    }
  };

  const handleDelete = async (number) => {
    console.log(number); 
    notification.success({
      message: 'Xóa xe thành công',
    })
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
          <Form.Item label="Biển Số" name="plate" style={{ width: '300px' }}>
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
        <Table columns={columns} dataSource={dataDisplay} />
      </div>
    </StyledHomePage>
  );
};

export default CarList;
