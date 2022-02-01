import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Card from "./Card";

import { getCategories } from "./apiCore";

import Checkbox from "./Checkbox";


function Shop() {

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);



// fetch all category  here


const init = () => {
    getCategories().then(data => {
        if (data.error) {
            setError(data.error);
        } else {
            setCategories(data);
        }
    });
};


// fetch datawhen component is mounted

useEffect(() => {
    init();
    // loadFilteredResults(skip, limit, myFilters.filters);
}, []);







  return (

<Layout  title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid">



 {/* row  */}

<div className="row">
    
{/* left section col-4 */}
    
  <div className="col-4">


<Checkbox categories={categories} />


  </div>



{/* left section col-8 */}


<div className="col-8">


right  {init()}


</div>

</div>




</Layout>





  )
}

export default Shop;
