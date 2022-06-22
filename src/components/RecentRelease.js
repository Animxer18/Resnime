import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardAnime from './CardAnime';
import Loading from './Loading';

function RecentRelease() {
    let [recent,setRecent] = useState([])
    let [loading,setLoading] = useState([])

    //function fetch recent release anime
    const fetchDataRecent = async()=>{
        let response = await axios.get("/recent-release")
        setRecent(response.data)
        setLoading(false)

    }
    
   

    //mounted while page loaded
    useEffect(
        ()=>{
            fetchDataRecent()
        },[]
    )
    return (
        <div>
            {loading ?(
                <Loading />
            ):(
            <div className='grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-10'>
                {recent.map(
                    (recentAnime)=>{
                        return (
                            <div className="cursor-pointer lg:w-72" key={recentAnime.episodeId}>
                                <CardAnime 
                                id={recentAnime.episodeId}
                                titleAnime={recentAnime.animeTitle}
                                episode={recentAnime.episodeNum}
                                thumbnail={recentAnime.animeImg}
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

export default RecentRelease;