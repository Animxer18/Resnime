import axios from 'axios';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { app, db } from '../components/Firebase/firebase';
import Loading from '../components/Loading';
import SimpleModalComp from '../components/SimpleModalComp';

function DetailsAnime(props) {
    let {id} = useParams()
    let [anime,setAnime] = useState({})
    let [loading,setLoading] = useState(true)
    let [loadingKomentar,setLoadingKomentar] = useState(true)
    let [isShowSignIn,setShowSignIn] = useState(false)
    let navigate = useNavigate()

    let [komentar,setKomentar] = useState("")
    let [listKomentar,setListKomentar] = useState([])

    const [isUserSignedIn,setUserSignerdIn] = useState(true)
    const auth = getAuth(app)
   
    let fetchDataDetails = async()=>{
        await axios.get(`/anime-details/${id}`)
        .then(
            (res)=>{
                if(res.data.hasOwnProperty('error')){
                    console.log("error ini mah")
                    setLoading(false)
                    navigate('/not-found')
                }else{
                    setAnime(res.data)
                    setLoading(false)
                }
                
            }
        )
    } 

  
    let addCommentToFirebase = async(idUser,userName,komentar,namaAnime)=>{
        await addDoc(collection(db,"komentar"),{
            idUser:idUser,
            userName:userName,
            komentar:komentar,
            namaAnime:namaAnime,
        })
    }
    let addComment = (e)=>{

        e.preventDefault();
        const auth = getAuth(app)
        const userCurrent = auth.currentUser
        console.log("user : ",userCurrent)
        if(userCurrent){
            setShowSignIn(false)
            if(komentar===''){
                console.log("Komentar kosong")
                return
            }
            addCommentToFirebase(userCurrent.uid,userCurrent.displayName,komentar,id)
            setKomentar("")
        }else{
            setShowSignIn(true)
            setKomentar("")
        }
        
    }

    let getComment = ()=>{
        const q = query(collection(db, "komentar"));
        onSnapshot(q, (querySnapshot) => {
            const commentOfAnime = [];
            querySnapshot.forEach((doc) => {
                let dataComent = {
                    id:doc.id,
                    userName:doc.data().userName,
                    namaAnime:doc.data().namaAnime,
                    komentar:doc.data().komentar,
                }
                commentOfAnime.push(dataComent);
            }); 
            let filteredKomentar = commentOfAnime.filter(
                (comment)=>{
                    return comment.namaAnime===id
                }
            )
            console.log("filtered Koment",filteredKomentar)
            setListKomentar(filteredKomentar)     
            setLoadingKomentar(false)    
        });
    }

    let hapusKomen = async(id)=>{
        await deleteDoc(doc(db,"komentar",id))
    }

    const SignInWithFirebaseGoogle = ()=>{    
        let google_provider = new GoogleAuthProvider()
        signInWithPopup(auth, google_provider)
        .then(
            (res)=>{
                console.log(res)
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
                console.log(token)
                navigate("/")
            }
        )
    }

    useEffect(
        ()=>{
            fetchDataDetails()
            getComment()
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
                                {anime.releasedDate==='0'?(
                                    <strong className='text-xl'>Not released yet</strong>
                                ):(
                                    <strong className='text-xl'>Released Date : <span>{anime.releasedDate}</span></strong>
                                )}
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
                        <div>
                            <p>{anime.synopsis}</p>
                        </div>
                        <div>
                            {anime.episodesList.map(
                                (episode)=>{
                                    return (
                                        <Link  key={episode.episodeId} to={`/stream/${episode.episodeId}`}>
                                            <p 
                                            className='mt-3 mb-5 border-b-2 border-slate-400 first-letter:uppercase text-xl' >
                                                {episode.episodeId.replaceAll('-',' ')}
                                            </p>
                                        </Link>
                                    )
                                }
                            )}
                        </div>
                    </div>



                    {/* Komentar */}
                    <div>
                        <form onSubmit={addComment}>
                            <input placeholder='text' 
                            value={komentar} 
                            onChange={(e)=>setKomentar(e.target.value)}/>
                        </form>
                    </div>
                    

                    <SimpleModalComp
                    isShowModal={isShowSignIn}
                    setShowModal={setShowSignIn}
                    pesan="Harus login dulu, Sayang"
                    ActionButton={SignInWithFirebaseGoogle}
                    />

                    {loadingKomentar?(
                        <p>Loading komentar...</p>
                    ):(
                        <div className='my-5'>
                            {listKomentar.length>0?(
                                <ul>
                                    {listKomentar.map(
                                        (komen)=>{
                                            return( 
                                                <li key={komen.id}>{komen.userName} - {komen.komentar} <span onClick={()=>hapusKomen(komen.id)}>Hapus</span></li>
                                            )
                                        }
                                    )}
                                </ul>
                            ):(
                                <p>Komentar masih kosong</p>
                            )}
                        </div>

                    )}
                </>
            )}
           
        </div>
    );
}

export default DetailsAnime;