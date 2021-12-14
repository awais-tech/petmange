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

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/Admin" component={Home} />
        <Route exact path="/User/:id?" component={User} />
        <Route exact path="/Doctor" component={Doctor} />
        <Route exact path="/Food" component={Food} />
        <Route exact path="/Vaccines" component={Vaccines} />
        <Route exact path="/Accessories" component={Accessories} />
        <Route exact path="/Orders" component={Orders} />
        <Route exact path="/AddEditProduct/:id" component={AddEditProduct} />
        <Route exact path="/AddEditProduct/:id/:key" component={EditProduct} />

        {/* <Route exact path="/" component={AllProducts} />
        <Route exact path="/Cart" component={Cart} />
        <Route exact path="/Orders" component={Orders} /> */}
      </Switch>
    </>
  );
}

export default App;
