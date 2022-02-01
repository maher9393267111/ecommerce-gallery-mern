import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/signup';
import Signin from './user/signin';
import PrivateRoute from './auth/PrivateRoute';
import Home from './core/Home.js'
import AdminDashboard from './user/AdminDashboard';
import Dashboard from './user/Dashboard'
import AdminRoute from './auth/AdminRoute';
import Menu  from './core/menu';
import AddCategory from './admin/AddCategory';
export default function (){
  return (


    

    <BrowserRouter>

   
      

      {/* <Menu/> */}

    



    <Switch>

    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />

                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

                <AdminRoute path="/create/category" exact component={AddCategory} />

    </Switch>
    
    

    
    
    </BrowserRouter>









  )
}
