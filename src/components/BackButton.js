import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton(props) {
    const navigate = useNavigate()

    return (
            <button onClick={()=>navigate(-1)} className='px-4 py-2 border border-black rounded-md'><i className='bx bx-arrow-back' ></i></button>
    );
}

export default BackButton;