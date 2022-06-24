import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import CardAnime from '../components/CardAnime';
import Loading from '../components/Loading';
function SearchResult(props) {
   
    const [result,setResult] = useState("")
    const [loading,setLoading] = useState(false)
    const {searchFin} = useOutletContext()
    

    useEffect(
        ()=>{
            fetchSearchResult()
        },[searchFin]
    )

    const fetchSearchResult = async()=>{
        setLoading(true)
        await axios.get(`/search?keyw=${searchFin}`)
        .then(
            (res)=>{
                setResult(res.data)
                setLoading(false)
                console.log("dri search result : ",res.data)
            }
            ).catch(
                (err)=>{
                    console.log("error : ",err)
                    setLoading(false)
            }
        )
    }

  
    return (
        <div className='container mx-auto my-5'>
            {loading?(
                <Loading />
            ):(
            <div>
              {searchFin}

               {result.length>0?(
                    <div className='grid grid-cols-2  lg:grid-cols-5  gap-10 my-10'>
                    {result.map(
                        (hasil)=>{
                            return(
                                <div className="cursor-pointer lg:w-60" key={hasil.animeId}>
                                    <CardAnime
                                    id={hasil.animeId}
                                    titleAnime={hasil.animeTitle}
                                    episode={hasil.episodeNum}
                                    thumbnail={hasil.animeImg}
                                    />
                                </div>
                            )
                        }
                    )}
                    </div>
               ):result===""?(
                   <p>Silahkan cari</p>
                   ):(
                    <p>Pencarian Tidak ditemukan</p>
                       
               )}
                
               
            </div>
            )}
           
           
        </div>
    );
}

export default SearchResult;