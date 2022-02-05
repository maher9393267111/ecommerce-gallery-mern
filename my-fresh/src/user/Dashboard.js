
import React, { useState, useEffect } from "react";

import Layout from "../core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";

import moment from "moment";

export default function Dashboard() {

    const [history, setHistory] = useState([]);

//user information that in localsorage after user signin
// token well generated and have token an user info

    const {  user: { _id, name, email, role }  } = isAuthenticated(); //user info
    const token = isAuthenticated().token;   //user token


    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);





// user cart link and update his info link

const userLinks = () => {
    return (
        <div className="card">
            <h4 className="card-header">User Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">
                        My Cart
                    </Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to={`/profile/${_id}`}>
                        Update Profile
                    </Link>
                </li>
            </ul>
        </div>
    );
};



// show this login user his information


const userInfo = () => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">
                    {role === 1 ? "Admin" : "Registered User"}
                </li>
            </ul>
        </div>
    );
};




const purchaseHistory = history => {
    return (
        <div className="card mb-5">
            <h3 className="card-header">Purchase history</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    {history.map((h, i) => {
                        return (
                            <div>
                                <hr />
                                {h.products.map((p, i) => {
                                    return (
                                        <div key={i}>
                                            <h6>Product name: {p.name}</h6>
                                            <h6>
                                                Product price: ${p.price}
                                            </h6>
                                            <h6>
                                                Purchased date:{" "}
                                                {moment(
                                                    p.createdAt
                                                ).fromNow()}
                                            </h6>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </li>
            </ul>
        </div>
    );
};








  return (

<Layout  title="Dashboard"
            description={`G'day ${name}!`} // send user name to show in header of page 
            className="container-fluid" >


<div className="row">

    {/* //links col */}
                <div className="col-3">{userLinks()}</div>

            {/* user info col */}

                <div className="col-9">
                    {userInfo()}
                  {purchaseHistory(history)}
                </div>
            </div>



</Layout>






  ) }
