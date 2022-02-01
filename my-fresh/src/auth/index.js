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

