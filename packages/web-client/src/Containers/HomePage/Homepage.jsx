import React  from 'react';
import { Layout as AntLayout, Breadcrumb } from 'antd';
import styled from 'styled-components';


const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    position:relative; 
    display:flex;
    background-color:#f0f2f5;
    justify-content:space-around;

  }
  .item{
    width:23%;
    height:150px;
    background-color:white;
    border-radius: 5px;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    text-align:center;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // flex-direction: row;


  }
`;

const Homepage = () => {

    return (
        <StyledHomePage >
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div className="item">
              <div className="pt-3">
                 Số xe sửa chữa trong ngày
              </div>
              <hr />
              <div>
                Số lượng 
              </div>
            </div>
            <div className="item">
              <div>
                 Số xe sửa chữa trong ngày
              </div>
              <hr />
              <div>
                Số lượng 
              </div>
            </div>
            <div className="item">
              <div>
                 Số xe sửa chữa trong ngày
              </div>
              <hr />
              <div>
                Số lượng 
              </div>
            </div>
        </div>
        </StyledHomePage>
    );
};

export default Homepage;
