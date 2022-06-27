import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardAnime from './CardAnime';
import Loading from './Loading';

function MoviesComp() {
    let [movies,setMovies] = useState([])
    let [loading,setLoading] = useState([])

    //function fetch movies release anime
    const fetchDataMovies = async()=>{
        await axios.get("/anime-movies")
        .then(
            (response)=>{
                setMovies(response.data)
                setLoading(false)
            }
        )
    }
    
   

    //mounted while page loaded
    useEffect(
        ()=>{
            fetchDataMovies()
        },[]
    )
    return (
        <div>
            {loading ?(
                <Loading />
            ):(
            <div className='grid grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-10'>
                {movies.map(
                    (mov)=>{
                        return (
                            <div className="cursor-pointer" key={mov.animeId}>
                                
                                <CardAnime 
                                id={mov.animeId}
                                titleAnime={mov.animeTitle}
                                thumbnail={mov.animeImg}
                                release={mov.releasedDate}
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

export default MoviesComp;