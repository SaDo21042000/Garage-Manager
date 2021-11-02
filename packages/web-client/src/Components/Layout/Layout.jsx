import React from 'react';
import 'antd/dist/antd.css';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import Sidebar from '../Sidebar';

// const { Header, Footer } = AntLayout;

const StyledLayout = styled(AntLayout)`
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }

  .site-layout-background {
    background: #fff;
  }
`;

const Layout = ({ menuSelectedKey, children }) => {
  return (
    <StyledLayout style={{ minHeight: '100vh' }}>
      <Sidebar selectedKey={menuSelectedKey} />
      {/* <Layout menuSelectedKey={'Home'}> */}
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        {/* <Content style={{ margin: '0 16px' }}></Content> */}
        {children}
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout> */}
    </StyledLayout>
  );
};

export default Layout;
