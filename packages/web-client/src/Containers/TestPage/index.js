// import React from 'react';
import 'antd/dist/antd.css';
// import { Layout, Menu, Breadcrumb } from 'antd';
// import {
//   DesktopOutlined,
//   PieChartOutlined,
//   FileOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from '@ant-design/icons';
import { Layout } from '../../Components/Layout';
import styled from 'styled-components';
// import TestContainer from './Components/TestComponent/TestContainerComponent'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import * as actions from './actions'

// const TestPage = (props) => {
//   // const dispatch = useDispatch();
//   // const onToggleStatus=async()=>{
//   //     dispatch(actions.onFetchListProductRequest());
//   // }

//   // const status =useSelector(state=>state.status);
//   // const lstProduct =useSelector(state=>state.lstProduct);
//   // console.log('lst',lstProduct);
//   // return (
//   //     <>
//   //         <h1>{props.title}</h1>
//   //         <TestContainer onToggleStatus={onToggleStatus}/>
//   //         {status?<h3>Có</h3>:null}
//   //     </>
//   // );
//   return (
//     <>
//       <DatePicker />
//     </>
//   );
// };

const StyledLayout = styled(Layout)`
  * {
    padding: 0;
  }
`;

const TestPage = () => {
  // const [collapsed, setCollapsed] = useState(false);

  // const onCollapse = () => {
  //   setCollapsed(!collapsed);
  // };

  return <StyledLayout/>;
  //   <Layout style={{ minHeight: '100vh' }}>
  //     <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
  //       <div className="logo" />
  //       <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
  //         <Menu.Item key="1" icon={<PieChartOutlined />}>
  //           Option 1
  //         </Menu.Item>
  //         <Menu.Item key="2" icon={<DesktopOutlined />}>
  //           Option 2
  //         </Menu.Item>
  //         <SubMenu key="sub1" icon={<UserOutlined />} title="User">
  //           <Menu.Item key="3">Tom</Menu.Item>
  //           <Menu.Item key="4">Bill</Menu.Item>
  //           <Menu.Item key="5">Alex</Menu.Item>
  //         </SubMenu>
  //         <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
  //           <Menu.Item key="6">Team 1</Menu.Item>
  //           <Menu.Item key="8">Team 2</Menu.Item>
  //         </SubMenu>
  //         <Menu.Item key="9" icon={<FileOutlined />}>
  //           Files
  //         </Menu.Item>
  //       </Menu>
  //     </Sider>
  //     <Layout className="site-layout">
  //       <Header className="site-layout-background" style={{ padding: 0 }} />
  //       <Content style={{ margin: '0 16px' }}>
  //         <Breadcrumb style={{ margin: '16px 0' }}>
  //           <Breadcrumb.Item>User</Breadcrumb.Item>
  //           <Breadcrumb.Item>Bill</Breadcrumb.Item>
  //         </Breadcrumb>
  //         <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
  //           Bill is a cat.
  //         </div>
  //       </Content>
  //       <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  //     </Layout>
  //   </Layout>
  // );
};

export default TestPage;
