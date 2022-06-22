import React from 'react';
import RecentRelease from '../components/RecentRelease';

function HomeView(props) {
    return (
        <div className='container mx-auto'>
            <div className='my-5'>
                <h1 className='text-4xl font font-semibold mb-10'>Recent Released</h1>
                <RecentRelease />
            </div>
        </div>
    );
}

export default HomeView;