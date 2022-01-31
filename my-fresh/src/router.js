import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/signup';
import Signin from './user/signin';

import Home from './core/Home.js'


export default function (){
  return (

<div>
    

    <BrowserRouter>
    
    <Switch>

    <Route path="/" exact component={Home} />
    <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />



    </Switch>
    
    

    
    
    </BrowserRouter>






</div>


  )
}
