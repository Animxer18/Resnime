import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';



function CardAnime(anime) {
    let navigate = useNavigate()

    //function for open link of anime's detail
    const detailAnimeLink = async(id)=>{
        navigate(`/anime/${id}`)
    }

    return (
        <>
            <div onClick={()=>detailAnimeLink(anime.id)} >
                <div className=''>
                    <div className='group w-44 hp:w-28 mx-auto overflow-hidden bg-slate-400'>
                        <img className='w-full   hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100' src={anime.thumbnail} alt={anime.titleAnime}/>
                    </div>

                </div>
                <h2 className='text-xl hp:text-lg line-clamp-2'>{anime.titleAnime}</h2>
                    {anime.episode ?
                    (<p className='hp:text-sm'>{anime.episode} </p>):
                    ("")} 
                    {anime.release ?
                    (<p className='hp:text-sm'>Released : {anime.release}</p>):
                    ("")} 
            </div>
            
           
        </>
            
    );
}

export default CardAnime;