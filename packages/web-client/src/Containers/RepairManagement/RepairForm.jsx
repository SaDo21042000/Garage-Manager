/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
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
  message,
  InputNumber,
  Select,
} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { DeleteOutlined } from '@ant-design/icons';
import axiosClient from '../../Configs/Axios';

const { Title } = Typography;

const StyledRepairForm = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
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

  const [dataSource, setDataSource] = useState([]);
  const [dataBienSo, setDataBienSo] = useState([]);
  const [dataLVT, setDataLVT] = useState([]);
  const [dataTenTienCong, setDataTenTienCong] = useState([]);
  const [dataCTSC, setDataCTSC] = useState([]);
  
  let CTSC = [];


  useEffect(() => {
    // Lay tat ca cac xe hien tai co trong database.
    axiosClient.get('/xes/').then((res) => {
      setDataBienSo(res);
    }).catch((err) => {console.log("ERROR GET XE: ", err)});

    // Lat tat ca cac loai vat tu co trong database
    axiosClient.get('/accessories/').then(res => {
      setDataLVT(res);
    }).catch((err) => {console.log("ERROR GET LVT: ", err)});

    // Lat tat ca cac ten tien cong co trong database
    axiosClient.get('/wages/').then(res => {
      setDataTenTienCong(res);
    }).catch(err => {console.log("ERROR GET TIENCONG: ", err)})

    // Lay danh sach CTSC hien tai dang co trong database

   
    // axiosClient.get('/phieusuachua/getAllCTSC').then( async (res) => {
      
    //   for(var i in res) {
    //     let ctsc = {
    //       _id: '',
    //       maPSC: '',
    //       numner: 0,
    //       content: '',
    //       sparePart: '',
    //       price: '',
    //       numberSpare: '',
    //       wage: '',
    //       money: '',
    //     }
    //     await callAPI(res[i].maVaTu, res[i].maTienCong, ctsc, () => {
    //       // console.log(ctsc);
    //     });
    //     console.log(res[i]);
    //     ctsc._id = res[i]._id;
    //     ctsc.maPSC = res[i].maPSC;
    //     ctsc.content = res[i].noiDung;
    //     ctsc.numberSpare = res[i].soLuong;
    //     ctsc.money = res[i].thanhTien;
    //     ctsc.number = parseInt(i)+1;

    //     CTSC.push(ctsc);
    //     if(CTSC.length === res.length) {
    //       setDataCTSC(CTSC);
    //     }
    //   }
    // }).catch(err => {console.log("ERROR GET CTSC: ", err)});

  //  const callAPI = async (maVatTu, maTienCong, ctsc,callback) => {
  //   await axiosClient.get(`/phieusuachua/getVatTu/?maVatTu=${maVatTu}`).then(res1 => {
  //     ctsc.sparePart = res1.name;
  //     ctsc.price = res1.unitPrice;
  //   })
  //   await axiosClient.get(`/phieusuachua/getTienCong/?maTienCong=${maTienCong}`).then(res2 => {
  //     ctsc.wage = res2.name;
  //   })
  //   callback();
  //  }


 
  }, [])
  

  useEffect(() => {
    // console.log("PREV DATASOURCE: ", dataSource);
    const callAPI = async (maVatTu, maTienCong, ctsc,callback) => {
      await axiosClient.get(`/phieusuachua/getVatTu/?maVatTu=${maVatTu}`).then(res1 => {
        ctsc.sparePart = res1.name;
        ctsc.price = res1.unitPrice;
      })
      await axiosClient.get(`/phieusuachua/getTienCong/?maTienCong=${maTienCong}`).then(res2 => {
        ctsc.wage = res2.name;
      })
      callback();
     }
   
     let CTSC2 = [];

     const hi = async (dataCTSC) => {


      for(var i in dataCTSC) {
        console.log("I: ", i)
        let ctsc = {
          _id: '',
          maPSC: '',
          numner: 0,
          content: '',
          sparePart: '',
          price: '',
          numberSpare: '',
          wage: '',
          money: '',
          key: 0,
        }
        ctsc._id = dataCTSC[i]._id;
        ctsc.maPSC = dataCTSC[i].maPSC;
        ctsc.content = dataCTSC[i].noiDung;
        ctsc.numberSpare = dataCTSC[i].soLuong;
        ctsc.money = dataCTSC[i].thanhTien;
        ctsc.key = i;
        console.log("CTSC la: ", ctsc);

        await callAPI(dataCTSC[i].maVaTu, dataCTSC[i].maTienCong, ctsc, () => {
          console.log("RUn");
          CTSC2.push(ctsc);
          if(CTSC2.length === dataCTSC.length) {
            console.log("CTSC2: ", CTSC2);
            setDataSource(CTSC2);
          }
        });
      }
     } 

    console.log("dataCTSC: ", dataCTSC);
    hi(dataCTSC);
   
  }, [dataCTSC])

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
      title: '#',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Nội Dung',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Vật Tư Phụ Tùng',
      dataIndex: 'sparePart',
      key: 'sparePart',
    },
    {
      title: 'Đơn Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Số Lượng',
      dataIndex: 'numberSpare',
      key: 'numberSpare',
    },
    {
      title: 'Tiền Công',
      dataIndex: 'wage',
      key: 'wage',
    },
    {
      title: 'Thành Tiền',
      dataIndex: 'money',
      key: 'money',
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

  const { Option } = Select;

  // const [form] = Form.useForm();

  
  const handleDelete = async (number) => {
    console.log(dataCTSC[number-1]);
    setDataCTSC(dataCTSC.filter((item) => item.number !== number));
    
    message.info('Clicked on Yes.');
    await axiosClient.post('/phieusuachua/xoaPSC', dataCTSC[number-1])

  };

  const onFinishFilterPlate = async (values) => { 
    const { plateFilter } = values;

    const  phieuSuaChua =await axiosClient.get(`/phieusuachua/getPlate?plateFilter=${plateFilter}`);
    

      // .then(async res => {
      //   let maXe = res[0]._id;
      //   // lat tat ca cac phieu tiep nhan ma co maXe res[0]._id;
      //   await axiosClient.get(`/phieutiepnhan/getPTNbyMaXe?maXe=${maXe}`)
      //   .then(async res1=> {
      //     // Mot Xe co nhieu PTN
      //     for(var i of res1) {
      //       let maPTN = i._id;
      //       console.log("maPTN la: ", maPTN);
      //       // Lay cac phieu sua chua ma co maPTN la i._id;
      //       await axiosClient.get(`/phieusuachua/getPSCByMaPTN?maPTN=${maPTN}`)
      //         .then(async res2 => {
      //           // Mot PSC co nhieu CTSC
      //           console.log("RES2: ", res2);
      //           for(var j of res2) {
      //             let maPSC = j._id;
      //             console.log("maPSC la: ", maPSC);
      //             await axiosClient.get(`/phieusuachua/getCTSCByMaPSC?maPSC=${maPSC}`)
      //               .then(res3 => {
      //                 CTSC.push(res3[0]);
      //                 setDataCTSC(CTSC);
      //               })
      //           }
               
      //         })
        //   }
        // })
    
       
      // })

    
  } 

  const onHandleBienSo = async (maXe) =>{
    try{
      // console.log(bienSo)
      // const  phieuSuaChua =await axiosClient.get(`/phieusuachua/getPlate?plateFilter=${bienSo}`);
      // console.log(phieuSuaChua)
      // console.log(dataBienSo);

    const  lstPhieuTiepNhan =await axiosClient.get(`/phieutiepnhan/getPTNbyMaXe?maXe=${maXe}`);
    //1 xe chỉ có 1 phieu tiep nhan
    const phieuTiepNhan = lstPhieuTiepNhan[0];
    console.log(phieuTiepNhan)
    const listPhieuSuaChua = await axiosClient.get(`/phieusuachua/getPSCByMaPTN?maPTN=${phieuTiepNhan._id}`)
    }catch(e){

    }
    

  }

  const onFinishAddItem = async (values) => {
    console.log("DATA: ", values);
  
    const newData = {
      bienSo: values.plate,
      noiDung: values.content,
      nameLoaiVatTu: values.sparePart,
      nameTienCong: values.wage,
      soLuong: values.numberSpare,
    };

    await axiosClient.post('/phieusuachua/createOne', newData);

  
  };

  return (
    <StyledRepairForm >
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Phiếu sửa chữa</Breadcrumb.Item>
        <Breadcrumb.Item>Lập phiếu sửa chữa</Breadcrumb.Item>
      </Breadcrumb>

      <div className="site-layout-background" style={{ padding: 24, minHeight: 30 }}>
        <Title className="main-title" level={2}>
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
            name="plate"
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
              {dataBienSo.map((item, id) => {
                return(
                  <Option key={id} value={item.bienSo}>{item.bienSo}</Option>
                )
              })}
              
            </Select>
          </Form.Item>
          <Form.Item
            name="content"
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
            name="sparePart"
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
                return(
                  <Option key={id} value={item.name}>{item.name}</Option>
                )
              })}
              
            </Select>
          </Form.Item>
          <Form.Item
            name="numberSpare"
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
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Tên tiền công"
            name="wage"
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
                return(
                  <Option key={id} value={item.name}>{item.name}</Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              Thêm
            </Button>
          </Form.Item>
        </Form>

        <Form
          style={{
            width: 250,
          }}
          name="nest1-messages"
          onFinish={onFinishFilterPlate}
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
                return(
                  <Option key={id} value={item._id}>{item.bienSo}</Option>
                )
              })}
              
            </Select>
            
          </Form.Item>
          <Form.Item style={{
              marginTop: '15px'
            }}>
              <Button type="primary" htmlType="submit">
                OK
              </Button>
          </Form.Item>
        </Form>

        <Table
          className="result-table"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
        <Button className="button-finish" icon={<DownloadOutlined />} type="primary" size="middle">
          In phiếu sửa chữa
        </Button>
      </div>
    </StyledRepairForm>
  );
};

export default RepairForm;
