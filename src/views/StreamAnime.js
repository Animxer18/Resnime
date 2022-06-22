import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';


function StreamAnime(props) {
    let {episode} = useParams()
    let [video,setVideo] = useState("")
    let [loading,setLoading] = useState(true)
    
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
                    console.log(response.data)
                }
            }
        )

    }


    
    
    
    useEffect(
        ()=>{
            linkStream()
        },[]
    )
    return (
        <div className='container mx-auto my-5'>
            {loading ?(
                <Loading />
            ):(
                <>
                    <h1>Jikalau tidak bisa memutar video, mohon direfresh atau dibuka ulang websitenya. Makasih</h1>
                    <iframe  src={video.Referer} title='video' loading="lazy" width="600" height="400"></iframe>
                </>
                 
            )}
        </div>
    );
}

export default StreamAnime;