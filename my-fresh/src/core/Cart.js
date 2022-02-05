import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './layout';
import { getCart } from './CartHelper';
import Card from './Card';

import Checkout from './Checkout';
;



const Cart = () => {

    const [items, setItems] = useState([]); // empty array to set all products from localstorage
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);




// show cart items make map to card component layouy
const showItems = items => {
    return (
        <div>
            <h2>Your cart has {`${items.length}`} items</h2>
            <hr />
            {items.map((product, i) => (
                <Card
                    key={i}
                    product={product}
                    showAddToCartButton={false}
                    cartUpdate={true}
                    showRemoveProductButton={true}
                     setRun={setRun}
                     run={run}
                />
            ))}
        </div>
    );
};



// if no products added to car show message


const noItemsMessage = () => (
    <h2>
        Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
);






  return (
<Layout title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid">




<div className="row">

{/* if products in cart length 0 show empty message */}

<div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>






 {/* checkut component section */}
     
<div className='col-6'>
    
<Checkout  products={items}/>


</div>
     


</div>



</Layout>

  )
};

export default Cart;
