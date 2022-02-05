const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { CLIENT_RENEG_LIMIT } = require('tls');



// CREATE PRODUCT

// create products we have to install // formidable // package
exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        // PRODUCT CREATED TO SAVE IN DATABASE 

        let product = new Product(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);  //read path pf this photo
            product.photo.contentType = files.photo.type;  //png gpg .....
        }

        product.save((err, result) => {   //save new product in database
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);  // saved product in database
        });
    });
};



// Read spcefic product by his ID
exports.productById = (req, res, next, id) => {
    Product.findById(id)
        .populate('category') // >>>>> show this product with that id that related to this catdgory id
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};



// remove by specefic product id



exports.remove = (req, res) => {
    let product = req.product;   // >>>> prodctId in the req
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};



 /// product update



 
exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = req.product; // come from product id {info}

        // all fields value well be product values {{update product}}
        product = _.extend(product, fields); // _.extend coming from lodash package 

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = files.photo.type;
        }


        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};





   // SORT BY QUERY show list of products
   // sort by new products or sold or quantity choose what you want
   exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';  // ?order
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';  // ?sortBy
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;  // ? limit

    Product.find()
        .select('-photo')
          .populate('category')   // well show category model details without populate well show just category id that we passed in product category field
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};



exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;


// find products from same  category that we passed in req  and dont show the product 
// we passed his id in req beacuse we want to show the related products to this productt
// not the product himself

   console.log(req.product);
   console.log(req.product.category);

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};


// show  only All category field from product model  //


exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);
    });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */


// check box and radion input make filter to products in frontend by category and price

// in {shop} component to make filter to products by price and by category

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

     console.log(order, sortBy, limit, skip, req.body.filters);
     console.log("findArgsss", findArgs);
console.log(limit);
console.log(req.body.filters);
console.log(limit);
console.log(req.body.order);

 // key is price or category
 // req.body.filters is filters array that based from frontend

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};


 // used in home page search to procucts by his name and by select his related category
exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
 
console.log(req.query.search);


        // https://www.geeksforgeeks.org/mongodb-regex/
   // i: in options To match both lower case and upper case pattern in the string.
   // { <field>: { $regex: /pattern/, $options: '<options>' } }


                     // {{$regex}} to search any word fro
                     //req.query.search in products database and show it
                     //  based any word or charcter from the poduct name to found product
        query.name = { $regex: req.query.search, $options: 'i' };


        // assigne category value to query.category

           // if not all category selected search to products
           // well be related to his category or well be not found

        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo');
    }
};



// change product quantity and sold when useer make order

exports.decreaseQuantity = (req, res, next) => {

// products in cart then in order make map to change quantity and sold number

    let bulkOps = req.body.order.products.map(item => { 
        return {
            updateOne: {
                filter: { _id: item._id }, // single product find by id

                // then update quantity to be -- and sold ++
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    
    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next();
    });
};