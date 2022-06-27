import React from 'react';
import BackButton from '../components/BackButton';
import PopularAnimeComp from '../components/PopularAnimeComp';

function Popular(props) {
    return (
        <div className='container mx-auto px-5 flex flex-col space-y-10'>
            <div className='mt-10'>
                <BackButton />
            </div>
            <div className=' card'>
                <h1 className='text-4xl font font-semibold mb-4 hp:text-2xl sm:text-3xl'>Popular</h1>
                <div className='line'></div>
                <PopularAnimeComp />
            </div>
        </div>
    );
}

export default Popular;