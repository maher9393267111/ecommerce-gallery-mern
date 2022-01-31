

import { Link, withRouter } from "react-router-dom";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};





export default function Menu({history}){ 
    

   
  

  return (
  
  <div>

<ul className="nav nav-tabs bg-primary">

<li className="nav-item">
<Link to ='signin' style={isActive(history,'/')} />

Home
    </li>
    

    <li className="nav-item">
<Link to ='signin' style={isActive(history,'/signp')} />

signup
    </li>
    



    <li className="nav-item">
<Link to ='signin' style={isActive(history,'/signin')} />

signIn
    </li>
    







</ul>




  </div>)
}



withRouter(Menu);