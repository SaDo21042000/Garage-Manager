import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './Containers/HomePage';
import CustomerPage from './Containers/CustomerPage';
import Layout from './Components/Layout';
import { SaleReportPage, SaleReportForm } from './Containers/SaleReportPage';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/customer" component={CustomerPage} />
          <Route path="/sales-report-page" component={SaleReportPage} />
          <Route path="/sales-report-form" component={SaleReportForm} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
