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
        <SubMenu key="" icon={<FormOutlined />} title="Quản Lý Xe">
          <Menu.Item key="r1"><Link to="/look-up">Tra Cứu Xe</Link></Menu.Item>
          <Menu.Item key="r2"><Link to="tiep-nhan-xe">Tiếp Nhận Xe Sửa</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="" icon={<FormOutlined />} title="Phiếu Sửa Chữa">
          <Menu.Item key="r3"><Link to="repair-page">Lập Phiếu Sửa Chữa</Link></Menu.Item>
          <Menu.Item key="r4"><Link to="repair-management">Quản Lý Phiếu Sửa Chữa</Link></Menu.Item>
        </SubMenu>
        <Menu.Item key="/bill" icon={<UserOutlined />}>
          <span>Lập Phiếu Thu Tiền</span>
          <Link to="/bill"></Link>
        </Menu.Item>
        <SubMenu key="/sales-report" icon={<FormOutlined />} title="Báo cáo doanh số">
          <Menu.Item key="r8"><Link to="sales-report-page">Báo cáo doanh số</Link></Menu.Item>
          <Menu.Item key="r9"><Link to="sales-report-form">Form doanh số</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub1" icon={<UserOutlined />} title="Đăng Nhập">
        <Menu.Item key="r6"><Link to="log-in">Đăng Nhập</Link></Menu.Item>
          <Menu.Item key="r7"><Link to="sign-up">Đăng Ký</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        <Menu.Item key="9" icon={<FileOutlined />}>
          Files
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
