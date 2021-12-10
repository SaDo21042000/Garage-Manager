/* eslint-disable no-template-curly-in-string */
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  InputNumber,
  Layout as AntLayout,
  Popconfirm,
  Select,
  Table,
  Typography,
  notification
} from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axiosClient from '../../Configs/Axios';
import { LoadingScreenCustom } from './../../Components';

const { Title } = Typography;

const StyledRepairForm = styled(AntLayout)`
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

  .button-finish {
    display: flex;
    align-items: center;
    margin-left: auto;
    border-radius: 10px;
    border-color: #058d23;
    background-color: #058d23;
  }
`;

const RepairForm = () => {
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
      dataIndex: 'key',
      key: 'number',
    },
    {
      title: 'Nội Dung',
      dataIndex: 'noiDung',
      key: 'content',
    },
    {
      title: 'Vật Tư Phụ Tùng',
      dataIndex: 'maVaTu',
      key: 'sparePart',
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'soLuong',
      key: 'numberSpare',
    },
    {
      title: 'Tiền Công',
      dataIndex: 'wage',
      key: 'wage',
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'thanhTien',
      key: 'money',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (v, item) => (
        <>
          <Popconfirm
            placement="top"
            title="Are you sure to delete this customer?"
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

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const { Option } = Select;
  const [dataSource, setDataSource] = useState([]);
  const [dataBienSo, setDataBienSo] = useState([]);
  const [dataLVT, setDataLVT] = useState([]);
  const [dataTenTienCong, setDataTenTienCong] = useState([]);
  const [isExistPSC, setIsExistPSC] = useState(true);
  const [maPSC, setMaPSC] = useState('');
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [initMaXe, setMaXe] = useState('');

  useEffect(() => {
    // Lay tat ca cac xe hien tai co trong database.
    getInitData();
  }, []);

  const getInitData = async () => {
    try {
      setIsLoading(true);
      let listBS = await axiosClient.get('/phieutiepnhan/getListXe');
      setDataBienSo(listBS);

      // Lat tat ca cac loai vat tu co trong database
      let lstVL = await axiosClient.get('/accessories/');
      setDataLVT(lstVL);

      // Lat tat ca cac ten tien cong co trong database
      let lstLoaiTC = await axiosClient.get('/wages/');
      setDataTenTienCong(lstLoaiTC);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  const handleDelete = async (ctsc) => {
    try {
      setIsLoading(true);
      await axiosClient.post('/phieusuachua/xoaCTSC', { _id: ctsc._id });
      await changeDataTable(initMaXe);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  const onHandleBienSo = async (maXe) => {
    setMaXe(maXe);
    await changeDataTable(maXe);
  };
  const changeDataTable = async (maXe) => {
    try {
      setIsLoading(true);
      let data = await axiosClient.get(`/phieusuachua/getListCTSCByMaXe?maXe=${maXe}`);
      if(data.status===0){
        let maPSC = data.maPSC;
        let listPhieuCTSC = data.listPhieuCTSC;
        listPhieuCTSC = listPhieuCTSC.map((item, index)=>{
        maPSC = item.maPSC;
        return {
          ...item,
          key:index+1,
          index:index+1
        }
      })
      setDataSource(listPhieuCTSC);
      setIsExistPSC(true);
      setMaPSC(maPSC);
      
      }
      //chwua lập phiếu tiếp nhận
      if(data.status===1){
        setDataSource([]);
        setIsExistPSC(false);
        notification.info({
          message: data.message,
      });
        setMaPSC('');
        setIsExistPSC(false);
      }
      //chwua lập phiếu sửa chữa
      if(data.status===2){
        setDataSource([]);
          notification.info({
            message: data.message,
        });
        setIsExistPSC(false);
        setMaPSC('');
      }
    setIsLoading(false);  
    } catch (e) {
      setDataSource([]);
      setIsExistPSC(false);
      setIsLoading(false);
    }
  };

  const onChangeBienSo = async (bx) => {
    let obj = dataBienSo.find((item) => item.bienSo === bx);
    form.setFieldsValue({
      plateFilter: obj._id,
    });
    setMaXe(obj._id);
    await changeDataTable(obj._id);
  };

  const onFinishAddItem = async (values) => {
    try {
      setIsLoading(true);
      let id = maPSC;
      if (!isExistPSC) {
        let params = {
          bienSo: values.bienSo,
        };
        let PSC = await axiosClient.post('/phieusuachua/createOne', params);
        id = PSC._id;
      }
      const newData = {
        bienSo: values.bienSo,
        noiDung: values.noiDung,
        maVatTu: values.maVatTu,
        maTienCong: values.maTienCong,
        soLuong: values.soLuong,
        MaPSC: id,
      };
      await axiosClient.post('/phieusuachua/create-CTSC', newData);
      notification.success({
        message:'Thêm chi tiết sản phẩm'
      })
      let obj = dataBienSo.find((item) => item.bienSo === values.bienSo);
      await changeDataTable(obj._id);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <StyledRepairForm>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Phiếu sửa chữa</Breadcrumb.Item>
        <Breadcrumb.Item>Lập phiếu sửa chữa</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
        <Title data-testid="header" className="main-title" level={2}>
          Lập phiếu sửa chữa
        </Title>

        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinishAddItem}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Biển Số"
            name="bienSo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              onChange={onChangeBienSo}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              {dataBienSo.map((item, id) => {
                return (
                  <Option key={id} value={item.bienSo}>
                    {item.bienSo}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="noiDung"
            label="Nội Dung"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="maVatTu"
            label="Vật Tư Phụ Tùng"
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
              {dataLVT.map((item, id) => {
                return (
                  <Option key={id} value={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="soLuong"
            label="Số Lượng"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
                max: 100,
              },
            ]}
          >
            <InputNumber data-testid="amount-input" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Tên tiền công"
            name="maTienCong"
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
              {dataTenTienCong.map((item, id) => {
                return (
                  <Option key={id} value={item._id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button aria-label='btn' type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>

        <Form
          style={{
            width: 250,
          }}
          form={form}
          name="nest1-messages"
        >
          <Form.Item
            label="Tìm phiếu sữa chữa theo biển số"
            name="plateFilter"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              onChange={onHandleBienSo}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
              }
            >
              {dataBienSo.map((item, id) => {
                return (
                  <Option key={id} value={item._id}>
                    {item.bienSo}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>

        <Table
          className="result-table"
          columns={columns}
          dataSource={dataSource}
          pagination={{pageSize:5}}
        />
        <Button className="button-finish" icon={<DownloadOutlined />} type="primary" size="middle">
          In phiếu sửa chữa
        </Button>
        <LoadingScreenCustom isLoading={isLoading} />
      </div>
    </StyledRepairForm>
  );
};

export default RepairForm;
