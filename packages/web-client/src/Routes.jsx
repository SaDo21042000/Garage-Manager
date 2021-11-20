import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ImportAccessary from './Containers/AccessaryPage/ImportAccessary';
import ListAccessary from './Containers/AccessaryPage/ManagerList';
import ListWage from './Containers/Wage/ManagerList';
import Layout from './Components/Layout';
import HomePage from './Containers/HomePage';
import { LogIn, SignUp } from './Containers/LogIn';
import { CarList, CarReception, Bill } from './Containers/CarManagement';
import { RepairForm, RepairPage } from './Containers/RepairManagement';
import { SaleReportPage, SaleReportForm } from './Containers/SaleReportPage';
import { InventoryReport, InventoryReportForm } from './Containers/InventoryPage';
import SettingPage from './Containers/SettingPage';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/sales-report-page" component={SaleReportPage} />
          <Route path="/sales-report-form" component={SaleReportForm} />
          <Route path="/car-list" component={CarList} />
          <Route path="/car-reception" component={CarReception} />
          <Route path="/repair-form" component={RepairForm} />
          <Route path="/repair-page" component={RepairPage} />
          <Route path="/bill" component={Bill} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/inventory-report-page" component={InventoryReport} />
          <Route path="/inventory-report-form" component={InventoryReportForm} />
          <Route path="/setting" component={SettingPage} />
          <Route path="/import-accessary" component={ImportAccessary} />
          <Route path="/list-accessary" component={ListAccessary} />
          <Route path="/wage" component={ListWage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
