import React, { useState } from "react";

function Checkbox({categories}) {

    const [checked, setCheked] = useState([]);


const handleToggle = c => () =>{

const currendid = checked.indexOf(c);

const newchecked = [...checked];


if (currendid === -1) {

newchecked.push(c)



}


else {

newchecked.slice(currendid,1)


}

setCheked(newchecked)

console.log(checked);

}



  return  categories.map((c, i) => (
    <li key={i} className="list-unstyled">
        <input
             onChange={handleToggle(c._id)}
             value={checked.indexOf(c._id === -1)}
            type="checkbox"
            className="form-check-input"
        />
        <label className="form-check-label">{c.name}</label>
    </li>
));
}

export default Checkbox;
