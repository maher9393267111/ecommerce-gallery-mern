import React, { useState, useEffect } from "react";
import Layout from "../core/layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);

// to use it as arguments to fetch all orders from database

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {  // fetch all orders
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setOrders(data); // orders data
            }
        });
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => { // fetch status values in order
            if (data.error) {
                console.log(data.error);
            } else {
                console.log(data);
                setStatusValues(data); // set all status here
            }
        });
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    //********************************************************** */



    // orders number show
    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };



    // show name : value and set this function in loop 

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );



// change status and update    
    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };


// show status i single order map and select to change and 
// update the status

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select
                className="form-control"
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout
            title="Orders"
            description={`G'day ${
                user.name
            }, you can manage all the orders here`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}


                {/* order information loop */}

                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo" }}
                            >
                                <h2 className="mb-5">
                                    <span className="bg-primary">
                                        Order ID: {o._id}
                                    </span>
                                </h2>

                                <ul className="list-group mb-2">
                                    <li className="list-group-item">
                                        {showStatus(o)}
                                    </li>
                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        {/* Ordered by: {o.user.name}  */}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>

                            {/* product information loop */}

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
};

export default Orders;