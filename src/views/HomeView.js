import React from 'react';
import MoviesComp from '../components/MoviesComp';
import PopularAnimeComp from '../components/PopularAnimeComp';
import RecentRelease from '../components/RecentRelease';
import TopAiringComp from '../components/TopAiringComp';

function HomeView(props) {
    
    return (
        <div className='container mx-auto'>
            {/* <div className='my-5'>
                <h1 className='text-4xl font font-semibold mb-10'>Recent Released</h1>
                <RecentRelease />
            </div> */}

            <div className='my-5 scroll-my-20' id='popular'>
                <h1 className='text-4xl font font-semibold mb-10'>Popular Anime</h1>
                <PopularAnimeComp />
            </div>

            <div className='border-b-2 border-black py-5'>
            </div>
            
            <div className='my-5 scroll-my-20'  id='top_airing'>
                <h1 className='text-4xl font font-semibold mb-10'>Top Airing</h1>
                <TopAiringComp />
                
            </div>
            
            <div className='border-b-2 border-black py-5'>
            </div>
            
            <div className='my-5 scroll-my-20' id='movies'>
            <h1 className='text-4xl font font-semibold mb-10'>Anime Movies</h1>
                <MoviesComp />
            </div>
        </div>
    );
}

export default HomeView;