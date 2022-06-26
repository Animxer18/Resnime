import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommentsComp from '../components/CommentsComp'
function Comments(props) {
    const navigate = useNavigate()
    return (
        <div className='container mx-auto px-5 flex flex-col space-y-10'>
            <div className='mt-10'>
                <button onClick={()=>navigate(-1)} className='px-4 py-2 border border-black rounded-md'><i class='bx bx-arrow-back' ></i></button>
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