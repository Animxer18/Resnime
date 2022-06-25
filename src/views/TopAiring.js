import React from 'react';
import TopAiringComp from '../components/TopAiringComp' 
function TopAiring(props) {
    return (
        <div className='container mx-auto'>
            <h1 className='text-4xl font font-semibold mb-10'>Top Airing</h1>
            <TopAiringComp />
        </div>
    );
}

export default TopAiring;