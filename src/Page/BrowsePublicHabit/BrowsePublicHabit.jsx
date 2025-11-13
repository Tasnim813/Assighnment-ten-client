import React, { useEffect, useState } from 'react';
import Featurecart from '../Feturecart/Featurecart';
import Loading from '../../Loading/Loading';
import PublicHabitCard from '../PublicHabitCard/PublicHabitCard';

const BrowsePublicHabit = () => {
    const [habit, setHabit] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(""); // search এর জন্য state

    useEffect(() => {
        fetch('https://habit-tracker-server-six.vercel.app/habit')
            .then(res => res.json())
            .then(data => {
                setHabit(data);
                setLoading(false);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchText) return;

        setLoading(true);
        fetch(`https://habit-tracker-server-six.vercel.app/search?search=${searchText}`)
            .then(res => res.json())
            .then(data => {
                setHabit(data); // search result কে state এ রাখলেই UI আপডেট হবে
                setLoading(false);
            });
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='w-11/12 mx-auto mb-10'>
            <h1 className='text-5xl text-center font-bold mt-5 mb-5'>All Habit</h1>
            <form onSubmit={handleSubmit} className='text-center mt-5 mb-10 flex justify-center gap-0'>
                <label className="input  flex items-center">
                    <svg className="h-[1em] opacity-50 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input
                        name='search'
                        type="search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        required
                        placeholder="Search"
                        className='outline-none px-2 py-1'
                    />
                </label>
                <button className='btn btn-secondary '>Search</button>
            </form>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {habit.length > 0 ? habit.map(cart => (
                    <PublicHabitCard key={cart._id} cart={cart} />
                )) : <p className="text-center col-span-full font-bold  text-2xl">No habits found</p>}
            </div>
        </div>
    );
};

export default BrowsePublicHabit;
