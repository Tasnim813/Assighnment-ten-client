import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import PublicHabitCard from '../PublicHabitCard/PublicHabitCard';
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
  },[])
  return (
    <div>
      {
        model.map(cart=><Habit cart={cart}></Habit> )
      }
      {/* {
        model.map(cart=><PublicHabitCard cart={cart}></PublicHabitCard>)
      } */}
        
    </div>
  );
};

export default Myhabit;
