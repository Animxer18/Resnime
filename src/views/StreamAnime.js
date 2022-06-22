import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';


function StreamAnime(props) {
    let {episode} = useParams()
    let [video,setVideo] = useState("")
    let [loading,setLoading] = useState(true)


    let linkStream = async()=>{
        let response = await axios.get(`/stream/watch/${episode}`)
        console.log(response.data)
        await setVideo(response.data)
        setLoading(false)

    }


    
    
    
    useEffect(
        ()=>{
            linkStream()
        },[]
    )
    return (
        <div>
            {loading ?(
                <Loading />
            ):(
                <iframe  src={video.Referer} title='video' loading="lazy" width="600" height="400"></iframe>
                 
            )}
        </div>
    );
}

export default StreamAnime;