import React from 'react';
import { Link, Outlet} from 'react-router-dom';

function Navbar() {
    return (
        <>
            <div className='bg-blue-500 text-white w-full'>
                <div className='container flex justify-between mx-auto'>
                    <div className='flex space-x-5'>
                        <Link to="/" className='py-5'>Home</Link>
                        <Link to="/search" className='py-5'>Genre</Link>
                    </div>
                    <Link to="/search" className='py-5'>Search</Link>

                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Navbar;