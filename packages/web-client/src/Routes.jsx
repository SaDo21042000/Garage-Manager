import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Containers/HomePage';
import CustomerPage from './Containers/CustomerPage';
import Layout from './Components/Layout';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/customer" component={CustomerPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
