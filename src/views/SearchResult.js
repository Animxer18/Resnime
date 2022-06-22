import axios from 'axios';
import React, { useState } from 'react';
import CardAnime from '../components/CardAnime';
import Loading from '../components/Loading';
function SearchResult(props) {
   
    const [search,setSearch] = useState("")
    const [result,setResult] = useState("")
    const [loading,setLoading] = useState(false)
    
    
    const searchAnime = async(e)=>{
        e.preventDefault();
        setLoading(true)
        await axios.get(`/search?keyw=${search}`)
        .then(
            (res)=>{
                setResult(res.data)
                setLoading(false)
                setSearch("")
                console.log(res.data)
            }
            ).catch(
                (err)=>{
                    console.log("error : ",err)
                    setLoading(false)
                    setSearch("")
            }
        )
    }

  
    return (
        <div className='container mx-auto my-5'>
            {loading?(
                <Loading />
            ):(
            <div>
                <form onSubmit={searchAnime} >
                    <input type="text" placeholder='Search Anime' 
                    className='border w-full text-center px-4 py-2 border-gray-300 focus:outline-0' 
                    value={search} onChange={(e)=>setSearch(e.target.value)}/>
                </form>

                
               {result.length>0?(
                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-10 my-10'>
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