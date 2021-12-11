import React, {useEffect, useState}  from 'react';
import { Layout as AntLayout, Breadcrumb, Typography, Divider, notification} from 'antd';
import * as actions from './actions';
import styled from 'styled-components';
import {LoadingScreenCustom, Helper } from './../../Components'
const {Title, Text} = Typography


const StyledHomePage = styled(AntLayout)`
  .home-container {
    background-color:white;
    position:relative
  }
  
  .site-layout-background {
    position:relative; 
    display:flex;
    // background-color:#f0f2f5;
    justify-content:space-around;
    flex-wrap: wrap;

  }
  .item{
    width:23%;
    height:150px;
    background-color:white;
    border-radius: 5px;
    box-shadow:  2px 2px 2px 2px rgba(0, 0, 0, 0.25);
    text-align:center;

  }
  .title-home {
    text-align:center;
  }
`;
const DATE = new Date();
const DAY = DATE.getDate();
const MONTH = DATE.getMonth() + 1;
const YEAR = DATE.getFullYear();
const Homepage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data,setData] =useState({
    soLuongPhieuSC: 0,
    soLuongPhieuTiepNhan: 0,
    soLuongXeDaSC: 0,
    soTienThuDuocHomNay:0
});
  useEffect(()=>{
    getDataToday();
  },[])

  const getDataToday=async () =>{
    try{
      setIsLoading(true);
      let dataDB =await actions.onGetDataTodayRequest();
      setData(dataDB)
      setIsLoading(false);
    }catch(e){
      notification.error({
        message: "Đã có lỗi xảy ra .Vui lòng thử lại.",
      });

    }
   
  }
  

    return (

      <StyledHomePage >
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        </Breadcrumb>
        <div className="ms-3 me-3 home-container">
          <div className="title-home mb-5 mt-3">
            <Title>Thống kê số lượng hôm nay</Title>
            <Divider > 
              <Text>Ngày {DAY+'/'+MONTH+'/'+YEAR}</Text> 
            </Divider>
           
          </div>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className="item">
                <div className="pt-3">
                  <Text><b>Số xe đã tiếp nhận hôm nay</b></Text>
                </div>
                <hr />
                <div>
                  Số lượng <b>{data.soLuongPhieuTiepNhan} xe</b>
                </div>
              </div>
              <div className="item">
                <div className="pt-3">
                  <Text><b>Số xe đang sửa chữa</b></Text>
                </div>
                <hr />
                <div>
                  Số lượng: <b>{data.soLuongPhieuSC} xe</b>
                </div>
              </div>
              <div className="item">
                <div className="pt-3">
                  <Text><b>Số xe đã lập phiếu thu tiền hôm nay</b></Text>
                </div>
                <hr />
                <div>
                  Số lượng: <b>{data.soLuongXeDaSC} xe</b>
                </div>
              </div>
              <div className="item">
                <div className="pt-3">
                  <Text><b>Doanh thu hôm nay</b></Text>
                </div>
                <hr />
                <div>
                  Doanh thu: <b>{Helper.convertNumberToMoney((data.soTienThuDuocHomNay))}</b>
                </div>
              </div>
          </div>
          <LoadingScreenCustom isLoading ={isLoading} />
        </div>
      </StyledHomePage>
    );
};

export default Homepage;
