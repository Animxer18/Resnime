import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import CommentsComp from '../components/CommentsComp'
function Comments(props) {
    return (
        <div className='container mx-auto px-5 flex flex-col space-y-10'>
            <div className='mt-10'>
                <BackButton />
            </div>
            <div className=' card'>
                <h1 className='text-4xl font font-semibold mb-4'>Komentar</h1>
                <div className='line'></div>
                <CommentsComp />
            </div>
        </div>
    );
}

export default Comments;