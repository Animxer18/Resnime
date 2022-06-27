import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardAnime from './CardAnime';
import Loading from './Loading';

function PopularAnimeComp() {
    let [popular,setPopular] = useState([])
    let [loading,setLoading] = useState(true)

    //function fetch recent release anime
    const fetchDataRecent = async()=>{
        await axios.get("https://raznime.herokuapp.com/popular").then(
            (response)=>{
                console.log("ahhh idk anymore : ",response.data)
                setPopular(response.data)
                setLoading(false)
            }
        )
        .catch(
            (err)=>{
                console.log("err :",err)
            }
        )
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
            <div className='grid grid-cols-2 lg:grid-cols-5 sm:grid-cols-3 gap-x-5 gap-y-10'>
                {popular.map(
                    (pop)=>{
                        return (
                            <div className="cursor-pointer" key={pop.animeId}>
                                
                                <CardAnime 
                                id={pop.animeId}
                                titleAnime={pop.animeTitle}
                                thumbnail={pop.animeImg}
                                release={pop.releasedDate}
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

export default PopularAnimeComp;