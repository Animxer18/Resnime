import axios from 'axios';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect,  useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { app, db } from '../components/Firebase/firebase';
import Loading from '../components/Loading';
import SimpleModalComp from '../components/SimpleModalComp';

function DetailsAnime(props) {
    let {id} = useParams()
    let [anime,setAnime] = useState({})
    let [loading,setLoading] = useState(true)
    let [loadingKomentar,setLoadingKomentar] = useState(true)
    let [loadingFavourite,setLoadingFavourite] = useState(true)
    let [isShowSignIn,setShowSignIn] = useState(false)
    let navigate = useNavigate()
    const [userData,setUserData] = useState({})
    const [isUserSignedIn,setUserSignerdIn] = useState("")
    const [isFavourite,setIsFavourite] = useState(false)
    
    // let idFavourite = useRef(null)
    let [idFavourite,setIdFavourite] = useState([])

    let [komentar,setKomentar] = useState("")
    let [listKomentar,setListKomentar] = useState([])

    const auth = getAuth(app)
   
    let fetchDataDetails = async()=>{
        await axios.get(`/anime-details/${id}`)
        .then(
            (res)=>{
                if(res.data.hasOwnProperty('error')){
                    setLoading(false)
                    navigate('/not-found')
                }else{
                    setAnime(res.data)
                    console.log(res.data)
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
                    idUser:doc.data().idUser,
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


            const fetchDataFavourites = async()=>{

                const q = query(collection(db, "favourites"));
                onSnapshot(q, (querySnapshot) => {
                    const favourites = [];
                    querySnapshot.forEach((doc) => {
                        let dataFavourites = {
                            id:doc.id,
                            idUser:doc.data().idUser,
                            idAnime:doc.data().idAnime,
                        }
                        favourites.push(dataFavourites);
                    });
                    if(userData){
                        let favoFiltered = favourites.filter(
                            (favo)=>{
                                    return favo.idUser===userData.uid
                            }
                        )
                        if(favoFiltered.length>0){
                            console.log("favoFiltered : ",favoFiltered)
                            let idFav = favoFiltered[0].id
                            setIdFavourite(idFav)
                            setLoadingFavourite(false)
                            
                            if(favoFiltered.some(data=>data.idAnime===id)){
                                setIsFavourite(true)
                            }
                        }else{
                            console.log("data kosong")
                            setLoadingFavourite(false)

                        }
                    }
                  
                });
            }
            
        
            onAuthStateChanged(auth, async user => {
                // Check for user status
                if(user){ 
                    await setUserSignerdIn(true)
                    
                }else{
                    await setUserSignerdIn(false)
                }
                await setUserData(user)
            });
            fetchDataFavourites()
             
             
        },[auth, userData]  
    )
   

    //Nambah ke Favourites
    const addFavourite = async(id)=>{
        const auth = getAuth(app)
        const user = auth.currentUser
        if(!user){
            setShowSignIn(true)
            return
        }
        setShowSignIn(false)
        try {
            await addDoc(collection(db, "favourites"), {
                idUser: user.uid,
                idAnime:id,
                animeImg:anime.animeImg,
                namaAnime: anime.animeTitle,
                userName: user.displayName
                });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    

    //Hapus Favourites
    const CancelFavourite = async(idFavourite)=>{
        console.log("id fav seems bug : ",idFavourite)
        await deleteDoc(doc(db,"favourites",idFavourite))
        setIsFavourite(false)
        setLoadingFavourite(false)
    }
    

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
                                                className="rounded-full px-2 py-1 text-center bg-blue-200 text-blue-600">
                                                {genre}
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                            
                            
                            {anime.totalEpisodes!=='0' &&
                                <div>
                                    <strong className='text-xl'>Episode : <span>{anime.totalEpisodes}</span></strong>
                                </div>
                                }
                            
                            
                            <div>
                                <strong className='text-xl'>Status : <span>{anime.status}</span></strong>
                            </div>
                        </div>

                        {/* Add Favourite */}
                        {userData?(
                            <div>
                                {loadingFavourite?(
                                    <p>Loading Favourite...</p>
                                ):(
                                    <div>
                                        {isFavourite?(
                                            <button onClick={()=>CancelFavourite(idFavourite)}  className='px-4 py-2 border-blue-500 border-2 text-blue-500 w-full my-5'>Cancel Favourite</button>
                                        ):(
                                            <button onClick={()=>addFavourite(id)} className='px-4 py-2 bg-blue-500 text-white w-full my-5'>Add to Favourite</button>
                                        )}
                                    </div>

                                )}
                            </div>
                        ):(
                            <div>
                                <button onClick={SignInWithFirebaseGoogle} className='px-4 py-2 bg-blue-300 text-white w-full my-5 ' >Add Favourite (Login First)</button>
                            </div>
                        )}

                    </div>

                    {/* Description */}
                    <div>
                        <div className='my-5'>
                            <h1 className='text-3xl mb-3 font-semibold'>Sinopsis</h1>
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
                                                <li key={komen.id}>{komen.userName} - {komen.komentar}
                                                {userData?(
                                                    <div>
                                                        {userData.uid===komen.idUser &&
                                                            <span onClick={()=>hapusKomen(komen.id)}>Hapus</span>
                                                        }
                                                    </div>
                                                ):(
                                                    ""
                                                )} 
                                                </li>
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