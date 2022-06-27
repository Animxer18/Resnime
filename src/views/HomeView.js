import React from 'react';
import MoviesComp from '../components/MoviesComp';
import PopularAnimeComp from '../components/PopularAnimeComp';
import TopAiringComp from '../components/TopAiringComp';

function HomeView(props) {
    
    return (
        <div className='container mx-auto px-5 flex flex-col space-y-10'>

            <div className='card' id='popular'>
                <h1 className='text-4xl hp:text-2xl sm:text-3xl font font-semibold mb-4'>Popular Anime</h1>
                <div className='line'></div>
                <PopularAnimeComp />
            </div>
            
            <div className='card'  id='top_airing'>
                <h1 className='text-4xl hp:text-2xl sm:text-3xl font font-semibold mb-4'>Top Airing</h1>
                <div className='line'></div>
                <TopAiringComp />
                
            </div>
            
            <div className='card' id='movies'>
                <h1 className='text-4xl hp:text-2xl sm:text-3xl font font-semibold mb-10'>Anime Movies</h1>
                <div className='line'></div>
                <MoviesComp />
            </div>
        </div>
    );
}

export default HomeView;