import { Layout, Menu } from 'antd';
import SubMenu from 'antd/lib/menu/SubMenu';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuText = ['Quản lý xe', 'Quản  lý phụ tùng', 'Lập báo cáo', 'Thu tiền'];

export const Navbar = () => {
  const { Sider } = Layout;

  return (
    <>
      <Sider>
        <Menu mode="inline" theme="dark">
          {MenuText.map((text, index) => (
            <SubMenu key={text} title={text}>
              <Menu.Item key={index}>
                <i className="fa fa-caret-down"></i>
              </Menu.Item>
            </SubMenu>
          ))}
          <Menu.Item key="settings">Cài đặt</Menu.Item>
          <Menu.Item key="admin">Admin</Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
