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
    const [limit, setLimit] = useState(2);  // to show what number of products in the page
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
   console.log(newFilters);

// newFilters is  req.body.filters in backend  category: [
  //  '61f93db86c4cb6d4fee2432f',
 //   '61f68e2dfe708a16b94eb7d1',
   // '61f93ddb6c4cb6d4fee24332'//


//  req.filters  { category: [ '61f68e2dfe708a16b94eb7d1' ], price: [ 40, 99 ] }
// 6  req.limit



  getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
          setError(data.error);
      } else {

        // data that come after filter products from database

             console.log(data);

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

  // set this myfilters.filters as argument to filter data cat price
   loadFilteredResults(myFilters.filters);


    // update myfiltrs from inputs after that push myfilters.filter as arg to api search
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




const loadMore = () => {
  let toSkip = skip + limit;
    console.log(myFilters.filters);
  getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
          setError(data.error);
      } else {
          setFilteredResults([...filteredResults, ...data.data]);

          console.log(data.data );
          setSize(data.size);
          setSkip(toSkip);
      }
  });
};

const loadMoreButton = () => {
  return (
      size > 0 &&
      size >= limit && (
          <button onClick={loadMore} className="btn btn-warning mb-5">
              Load more
          </button>
      )
  );
};














// fetch datawhen component is mounted

useEffect(() => {
    init();
     loadFilteredResults(skip, limit, myFilters.filters); //  myFilters.filters meaning price array and category array
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
                    {loadMoreButton()}
                </div>







</div>




</Layout>





  )
}

export default Shop;
