import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Containers/HomePage';
import CustomerPage from './Containers/CustomerPage';
import { SaleReportPage, SaleReportForm } from './Containers/SaleReportPage';
import BaoCaoTon from './Containers/BaoCaoTon';
import FormBaoCaoTon from './Containers/FormBaoCaoTon';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/customer" component={CustomerPage} />
          <Route path="/sales-report-page" component={SaleReportPage} />
          <Route path="/sales-report-form" component={SaleReportForm} />
          <Route path="/inventory-report-page" component={BaoCaoTon} />
          <Route path="/inventory-report-form" component={FormBaoCaoTon} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
