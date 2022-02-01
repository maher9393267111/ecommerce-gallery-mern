import {API} from '../config'

export const  signup =user => {


return fetch(`${API}/signup`,{


method:'POST',

headers:{

accept:'application/json',

'Content-Type': 'application/json'

},


// form field send in json {user}

body:JSON.stringify(user)



})

// after fetch api from backend and send user data from user


.then( response => {
return response.json()


})

//catch error 

.catch(err => {
    console.log(err);
});



}


// login in api



export const signin = user => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};



// save token of user  when user login in localstorage

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
    }
};



//  check if user is login and show conditional signin and signout

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};



