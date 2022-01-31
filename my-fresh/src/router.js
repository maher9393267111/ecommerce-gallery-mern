import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/signup';
import Signin from './user/signin';

import Home from './core/Home.js'


import Menu  from './core/menu';

export default function (){
  return (


    

    <BrowserRouter>

   
      

      {/* <Menu/> */}

    



    <Switch>

    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />



    </Switch>
    
    

    
    
    </BrowserRouter>









  )
}
