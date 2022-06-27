import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect,  useState } from 'react';
import { useNavigate} from 'react-router-dom';
import CardAnime from './CardAnime';
import { app, db } from './Firebase/firebase';
import Loading from './Loading';
function FavouritesComp(props) {
    let navigate = useNavigate()
    const [isUserSignedIn,setUserSignerdIn] = useState("")
    const auth = getAuth(app)
    let [listFavourites,setListFavourites] = useState([])
    const [userData,setUserData] = useState({})
    let [loading,setLoading] = useState(true)


    
    useEffect(
        ()=>{
            const fetchDataFavourites = async()=>{
                    const q = query(collection(db, "favourites"));
                    onSnapshot(q, (querySnapshot) => {
                        const favourites = [];
                        querySnapshot.forEach((doc) => {
                            let dataFavourites = {
                                id:doc.id,
                                idUser:doc.data().idUser,
                                idAnime:doc.data().idAnime,
                                namaAnime:doc.data().namaAnime,
                                animeImg:doc.data().animeImg,
                                userName:doc.data().userName
                            }
                            favourites.push(dataFavourites);
                        });
                        let filteredFavourite = favourites.filter(
                            (favo)=>{
                                return favo.idUser ===userData.uid
                            }
                        )
                        setListFavourites(filteredFavourite)
                        setLoading(false)
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
        },[auth, isUserSignedIn, userData]
    )


    const SignInWithFirebaseGoogle = ()=>{
        let google_provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        signInWithPopup(auth, google_provider)
        .then(
            (res)=>{
                navigate("/")
            }
        )
    }



    return (
        <div>
                {loading?(
                   <Loading />
                ):(
                    <div>
                        {userData ?(
                            <div>
                                {listFavourites.length>0?(
                                    <div className='grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-10'>
                                        {listFavourites.map(
                                            (favo)=>{
                                                return(
                                                    <div className="cursor-pointer lg:w-60" key={favo.id}>
                                                        <CardAnime
                                                            id={favo.idAnime}
                                                            titleAnime={favo.namaAnime}
                                                            thumbnail={favo.animeImg}
                                                            />
                                                    
                                                    </div>
                                                )
                                            }
                                        )}
                                    </div>
                                ):(
                                    <h1>Belum ada favourite</h1>
                                )}
                            </div>
                        ):(
                            <button onClick={()=>SignInWithFirebaseGoogle()} className='px-4 py-2 bg-black text-white rounded-lg'>Login dulu untuk menambahkan komentar</button>
                        )}
                    </div>

                )}
            
           
        </div>
    );
}

export default FavouritesComp;