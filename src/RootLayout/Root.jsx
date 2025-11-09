import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Component/Navbar';
import Footer from '../Page/Footer/Footer';

const Root = () => {
    return (
        <div className='flex flex-col min-h-screen'>
           
            <Navbar></Navbar>
            <div className='flex-1'>
                <Outlet className='max-w-11/12 mx-auto'></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Root;