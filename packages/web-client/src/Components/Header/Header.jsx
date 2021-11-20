import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const { Header: MainHeader } = Layout;

const StyledHeader = styled.div`
  .site-layout-background {
    background: #fff;
    display: flex;
    justify-content: flex-end; 

    .right-side {
      margin-right: 25px;
    }
  }
`;

const Header = () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="sign-up">
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader>
      <MainHeader className="site-layout-background" style={{ padding: 0 }}>
        <div className="right-side">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <Dropdown overlay={menu} placement="bottomCenter">
            <a href="/">Thomas Edison</a>
          </Dropdown>
        </div>
      </MainHeader>
    </StyledHeader>
  );
};

export default Header;
