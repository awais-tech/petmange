/* eslint-disable import/no-extraneous-dependencies */

import { Route, Switch } from 'react-router';
import Login from './Login';
import Signup from './signup';
import AdminDashborad from './admindashborad';
import User from './ViewUsers';
import Doctor from './Doctors';
import Food from './Food';
import Vaccines from './Vacines';
import Accessories from './Accesories';
import Orders from './Orders';
import Home from './Home';
import AddEditProduct from './AddProduct';
import EditProduct from './EditProduct';
import PrivateRoute from './Privateroute';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/Admin" component={Home} />
        <PrivateRoute exact path="/User/:id?" component={User} />
        <PrivateRoute exact path="/Doctor" component={Doctor} />
        <PrivateRoute exact path="/Food" component={Food} />
        <PrivateRoute exact path="/Vaccines" component={Vaccines} />
        <PrivateRoute exact path="/Accessories" component={Accessories} />
        <PrivateRoute exact path="/Orders" component={Orders} />
        <PrivateRoute
          exact
          path="/AddEditProduct/:id"
          component={AddEditProduct}
        />
        <PrivateRoute
          exact
          path="/EditProduct/:id/:keys"
          component={EditProduct}
        />

        {/* <Route exact path="/" component={AllProducts} />
        <Route exact path="/Cart" component={Cart} />
        <Route exact path="/Orders" component={Orders} /> */}
      </Switch>
    </>
  );
}

export default App;
