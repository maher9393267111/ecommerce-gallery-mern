


import React from 'react';
import ShowImage from './ShowImage';

function Card({product}) {
  return(

<div className='card'>
 

{/* card header */}

<div className='card-header'>
    {product.name}
</div>


{/* card body  */}

 <div className='card-body'>
 <ShowImage item={product} url="product" />

 <p className="card-p  mt-2">{product.description.substring(0, 100)} </p>
        <p className="card-p black-10">$ {product.price}</p>
        <p className="black-9">Category: {product.category && product.category.name}</p>





 </div>




    
</div>





  ) 
}

export default Card;
