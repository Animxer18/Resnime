import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardAnime from './CardAnime';
import Loading from './Loading';

function TopAiringComp() {
    let [topAiring,setTopAiring] = useState([])
    let [loading,setLoading] = useState([])

    //function fetch TopAiring release anime
    const fetchDataTopAiring = async()=>{
        let response = await axios.get("https://raznime.herokuapp.com/top-airing")
        setTopAiring(response.data)
        setLoading(false)
    }
    
   

    //mounted while page loaded
    useEffect(
        ()=>{
            fetchDataTopAiring()
        },[]
    )
    return (
        <div>
            {loading ?(
                <Loading />
            ):(
            <div className='grid grid-cols-2 lg:grid-cols-5 sm:grid-cols-3 gap-x-5 gap-y-10'>
                {topAiring.map(
                    (top)=>{
                        return (
                            <div className="cursor-pointer " key={top.animeId}>
                                
                                <CardAnime 
                                id={top.animeId}
                                titleAnime={top.animeTitle}
                                thumbnail={top.animeImg}
                                release={top.releasedDate}
                                episode={top.latestEp}
                                />

                            </div>
                        )
                    }
                )}
            </div>
            )}
        </div>
    );
}

export default TopAiringComp;