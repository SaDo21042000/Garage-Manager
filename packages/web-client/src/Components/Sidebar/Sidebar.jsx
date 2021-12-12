import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HomeOutlined, UserOutlined, FormOutlined, SettingOutlined } from '@ant-design/icons';
import logo from '../../assets/logocar.png';

const { Sider } = Layout;
const StyledSider = styled(Sider)`
  .logo-car {
    height: 60px;
    margin: 20px;
  }
  // menu-sidebar:{
  //   min-width:300px;
  // }
`;
const { SubMenu } = Menu;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={onCollapse}  width={250} >
      <div className="logo-car mb-3">
        <Link to ='/'>
          <img src={logo} alt="LOGO" width="100px" />
        </Link>  
      </div>
      <Menu
       
        className="mt-3 menu-sidebar"
        theme="dark"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        mode="inline"
      >
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <span>Trang chủ</span>
          <Link to="/"></Link>
        </Menu.Item>
        <SubMenu key="car-management" icon={<FormOutlined />} title="Quản Lý Xe">
          <Menu.Item key="/car-reception">
            <Link to="/car-reception">Tiếp Nhận Xe Sửa</Link>
          </Menu.Item>
          <Menu.Item key="/car-list">
            <Link to="/car-list">Danh sách xe</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="AccessaryManagement" icon={<FormOutlined />} title="Quản lý phụ tùng">
          <Menu.Item key="/list-accessary">
            <span>Danh sách phụ tùng</span>
            <Link to="/list-accessary"></Link>
          </Menu.Item>
          <Menu.Item key="/import-accessary">
            <span>Nhập số lượng phụ tùng</span>
            <Link to="/import-accessary"></Link>
          </Menu.Item>
          <Menu.Item key="/wage-list">
            <span>Danh sách tiền công</span>
            <Link to="/wage-list"></Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="repair" icon={<FormOutlined />} title="Phiếu Sửa Chữa">
          <Menu.Item key="/repair-form">
            <Link to="/repair-form">Lập Phiếu Sửa Chữa</Link>
          </Menu.Item>
          <Menu.Item key="/repair-page">
            <Link to="/repair-page">Quản Lý Phiếu Sửa Chữa</Link>
          </Menu.Item>
          <Menu.Item key="/bill">
            <Link to="/bill">Lập Phiếu Thu Tiền</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="/sales-report" icon={<FormOutlined />} title="Báo cáo doanh số">
          <Menu.Item key="/sales-report-page">
            <Link to="/sales-report-page">Báo cáo doanh số</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="/inventory-report" icon={<FormOutlined />} title="Báo cáo tồn">
          <Menu.Item key="/inventory-report-page">
            <Link to="/inventory-report-page">Báo cáo tồn</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="admin" icon={<UserOutlined />} title="Quản lý tài khoản">
          <Menu.Item key="/sign-up">
            <Link to="/sign-up">Đăng Ký thành viên</Link>
          </Menu.Item>
          <Menu.Item key="/change-password">
            <Link to="/change-password">Thay đổi mật khẩu</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="/setting" icon={<SettingOutlined />}>
          <Link to="/setting">Cài đặt</Link>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
};

export default Sidebar;
