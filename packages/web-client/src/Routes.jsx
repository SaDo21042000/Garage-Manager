import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './Components/Layout';
import HomePage from './Containers/HomePage';
import CustomerPage from './Containers/CustomerPage';
import { SaleReportPage, SaleReportForm } from './Containers/SaleReportPage';
import { InventoryReport, InventoryReportForm } from './Containers/InventoryPage';
import Receipt from './Containers/Receipt';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/customer" component={CustomerPage} />
          <Route path="/sales-report-page" component={SaleReportPage} />
          <Route path="/sales-report-form" component={SaleReportForm} />
          <Route path="/inventory-report-page" component={InventoryReport} />
          <Route path="/inventory-report-form" component={InventoryReportForm} />
          <Route path="/receipt" component={Receipt} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
