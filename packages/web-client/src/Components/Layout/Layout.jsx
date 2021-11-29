import React,{useEffect} from 'react';
import 'antd/dist/antd.css';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
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
  const user= useSelector(state=>state.user);
  const history=useHistory();
  const isPubicRoutes = pathname === '/log-in'|| pathname ==='/forgot-password' ? true : false;

  //Không cho nhân viên truy cập khi chưa đăng nhập
  useEffect(() => {
    let isLoginPage = pathname !== '/log-in';
    let isForGotPasswordPage = pathname !== '/forgot-password';
    let isSignUpPage = pathname !== '/sign-up';
    let isSettingPage=pathname!=='/setting';
    const isNumeric = /^\/validate-account\/*/;
    const isValidateAccountPage=!isNumeric.test(pathname)
    if(isLoginPage&&isForGotPasswordPage&&isSettingPage&&isValidateAccountPage&&isSignUpPage){
      console.log(user);
      console.log(pathname);
      let token=JSON.parse(localStorage.getItem('token'));
        let isCheckRight=true;
        if(!token){
            isCheckRight=false;
        }
        if(!user||user.quyenHan===-1){
            isCheckRight=false;
        }
        if(!isCheckRight){
            alert("Bạn vui lòng đăng nhập để truy cập trang này. ");
            history.push("/log-in");
        }}
    })
    //Không cho truy cập các page admin khi chưa đăng nhập tài khoản admin
    useEffect(() => {
      let isSignUpPage = pathname === '/sign-up';
      let isSettingPage = pathname === '/setting';
      if (isSettingPage || isSignUpPage) {
        let token = JSON.parse(localStorage.getItem('token'));
        let isCheckRight = true;
        if (!token) {
          isCheckRight = false;
        }
        if (user.quyenHan !== 1) {
          isCheckRight = false;
        }
        if (!isCheckRight) {
          let result = window.confirm(
            'Bạn không có quyền được vào trang này. Vui lòng đồng ý để đăng nhập tài khoản có quyền hoặc hủy nếu muốn quay trở lại trang chủ!',
          );
          if (!result) {
            history.push('/');
          } else {
            history.push('/log-in');
          }
        }
      }
      })

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
