import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, onSnapshot, query} from "firebase/firestore"; 
import {app, db} from './Firebase/firebase'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import SimpleModalComp from './SimpleModalComp';



function CardAnime(anime) {
    let navigate = useNavigate()
    let [isShowSignIn,setShowSignIn] = useState(false)

    //function for open link of anime's detail
    const detailAnimeLink = async(id)=>{
        let idSlice
        
        if(id.toLowerCase().match("-season-")){
            idSlice = id.slice(0,-20) 
            console.log(id)
        }else{
            if(id.toLowerCase().match("episode")){
                idSlice = id.slice(0,-11)
            }else {
                idSlice = id
            }
        }
        if(id.toLowerCase().match("one-piece")){
            if(id.toLowerCase().match("episode")){
                idSlice = id.slice(0,-13)
            }else {
                idSlice = id
            }
        }
        if(id.toLowerCase().match("nd-")){
            idSlice = id.slice(0,-11)
        }
        if(id.toLowerCase().match('mokuteki-wo')){
            idSlice = id.slice(0,-10)
        }
        console.log("it's not get it ?",idSlice)
        
        navigate(`/anime/${idSlice}`)
    }

    

   


    const SignInWithFirebaseGoogle = ()=>{    
        let google_provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        signInWithPopup(auth, google_provider)
        .then(
            (res)=>{
                console.log(res)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                console.log(token)
                navigate("/")
                setShowSignIn(false)
            }
        )
    }

   
    return (
        <>
            <div onClick={()=>detailAnimeLink(anime.id)} >
                <div className='group overflow-hidden bg-slate-400'>
                    <img className='w-full  hover:scale-110 transition-all duration-300 opacity-70 group-hover:opacity-100' src={anime.thumbnail} alt={anime.titleAnime}/>
                </div>
                <h3 className='text-2xl'>{anime.titleAnime}</h3>
                    {anime.episode ?
                    (<p>{anime.episode} episodes</p>):
                    ("")} 
            </div>
            
            {/* <div>
                <SimpleModalComp
                isShowModal={isShowSignIn} 
                setShowModal={setShowSignIn}
                pesan="Kamu belum login!"
                pesanKecil="Harap login dulu untuk bisa menyimpan ke favourite"
                ActionButton={SignInWithFirebaseGoogle}
                />
            </div> */}
        </>
            
    );
}

export default CardAnime;