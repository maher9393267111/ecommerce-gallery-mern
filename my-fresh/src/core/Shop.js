import React, { useState, useEffect } from "react";
import Layout from "./layout";
import Card from "./Card";

import { prices } from "./fixedPrices";

 import { getCategories ,getFilteredProducts} from "./apiCore";

import RadioBox from "./RadioBox";

import Checkbox from "./Checkbox";


function Shop() {


  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
});

    // const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);


    const [values, setValues] = useState({  categories: [], });


  const {categories} = values






// fetch all category  here to send it to checkbox component


const init = () => {
    getCategories().then(data => {
         if (data.error) {
             setError(data.error);
         }
       
         setValues({
        
          categories: data} )
         
        
    });
};





const loadFilteredResults = newFilters => {
  // console.log(newFilters);
  getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
          setError(data.error);
      } else {
          setFilteredResults(data.data);
          setSize(data.size);
          setSkip(0);
      }
  });
};









//this function to push checkbox that checked from
// checkbox component that have category names in myfilters variable above

// check radio component to push checked radio input into price object in myfilters

const handleFilters = (filters, filterBy) => {
  // console.log("SHOP", filters, filterBy);
  const newFilters = { ...myFilters };
  newFilters.filters[filterBy] = filters;

  if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
  }
   loadFilteredResults(myFilters.filters);
  setMyFilters(newFilters);
};

const handlePrice = value => {
  const data = prices;
  let array = [];

  for (let key in data) {
      if (data[key]._id === parseInt(value)) {
          array = data[key].array;
      }
  }
  return array;
};





// fetch datawhen component is mounted

useEffect(() => {
    init();
     loadFilteredResults(skip, limit, myFilters.filters);
}, []);







  return (

<Layout  title="Shop Page"
            description="Search and find books of your choice"
            className="container-fluid">



 {/* row  */}

<div className="row">
    
{/* left section col-4 */}
    
  <div className="col-4">


{/* category filter */}

<Checkbox  handleFilters={filters =>
                                handleFilters(filters, "category")
                            } categories={categories} />



{/* prices filter */}

<RadioBox  handleFilters={filters =>
                                handleFilters(filters, "price")
                            } prices={prices} />



  </div>



{/* left section col-8 */}


<div className="col-8">

<h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <div key={i} className="col-4 mb-3">
                                <Card product={product} />
                            </div>
                        ))}
                    </div>
                    <hr />
                    {/* {loadMoreButton()} */}
                </div>







</div>




</Layout>





  )
}

export default Shop;
