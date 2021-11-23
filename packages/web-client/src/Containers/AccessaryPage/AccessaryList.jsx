/* eslint-disable no-template-curly-in-string */
import { Input } from 'antd';
import React, { useState, useEffect } from 'react';

//import React from 'react';
import {
  Layout as AntLayout,
  Breadcrumb,
  Popconfirm,
  Table,
  Button,
  Select,
  Form,
  Divider,
  Typography,
  notification,
} from 'antd';
import { EditOutlined, DeleteOutlined, ConsoleSqlOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import axiosClient from '../../Configs/Axios';

const { Content } = AntLayout;
const { Title } = Typography;

const StyledAccessaryList = styled(AntLayout)`
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

  .search-input {
    max-width: 200px;
  }
  
  .label-search {
    margin-right: 16px;
  }
  
  .input-search {
    margin-right: 28px;
  }
  
`;

const AccessaryList = () => {

  const [dataTypeAccessary, setDataTypeAccessay] = useState([]);
  const [dataListAccessary, setDataListAccessary] = useState([]);

  const [dataEditAccessary, setDataEditAccessay] = useState({typeAccessary: "", nameAccessary: "", unitPrice: ""});
  //const [buttonEditAdd, setButtonEditAdd] = useState("Thêm mới")
  const [checkEdit, setCheckEdit] = useState(false)

 



  const [formTypeAcccessary] = Form.useForm();
  const [formAcccessary] = Form.useForm();
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

  useEffect(() => {
    const getAPI = async () => {
      try {
        const typeAccessary = await axiosClient.get('/loaivattus/get');
        const listAccessay = await axiosClient.get('/accessories');
        console.log(listAccessay);

        setDataTypeAccessay(typeAccessary.object.listLoaiVatTu);
        setDataListAccessary(listAccessay);
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
    console.log(dataListAccessary);
  }, []);

  const onFinish = (values) => {
    console.log(values);
  };

  //Them loai vat tu
  const onFinishTypeAccessary = (values) => {
    const postData = async () => {
      try {
        await axiosClient.post('/loaivattus/create', values);
        notification.success({
          message: 'Import Type Accessory Successfully',
        });
      } catch (error) {
        console.log(error);
      }
    };
    postData();
    formTypeAcccessary.resetFields();
  };

  //Them vat tu or edit vat tu
  const onFinishAccessary = (values) => {
    if(!checkEdit) {
      const postData = async () => {
        try {
          await axiosClient.post('/accessories', values);
          window.location.reload(true);
          notification.success({
            message: 'Import Accessory Successfully',
          });
        } catch (error) {
          console.log(error);
        }
      };
      postData();
      formAcccessary.resetFields();
    }else {
      const postData = async () => {
        try {
          await axiosClient.PUT('/accessories', values);
          notification.success({
            message: 'Edit Accessory Successfully',
          });
        } catch (error) {
          console.log(error);
        }
      };
      postData();
      setDataEditAccessay({typeAccessary: "", nameAccessary: "", unitPrice: ""})
      formAcccessary.resetFields();
      setCheckEdit(false)
      //formAcccessary.resetFields();
    }
   
  };

  const MethodTable = (props) => {

    //Delete accessary
    const onFinishDeleteAccessary = (event, idAccessary) => {
      event.preventDefault();
      const postData = async () => {
        try {
          await axiosClient.delete(`/accessories/${idAccessary}`);
          window.location.reload(true);
          notification.success({
            message: 'Delete Accessory Successfully',
          });
        } catch (error) {
          console.log(error);
        }
      };
      postData();
      //formAcccessary.resetFields();
    };

    //Edit accessary
    const onFinishEditAccessary = (event, accessary) => {
      event.preventDefault();
      const dataEdit = {typeAccessary: "619126ce0ca950f28f11ff61", nameAccessary: accessary.name, unitPrice: accessary.unitPrice}
      setDataEditAccessay(dataEdit)
      setCheckEdit(true)
    };

    return (
      <>
        <td className="text-center">
          <button className="btn" onClick={(event) => onFinishDeleteAccessary(event, props.accessary._id)}>
            <DeleteOutlined />
          </button>
          <button className="btn" onClick={(event) => onFinishEditAccessary(event, props.accessary)}>
            <EditOutlined />
          </button>
        </td>
      </>
    );
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 60,
    },
    {
      title: 'Tên phụ tùng',
      dataIndex: 'nameAccessary',
      width: 400,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      width: 150,
    },
    {
      title: 'Số lượng còn',
      dataIndex: 'quantityRemaining',
      width: 150,
    },
    {
      title: 'Thao tác',
      dataIndex: 'handle',
      width: 150,
    },
  ];

  const dataListAccessaryTable = [];
  for (let i = 0; i < dataListAccessary.length; i++) {
    dataListAccessaryTable.push({
      key: i,
      stt: i + 1,
      nameAccessary: dataListAccessary[i].name,
      price: dataListAccessary[i].unitPrice,
      quantityRemaining: dataListAccessary[i].remaining,
      handle: <MethodTable accessary={dataListAccessary[i]} />,
    });
  }


  const AccessaryListView = () => {
    const displayAddOnlyAdmin = () => {
      return (
        <>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinishTypeAccessary}
            form={formTypeAcccessary}
          >
            <Form.Item label="Tên loại phụ tùng" name="tenLoaiVatTu">
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>

          <Divider />

          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            layout="inline"
            validateMessages={validateMessages}
            onFinish={onFinishAccessary}
            form={formAcccessary}
          >
            <Form.Item label="Loại phụ tùng" name="typeAccessory">
              <Select
                placeholder="Select a option"
                showSearch="true"
                showArrow
                allowClear
                style={{ width: '100%' }}
              >
                {dataTypeAccessary.map((item) => {
                  return (
                    <Select.Option key={item._id} value={item.idVatTu} defaultValue={{ value: 'lucy' }} >
                      {item.tenLoaiVatTu}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Tên phụ tùng" name="name">
              <Input style={{ width: '100%' }} defaultValue={dataEditAccessary.nameAccessary} />
            </Form.Item>
            <Form.Item label="Đơn giá" name="unitPrice" >
              <Input style={{ width: '100%' }} defaultValue={dataEditAccessary.unitPrice}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {(checkEdit==true) ? "Chỉnh sửa" : "thêm mới"}
              </Button>
            </Form.Item>
          </Form>

          <Divider />
        </>
      );
    };

    return (
      <>
        <div className="container parent">
          <div className="box">
            <Title className="main-title" level={2}>
              Danh sách phụ tùng
            </Title>
            {displayAddOnlyAdmin()}
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              layout="inline"
              validateMessages={validateMessages}
              onFinish={onFinish}
            >
              <Form.Item label="Tên loại phụ tùng" name="partTypeCode">
                <Input style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tìm ngay
                </Button>
              </Form.Item>
            </Form>

            <div className="list mt-4">
              <Table
                columns={columns}
                dataSource={dataListAccessaryTable}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
                style={{ fontSize: 16 }}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <StyledAccessaryList>
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Quản lý phụ tùng</Breadcrumb.Item>
          <Breadcrumb.Item>Danh sách phụ tùng</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
          <AccessaryListView />
        </div>
      </Content>
    </StyledAccessaryList>
  );
};

export default AccessaryList;
