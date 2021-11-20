import React from 'react';
import 'antd/dist/antd.css';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import { useLocation } from 'react-router';

import Sidebar from '../Sidebar';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

const { Content } = AntLayout;

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
  const { pathname } = useLocation();
  const isPubicRoutes = pathname === '/log-in' || pathname === '/sign-up' ? true : false;

  return isPubicRoutes ? (
    <>{children}</>
  ) : (
    <StyledLayout style={{ minHeight: '100vh' }}>
      <Sidebar selectedKey={menuSelectedKey} />
      <AntLayout>
        <Header />
        <Content style={{ margin: '0 16px' }}>
          {children}
          <Footer />
        </Content>
      </AntLayout>
    </StyledLayout>
  );
};

export default Layout;
