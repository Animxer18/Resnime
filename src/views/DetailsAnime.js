import axios from 'axios';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect,  useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { app, db } from '../components/Firebase/firebase';
import Loading from '../components/Loading';

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
        await axios.get(`https://animexer1-api.vercel.app/anime-details/${id}`)
        .then(
            (res)=>{
                if(res.data.hasOwnProperty('error')){
                    setLoading(false)
                    navigate('/not-found')
                }else{
                    setAnime(res.data)
                    setLoading(false)
                }
                
            }
        )
    } 

  
    let addCommentToFirebase = async(idUser,userName,komentar,namaAnime,photoURL,animeImg)=>{
        await addDoc(collection(db,"komentar"),{
            idUser:idUser,
            userName:userName,
            komentar:komentar,
            namaAnime:namaAnime,
            photoURL:photoURL,
            animeImg:animeImg
        })
    }
    let addComment = (e)=>{

        e.preventDefault();
        const auth = getAuth(app)
        const userCurrent = auth.currentUser
        if(userCurrent){
            setShowSignIn(false)
            if(komentar===''){
                return
            }
            addCommentToFirebase(
                userCurrent.uid,
                userCurrent.displayName,
                komentar,
                id,
                userCurrent.photoURL,
                anime.animeImg)
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
                    photoURL:doc.data().photoURL
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
                const credential = GoogleAuthProvider.credentialFromResult(res);
                const token = credential.accessToken;
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
                            // let idFav = favoFiltered[0].id
                            let dataFavo = favoFiltered.filter(
                                (dataFav)=>{
                                    return dataFav.idAnime===id
                                }
                            )
                                setIdFavourite(dataFavo[0].id)
                            
                            if(favoFiltered.some(data=>data.idAnime===id)){
                                setIsFavourite(true)
                            }
                        }else{
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
        }
    }
    

    //Hapus Favourites
    const CancelFavourite = async(idFavourite)=>{
        await deleteDoc(doc(db,"favourites",idFavourite))
        setIsFavourite(false)
        setLoadingFavourite(false)
    }
    
 
    return (
        <div className='container mx-auto my-5 px-5 overflow-hidden'>
            {loading?(
               <Loading />
            ):(
                <div className='my-5'>
                    <BackButton />

                    <div className='flex space-x-5  card items-center lg:flex-row flex-col lg:space-y-0 space-y-5 justify-between'>
                        <div className='flex lg:space-x-8 md:w-full space-x-0 lg:flex-row flex-col'>
                            {/* Thumbnail */}
                            <div className='lg:w-64 overflow-hidden'>
                                <img className='w-full  hover:scale-110 transition-all duration-300' src={anime.animeImg} alt={anime.animeTitle}/>
                            </div>


                            <div className='flex flex-col justify-between space-y-8 lg:w-1/2   w-full'>
                            {/* Title */}
                                <div>
                                    <h2 className='lg:text-4xl text-3xl hp:text-2xl font-medium lg:my-0 md:text-4xl my-4'>{anime.animeTitle}</h2>
                                    {anime.otherNames!=="" &&
                                        <em className='hp:text-sm text-base'>{anime.otherNames}</em>
                                    }
                                </div>


                                {/* Genre */}
                                <div>
                                    <h2 className='text-xl'>Genre : </h2>
                                    <div className='grid lg:grid-cols-3 grid-cols-2 md:grid-cols-3 lg:gap-2 gap-3 lg:text-sm text-base'>
                                        {anime.genres.map(
                                            (genre)=>{
                                                return(
                                                    <div key={genre} 
                                                        className="rounded-md px-5  text-center py-2 border border-slate-400 text-black">
                                                        {genre}
                                                    </div>
                                                    )
                                                }
                                        )}
                                    </div>
                                </div>
                                

                                <table className='text-lg'>
                                    {anime.totalEpisodes>0 &&
                                        <tr>
                                            <th className='text-left pr-8 text-base'>Total Episode</th>
                                            <td className='pr-3'>:</td>
                                                <td>{anime.totalEpisodes}</td>
                                        </tr>
                                    }
                                    <tr>
                                        <th className='text-left'>Status</th>
                                        <td>:</td>
                                        <td>{anime.status}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left'>Type</th>
                                        <td>:</td>
                                        <td>{anime.type}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left'>Released Year</th>
                                        <td>:</td>
                                    {anime.releasedDate==='0'?(
                                        <td className='text-xl'>Not released yet</td>
                                        ):(
                                        <td className='text-xl'>{anime.releasedDate}</td>
                                        )
                                    }
                                    </tr>
                                </table>
                            </div>
                        </div>

                        {/* Add Favourite */}
                        {userData?(
                            <div>
                                {loadingFavourite?(
                                    <p>Loading Favourite...</p>
                                ):(
                                    <div className='my-3'>
                                        {isFavourite?(
                                            <button onClick={()=>CancelFavourite(idFavourite)}  className='px-4 lg:py-2 py-4 text-xl lg:text-base rounded-lg font-semibold border-2 border-black text-black w-full my-5'>Cancel Favourite</button>
                                        ):(
                                            <button onClick={()=>addFavourite(id)} className='px-4 lg:py-2 py-4 text-xl lg:text-base rounded-lg font-semibold bg-black text-white w-full'>Add to Favourite</button>
                                        )}
                                    </div>

                                )}
                            </div>
                        ):(
                            <div>
                                <button onClick={SignInWithFirebaseGoogle} className='px-4 lg:py-2 py-4 text-xl lg:text-base rounded-lg font-semibold bg-gray-300 text-white w-full my-5 ' >Add Favourite (Login First)</button>
                            </div>
                        )}

                    </div>

                    {/* Description */}
                    <div className=''>
                        {anime.synopsis &&
                            <div className='card'>
                                <h1 className='font font-semibold mb-4 sm:text-4xl hp:text-2xl'>Deskripsi</h1>
                                <div className='line mb-8'></div>
                                <p className='hp:text-sm text-sm sm:text-lg'>{anime.synopsis}</p>
                            </div>
                        }

                        {anime.episodesList.length>0 &&
                            <div className='card'>
                                <h1 className='text-4xl font font-semibold mb-4 hp:text-2xl'>Episode</h1>
                                <div className='line mb-8'></div>
                                <div className='grid lg:grid-cols-4 grid-cols-2 place-content-between gap-5'>
                                    {anime.episodesList.map(
                                        (episode)=>{
                                            return(
                                                    <Link key={episode.episodeId} to={`/stream/${episode.episodeId}`} 
                                                    className='leading-10 border border-slate-400 px-4 py-2 rounded-md'>episode - {episode.episodeNum}</Link> 
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        }
                    </div>



                    {/* Komentar */}
                    <div className='card'>
                        <h1 className='hp:text-2xl sm:text-4xl font font-semibold mb-4'>Komentar</h1>
                        <div className='line mb-8'></div>
                        {userData?(
                            <div className='flex flex-col space-y-5 items-start'>
                                <div className='flex items-center space-x-8'>
                                    <img className='rounded-xl w-20' src={userData.photoURL} alt=''/>
                                    <div className='w-full flex flex-col space-y-3'>
                                        <strong className='text-xl hp:text-lg'>{userData.displayName}</strong>
                                    </div>
                                </div>
                                <form onSubmit={addComment} className="flex flex-col space-y-5 w-full">
                                    <textarea placeholder='Bagaimana menurutmu anime ini?' 
                                        className='p-2 border border-slate-400 rounded-md focus:outline-0 focus:ring-2 focus:ring-slate-300 duration-300 transition-all'
                                        value={komentar} 
                                        rows='5'
                                        onChange={(e)=>setKomentar(e.target.value)}>
                                    </textarea>
                                    <button  className='px-4 lg:py-2 py-3 font-semibold bg-black text-white rounded-lg  lg:w-52 w-full ml-auto'>Tambah komentar</button>
                                </form>
                            </div>
                            
                        ):(
                            <button onClick={()=>SignInWithFirebaseGoogle()} className='px-4 py-2 bg-black text-white rounded-lg'>Login dulu untuk menambahkan komentar</button>
                        )}
                        
                        <div className='line mt-16'></div>
                        
                        {loadingKomentar?(
                            <p>Loading komentar...</p>
                            ):(
                        <div className='my-5'>
                            {listKomentar.length>0?(
                                <div className='flex flex-col space-y-10'>
                                    {listKomentar.map(
                                        (komen)=>{
                                            return(
                                                 <div key={komen.id} className="flex space-x-5 items-center justify-between">
                                                     <div className='flex space-x-5 items-start'>
                                                        <img alt='' src={komen.photoURL} className='rounded-xl' />
                                                        <div>
                                                            <strong>{komen.userName}</strong>
                                                            <p>{komen.komentar}</p>
                                                        </div>
                                                     </div>
                                                    {userData?(
                                                        <div>
                                                            {userData.uid===komen.idUser &&
                                                                <button className='bg-red-700 text-white px-4 py-2 rounded-md' onClick={()=>hapusKomen(komen.id)}><i className='bx bxs-trash-alt'></i></button>
                                                            }
                                                        </div>
                                                    ):(
                                                        ""
                                                    )} 
                                                 </div>
                                            )
                                        }
                                    )}
                                </div>
                            ):(
                                <p>Komentar masih kosong</p>
                            )}
                        </div>

                    )}


                    </div>
                    

                    
                    
                </div>
            )}
           
        </div>
    );
}

export default DetailsAnime;
