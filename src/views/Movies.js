import React from 'react';
import MoviesComp from '../components/MoviesComp';

function Movies(props) {
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl font font-semibold mb-10'>Anime Movies</h1>
            <MoviesComp />   
        </div>
    );
}

export default Movies;