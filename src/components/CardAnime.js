import React from 'react';
import { useNavigate } from 'react-router-dom';

function CardAnime(anime) {
    let navigate = useNavigate()
    //function for open link of anime's detail
    const detailAnimeLink = async(id)=>{
        let idSlice

            
        if(id.toLowerCase().match("-season-")){
            idSlice = id.slice(0,-20) 
            console.log(id)
        }else{
            if(id.toLowerCase().match("episode")){
                idSlice = id.slice(0,-11)
            }else {
                idSlice = id
            }
        }
        if(id.toLowerCase().match("one-piece")){
            if(id.toLowerCase().match("episode")){
                idSlice = id.slice(0,-13)
            }else {
                idSlice = id
            }
        }
        
        navigate(`/anime/${idSlice}`)
    }
    return (
            <div onClick={()=>detailAnimeLink(anime.id)} >
                <div className='group overflow-hidden bg-slate-400'>
                    <img className='w-full hover:scale-110 transition-all duration-300 opacity-50 group-hover:opacity-100' src={anime.thumbnail} alt={anime.titleAnime}/>
                </div>
                <h3 className='text-2xl'>{anime.titleAnime}</h3>
                <p>{anime.episode} episodes</p>
            </div>
    );
}

export default CardAnime;