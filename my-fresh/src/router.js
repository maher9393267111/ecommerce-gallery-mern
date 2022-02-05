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
import AddProduct from './admin/AddProduct';
import Cart from './core/Cart';
import Profile from './user/Profile';
import Product from './core/Product';
import Order from './admin/Order';
import Shop from './core/Shop';
import UpdateProduct from './admin/UpdateProduct';
import ManageProducts from "./admin/ManageProducts"
export default function (){
  return (


    

    <BrowserRouter>

   
      

      {/* <Menu/> */}

    



    <Switch>

    <Route path="/" exact component={Home} />

    <Route path="/product/:productId" exact component={Product} />


    <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />

                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />

                <AdminRoute path="/create/category" exact component={AddCategory} />
                  
                <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />
                <AdminRoute path="/admin/products" exact component={ManageProducts} />
               
                   
                <AdminRoute path="/create/product" exact component={AddProduct} />

                <AdminRoute path="/admin/orders" exact component={Order} />


                <Route path="/shop" exact component={Shop} />


                <Route path="/cart" exact component={Cart} />


                <PrivateRoute path="/profile/:userId" exact component={Profile} />

    </Switch>
    
    

    
    
    </BrowserRouter>









  )
}
