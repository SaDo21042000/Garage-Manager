<<<<<<< HEAD
import React from 'react';
import Routes from './Routes';

const App = () => {
  return <Routes />;
=======
import { Layout } from 'antd';
import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './Components';
import BaoCaoTon from './Containers/BaoCaoTon';
import FormBaoCaoTon from './Containers/FormBaoCaoTon';

const App = () => {
  const { Content } = Layout;

  return (
    <Switch>
      <Fragment>
        <Layout
          style={{
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            maxWidth: '100vw',
          }}
        >
          <Navbar />
          <Content>
            <Route path="/report" component={() => <BaoCaoTon />} />
            <Route path="/add/report" component={FormBaoCaoTon} />
          </Content>
        </Layout>
      </Fragment>
    </Switch>
  );
>>>>>>> 47fb247 (feat: Báo cáo tồn & Form tạo báo cáo tồn)
};

export default App;
