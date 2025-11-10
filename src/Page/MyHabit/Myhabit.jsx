import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';

import Habit from './Habit';

const Myhabit = () => {
  const {user}=useContext(AuthContext)
  const[model,setModel]=useState([])
  useEffect(()=>{
    fetch(`http://localhost:3000/my-habit?email=${user.
email}`)
.then(res=>res.json())
.then(data=>{
  console.log(data)
  setModel(data)
})
  },[user])
  return (
    <div>
      {
        model.map(cart=><Habit cart={cart}></Habit> )
      }
     
        
    </div>
  );
};

export default Myhabit;
