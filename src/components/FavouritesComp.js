import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect,  useState } from 'react';
import { useNavigate} from 'react-router-dom';
import CardAnime from './CardAnime';
import { app, db } from './Firebase/firebase';
import SimpleModalComp from './SimpleModalComp';
function FavouritesComp(props) {
    let navigate = useNavigate()
    const [isUserSignedIn,setUserSignerdIn] = useState("")
    let [isShowModal,setShowModal] = useState(false)
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
            console.log("kondisi isUserSignedIn di favourites ?",isUserSignedIn)
        },[auth, isUserSignedIn, userData]
    )


    const SignInWithFirebaseGoogle = ()=>{
        let google_provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        signInWithPopup(auth, google_provider)
        .then(
            (res)=>{
                navigate("/")
                setShowModal(false)
            }
        )
    }


    const detailAnimeLink = async(id)=>{
        let idSlice 
        console.log(id)
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
        navigate(`/anime/${idSlice}`)
    }


    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-semibold'>Favourites</h1>
            {loading?(
                <p>Loading...</p>
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
                        <p>Blum login</p>
                    )}
                </div>

            )}
            <SimpleModalComp
            isShowModal={isShowModal}
            setShowModal={setShowModal}
            pesan="Kamu belum login"
            pesanKecil="Silahkan login dulu untuk melihat favourite animemu"
            ActionButton={SignInWithFirebaseGoogle}
            />
        </div>
    );
}

export default FavouritesComp;