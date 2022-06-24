import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect,  useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { app, db } from './Firebase/firebase';
import SimpleModalComp from './SimpleModalComp';
function CommentsComp(props) {
    let navigate = useNavigate()
    const [isUserSignedIn,setUserSignerdIn] = useState("")
    let [isShowModal,setShowModal] = useState(false)
    const auth = getAuth(app)
    let [listComments,setListComments] = useState([])
    const [userData,setUserData] = useState({})
    let [loading,setLoading] = useState(true)


    
    useEffect(
        ()=>{
            const fetchDataComments = async()=>{
                    const q = query(collection(db, "komentar"));
                    onSnapshot(q, (querySnapshot) => {
                        const komentars = [];
                        querySnapshot.forEach((doc) => {
                            let dataComments = {
                                id:doc.id,
                                idUser:doc.data().idUser,
                                namaAnime:doc.data().namaAnime,
                                komentar:doc.data().komentar,
                                userName:doc.data().userName
                            }
                            komentars.push(dataComments);
                        });
                        let filteredKomentars = komentars.filter(
                            (comm)=>{
                                return comm.idUser ===userData.uid
                            }
                        )
                        setListComments(filteredKomentars)
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
            fetchDataComments()
            console.log("kondisi isUserSignedIn di komentar ?",isUserSignedIn)
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


    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-semibold'>Komentar</h1>
            {loading?(
                <p>Loading...</p>
            ):(
                <div>
                    {userData ?(
                        <div>
                            {listComments.length>0?(
                                <div className='grid grid-cols-2 lg:grid-cols-5 gap-x-3 gap-y-10'>
                                    {listComments.map(
                                        (comm)=>{
                                            return(
                                                <div onClick={()=>detailAnimeLink(comm.namaAnime)} className="cursor-pointer lg:w-60" key={comm.id}>
                                                        
                                                        <h3 className='text-2xl'>{comm.namaAnime}</h3>
                                                        <p>{comm.komentar}</p>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            ):(
                                <h1>Belum ada komentar</h1>
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
            pesanKecil="Silahkan login dulu untuk melihat komentar yang pernah kamu lakukan"
            ActionButton={SignInWithFirebaseGoogle}
            />
        </div>
    );
}

export default CommentsComp;
