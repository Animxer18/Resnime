import React from 'react';
import BackButton from '../components/BackButton';
import MoviesComp from '../components/MoviesComp';

function Movies(props) {
    return (
        <div className='container  mx-auto px-5 flex flex-col space-y-10'>
            <div className='mt-10'>
                <BackButton />
            </div>
            <div className='card'>
                <h1 className='text-4xl font font-semibold mb-4'>Movies</h1>
                <div className='line'></div>
                <MoviesComp />   
            </div>
        </div>
    );
}

export default Movies;