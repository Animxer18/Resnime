import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';



function CardAnime(anime) {
    let navigate = useNavigate()

    //function for open link of anime's detail
    const detailAnimeLink = async(id)=>{
        // let idSlice
        
        // if(id.toLowerCase().match("-season-")){
        //     idSlice = id.slice(0,-20) 
        //     console.log(id)
        // }else{
        //     if(id.toLowerCase().match("episode")){
        //         idSlice = id.slice(0,-11)
        //     }else {
        //         idSlice = id
        //     }
        // }
        // if(id.toLowerCase().match("one-piece")){
        //     if(id.toLowerCase().match("episode")){
        //         idSlice = id.slice(0,-13)
        //     }else {
        //         idSlice = id
        //     }
        // }
        // if(id.toLowerCase().match("nd-")){
        //     idSlice = id.slice(0,-11)
        // }
        // if(id.toLowerCase().match('mokuteki-wo')){
        //     idSlice = id.slice(0,-10)
        // }
        // console.log("it's not get it ?",idSlice)
        
        navigate(`/anime/${id}`)
    }

    

   


   

   
    return (
        <>
            <div onClick={()=>detailAnimeLink(anime.id)} >
                <div className=''>
                    <div className='group w-44 mx-auto overflow-hidden bg-slate-400'>
                        <img className='w-full  hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100' src={anime.thumbnail} alt={anime.titleAnime}/>
                    </div>

                </div>
                <h2 className='text-xl line-clamp-2'>{anime.titleAnime}</h2>
                    {anime.episode ?
                    (<p>{anime.episode} </p>):
                    ("")} 
                    {anime.release ?
                    (<p>Released : {anime.release}</p>):
                    ("")} 
            </div>
            
           
        </>
            
    );
}

export default CardAnime;