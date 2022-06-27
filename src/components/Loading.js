import React from 'react';

function Loading(props) {
    let wait = document.getElementById("wait")
    return (
        <div className='relative'>
            <img alt="loading-gif" className='mx-auto' src='https://c.tenor.com/uhb_2I0x7G4AAAAC/anya-forger-anya-spy-x-family-anime.gif'/>
            <p id='wait' className='font-semibold 
            text-2xl  w-full text-center my-5 animate-pulse'>Now Loading...</p>
             {/* <p>Loading...</p> */}
        </div>
    );
}

export default Loading;