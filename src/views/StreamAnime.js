import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Loading from '../components/Loading';


function StreamAnime(props) {
    let {episode} = useParams()
    let [video,setVideo] = useState("")
    let [loading,setLoading] = useState(true)
    const [hiddenHint,setHiddenHint] = useState(true)
    let navigate = useNavigate()

    let linkStream = async()=>{
        await axios.get(`/stream/watch/${episode}`)
        .then(
            (response)=>{
                if(response.data.hasOwnProperty("error")){
                    navigate("/not-found")
                    setLoading(false)
                }else{
                    setVideo(response.data)
                    setLoading(false)
                }
            }
        )

    }


    const openHint =()=>{
        if(hiddenHint){
            setHiddenHint(false)
        }else{
            setHiddenHint(true)

        }
    }
   
    
    useEffect(
        ()=>{
            linkStream()
        },[]
    )
    return (
        <div className='container mx-auto my-5 px-5'>
            <BackButton />

            {loading ?(
                <Loading />
            ):(
                
                <div className='container mx-auto my-5 px-5 card flex space-y-20 flex-col'>
                    <div className='flex flex-col space-y-3'>
                        <h1 className='first-letter:uppercase font-semibold text-4xl '>{episode.replaceAll("-"," ")}</h1>
                        <div className=' text-center py-3 bg-gray-200 flex justify-center items-start space-x-2 border border-gray-400 rounded-md '>
                            <div>
                                <div className='flex space-x-5 items-center px-5 cursor-pointer ' onClick={()=>openHint()}>
                                    <i className="fa-solid fa-circle-exclamation text-gray-600"></i>
                                    <p className='font-medium text-gray-800'>
                                        Hal yang dilakukan kalau tidak bisa memutar video 
                                    </p> 
                                    <i className={`bx bxs-chevron-down ${hiddenHint?"":"bx-rotate-180"} transition-all duration-300`}></i>
                                </div>
                                
                                <div className={`overflow-hidden ${hiddenHint?"h-0":"lg:h-40 h-44"} px-8 flex flex-col space-y-5 duration-300 transition-all`}>
                                    <ul className='marker:text-gray-500 list-disc text-left my-4'>
                                        <li>Nonton di PC/Laptop</li>
                                        <li>Refresh / buka ulang websitenya</li>
                                        <li>Tutup devtools</li>
                                    </ul>
                                    <strong>Maaf atas ketidaknyamanannya, terima kasih</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <iframe  src={video.Referer} title='video' loading="lazy" className='w-11/12 h-[640px] mx-auto ' ></iframe>
                </div>
                 
            )}
        </div>
    );
}

export default StreamAnime;