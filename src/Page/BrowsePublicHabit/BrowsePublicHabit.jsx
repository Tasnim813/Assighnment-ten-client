import React, { useEffect, useState } from 'react';
import Featurecart from '../Feturecart/Featurecart';
import Loading from '../../Loading/Loading';
import PublicHabitCard from '../PublicHabitCard/PublicHabitCard';

const BrowsePublicHabit = () => {
    const [habit,setHabit]=useState([])
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        fetch('http://localhost:3000/habit')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setHabit(data)
            setLoading(false)
        })
    },[])
    if(loading){
        return <Loading></Loading>
    }
    return (
        <div className='w-11/12 mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                habit.map(cart=><PublicHabitCard cart={cart}></PublicHabitCard>)
            }
            </div>
        </div>
    );
};

export default BrowsePublicHabit;