/* eslint-disable no-template-curly-in-string */
import React, {useState, useEffect} from 'react';
import { Breadcrumb, Typography, Form, Input, Button, InputNumber, DatePicker, Select, notification} from 'antd';
import { PrinterFilled } from '@ant-design/icons';
import { DATEFORMAT, layout, StyledBill, validateMessages } from './Bill.constants';
import { useHistory } from 'react-router-dom';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import axios from './../../Configs/Axios'
import {LoadingScreenCustom } from './../../Components'

const { Title } = Typography;
const {Option} = Select;
const Bill = () => {
  const [dataBienSo, setDataBienSo] = useState([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  useEffect(()=>{
    getBienSo()
  },[])
  const getBienSo= async ()=>{
    try{
      setIsLoading(true);
      let data= await axios.get('/phieusuachua/getBienSo');
      console.log('data',data)
      if(data.status){
        setDataBienSo(data.list);
      }else{
        notification.warning({
          message:data.message
        })
      }
      setIsLoading(false);
    }catch(e){
      setIsLoading(false);
      notification.error({
        message:'Có lỗi lấy danh sách xe. Vui lòng kiểm tra lại'
      })
    }
  }

  const onFinish = (values) => {
    setIsLoading(true);
    const { plate,  money, name, phone, email } = values;
    let date =new Date();
    const dataPost = {
      bienSo: plate,
      ngayTT: date,
      soTienThu: money,
      hoTen: name,
      dienThoai: phone,
      email,
    };

    try {
      axios.post(`${process.env.REACT_APP_API_URL}/phieuthutiens`, dataPost);
      setIsLoading(false);
     // exportToCSV([ dataPost], 'Phiếu thu tiền');
      notification.success({
        message:'Tạo phiếu thu tiền thành công'
      })
      history.push('/car-list')
    } catch (error) {
      notification.error({
        message:'Đã có lỗi xảy ra khi thu tiền. Vui lòng kiểm tra lại'
      })
      setIsLoading(false);
      console.log('Error:', error.message);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.error(errorInfo);
  };

  // const exportToCSV = (csvData, fileName) => {
  //   const fileType =
  //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //   const fileExtension = '.xlsx';

  //   const ws = XLSX.utils.json_to_sheet(csvData);
  //   const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  //   const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };
  const onChangeBienSo=(value)=>{
    setIsLoading(true);
    let money = 0;
    let tenKhachHang='';
    let soDT= '';
    let email='';

    dataBienSo.forEach(item=>{
      if(item.bienSo===value){
        money=item.tongTienSC;
        tenKhachHang=item.tenKhachHang;
        soDT=item.soDT;
        email=item.email;
      } 
    })
    form.setFieldsValue({
      soTienSC: money,
      name:tenKhachHang,
      phone:soDT,
      email:email

    });
    setIsLoading(false);
  }
  return (
    <StyledBill>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Phiếu sữa chữa</Breadcrumb.Item>
        <Breadcrumb.Item>Lập phiếu thu tiền</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 30, position:'relative' }}>
        <Title className="main-title" level={2}>
          Lập phiếu thu tiền
        </Title>

        <Form
          {...layout}
          name="nest-messages"
          validateMessages={validateMessages}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
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
            name="name"
            label="Họ Tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled={true} className="text-dark"/>
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
            <Input disabled={true} className="text-dark"/>
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
            <Input disabled={true} className="text-dark"/>
          </Form.Item>
          <Form.Item
            name="soTienSC"
            label="Số tiền sửa chữa"
            rules={[
              {
                required: true,
                type: 'number',
                min: 0,
              },
            ]}
          >
            <InputNumber style={{ width: '100%' }} disabled={true} className="text-dark"/>
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

          
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button
              type="success"
              icon={<PrinterFilled style={{ fontSize: '20px' }} />}
              htmlType="submit"
              style={{ backgroundColor: '#237804', color: '#fff' }}
            >
              Lưu phiếu thu tiền
            </Button>
          </Form.Item>
        </Form>
        <LoadingScreenCustom isLoading ={isLoading} />
      </div>
    </StyledBill>
  );
};

export default Bill;
