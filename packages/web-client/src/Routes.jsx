import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LookUp, TiepNhanXe, RepairPage, RepairManagement, Bill } from './CarManagement';
import { LogIn, SignUp} from './LogIn';
import Layout from './Components/Layout';

function Routes() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
        <Route path="/look-up" component={LookUp} />
          <Route path="/tiep-nhan-xe" component={TiepNhanXe} />
          <Route path="/repair-page" component={RepairPage} />
          <Route path="/repair-management" component={RepairManagement} />
          <Route path="/bill" component={Bill} />
          <Route path="/log-in" component={LogIn} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default Routes;
