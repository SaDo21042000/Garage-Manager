import React from 'react';
import { Layout as AntLayout, Breadcrumb } from 'antd';
// import { Layout as AntLayout, Breadcrumb } from 'antd';
import styled from 'styled-components';

const { Header, Footer, Content } = AntLayout;

const StyledHomePage = styled(AntLayout)`
  .site-layout-background {
    background: #fff;
  }
`;

const Homepage = () => {
  return (
    <StyledHomePage menuSelectedKey={'Home'}>
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          This is Home Page.
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </StyledHomePage>
  );
};

export default Homepage;
