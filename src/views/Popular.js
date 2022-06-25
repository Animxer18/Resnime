import React from 'react';
import PopularAnimeComp from '../components/PopularAnimeComp';

function Popular(props) {
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl font font-semibold mb-10'>Popular</h1>
            <PopularAnimeComp />
        </div>
    );
}

export default Popular;