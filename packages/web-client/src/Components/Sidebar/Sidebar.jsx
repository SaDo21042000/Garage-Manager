import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HomeOutlined, FileOutlined, TeamOutlined, UserOutlined, FormOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const StyledSider = styled(Sider)`
  .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[location.pathname]} mode="inline">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <span>Home Page</span>
          <Link to="/"></Link>
        </Menu.Item>
        <Menu.Item key="/customer" icon={<UserOutlined />}>
          <span>Customer Page</span>
          <Link to="/customer"></Link>
        </Menu.Item>
        <SubMenu key="/sales-report" icon={<FormOutlined />} title="Báo cáo doanh số">
          <Menu.Item key="sales-report-page"><Link to="sales-report-page">Báo cáo doanh số</Link></Menu.Item>
          <Menu.Item key="sales-report-form"><Link to="sales-report-form">Form doanh số</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="/inventory-report" icon={<FormOutlined />} title="Báo cáo tồn">
          <Menu.Item key="inventory-report-page"><Link to="inventory-report-page">Báo cáo tồn</Link></Menu.Item>
          <Menu.Item key="inventory-report-form"><Link to="inventory-report-form">Form báo cáo tồn</Link></Menu.Item>
        </SubMenu>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
