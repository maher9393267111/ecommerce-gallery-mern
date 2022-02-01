
import React from 'react'
import { Link } from 'react-router-dom';
import { API } from '../config';
import {signup}  from '../auth/index'
import { useState } from 'react';

import Layout from "../core/layout";
 function Signup() {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
});

const { name, email, password, success, error } = values;

//HANDLE INPUTS CHANGES

const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
};


//send data from form to database in signup api post

const clickSubmit = event => {
  event.preventDefault();
  setValues({ ...values, error: false });
  signup({ name, email, password }).then(data => {
      if (data.error) {
          setValues({ ...values, error: data.error, success: false });
      } else {
          setValues({
              ...values,
              name: '',
              email: '',
              password: '',
              error: '',
              success: true
          });
      }
  });
};


const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
        {error}
    </div>
);

const showSuccess = () => (
    <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
        New account is created. Please <Link to="/signin">Signin</Link>
    </div>
);









     

const signUpForm = () => (
    <form>
        <div className="form-group">
            <label className="text-muted">Name</label>
            <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
        </div>

        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
        </div>

        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
        </div>

        {/* onClick={clickSubmit} */}
        <button  onClick={clickSubmit}  className="btn btn-primary">
            Submit
        </button>
    </form>
);








    return (
  
    
    
    <div>

<Layout  title="Signup"
            description="Signup to Node React E-commerce App"
            className="container col-md-8 offset-md-2">


{ showError()}

{showSuccess()}

{signUpForm()}




</Layout>

 
  
    </div>
  
  
  
  
     )
  
  
  }
  
  export default Signup