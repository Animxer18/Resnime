import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

function DetailsAnime(props) {
    let {id} = useParams()
    let [anime,setAnime] = useState({})
    let [loading,setLoading] = useState(true)
    let fetchDataDetails = async()=>{
        await axios.get(`/anime-details/${id}`)
        .then(
            (res)=>{
                setAnime(res.data)
                setLoading(false)
                console.log(res.data)
            }
        )
    }
    useEffect(
        ()=>{
            fetchDataDetails()
        },[]
    )
    return (
        <div className='container mx-auto my-5'>
            {loading?(
               <Loading />
            ):(
                <>
                {/* Title, Episode, Thumbnail */}
                <div className='flex space-x-5'>


                    {/* Thumbnail */}
                    <div className='lg:w-64 overflow-hidden '>
                        <img className='w-full  hover:scale-110 transition-all duration-300' src={anime.animeImg} alt={anime.animeTitle}/>
                    </div>

                    {/* Title */}
                    <div className='flex flex-col space-y-5'>
                        <div className=''>
                            <h2 className='text-4xl font-medium mb-3'>{anime.animeTitle} ( {anime.otherNames} )</h2>
                            <strong className='text-xl'>Released Date : <span>{anime.releasedDate}</span></strong>
                        </div>
                        <div className='flex space-x-5'>
                            {anime.genres.map(
                                (genre)=>{
                                    return(
                                        <div key={genre} 
                                        className="rounded-full px-3 py-1 bg-blue-200 text-blue-600">
                                            {genre}
                                            </div>
                                    )
                                }
                            )}
                        </div>
                    </div>

                    

                </div>

                {/* Description */}
                <div>
                    <p>{anime.synopsis}</p>
                </div>
                <div>
                    {anime.episodesList.map(
                        (episode)=>{
                            return (
                                <Link  key={episode.episodeId} to={`/stream/${episode.episodeId}`}>
                                    <p  >{episode.episodeId.replaceAll('-',' ')}</p>
                                </Link>
                            )
                        }
                    )}
                </div>

                </>
            )}
           
        </div>
    );
}

export default DetailsAnime;