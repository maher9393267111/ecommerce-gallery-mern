

import { Link, withRouter } from "react-router-dom";
import React, { Fragment } from "react";
import { signout, isAuthenticated } from "../auth";

import { itemTotal } from "./CartHelper";
const isActive = (history, path) => {


// from localstorage

    


    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};





 function Menu({history}){ 
    
   
   
  

  return (
  
  <div>

<ul className="bg-primary  nav nav-tabs " style={{height:'85px'}} >

<li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    Home 
                </Link>

                </li>

    {/* Shop link */}

                <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    Shop
                </Link>

                </li>



            {/* <li className="nav-item"> 
                <Link
                    className="nav-link"
                    style={isActive(history, "/profile/:userId")}
                    to={`/profile/${_id}`}
                >
                    user Profile
                </Link>

                </li>   */}







  {/* Cart  */}

  <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/cart")}
                    to="/cart"
                >
                    Cart{" "}
                    <sup>
                        <small className="cart-badge">{itemTotal()}</small>
                    </sup>
                </Link>
            </li>






     {/* if user role =0  show user dashboard page */}

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                      user Dashboard
                    </Link>
                </li>
            )}



        {/* if user role =1  show admin dashboard page */}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                       Admin Dashboard
                    </Link>
                </li>
            )}


{isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/orders")}
                        to="/admin/orders"
                    >
                       Orders page
                    </Link>
                </li>
            )}










{/*  if user not login yet show signin and signup */}



{!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            Signin
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            Signup
                        </Link>
                    </li>
                </Fragment>
            )}


    {/* if user is login in show only {sign out} */}


    {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        Signout
                    </span>
                </li>
            )}

 
    














</ul>




  </div>)
}



export default withRouter(Menu);