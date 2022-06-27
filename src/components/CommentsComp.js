import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect,  useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { app, db } from './Firebase/firebase';
import Loading from './Loading';
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
                                userName:doc.data().userName,
                                animeImg:doc.data().animeImg
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
        navigate(`/anime/${id}`)
    }

    let hapusKomen = async(id)=>{
        await deleteDoc(doc(db,"komentar",id))
    }

    return (
        <div >
            {loading?(
                <Loading />
            ):(
                <div>
                    {userData ?(
                        <div>
                            {listComments.length>0?(
                                <div className='flex flex-col space-y-5'>
                                    {listComments.map(
                                        (comm)=>{
                                            return(
                                                <div key={comm.id} className='flex justify-between items-center'>
                                                    <div onClick={()=>detailAnimeLink(comm.namaAnime)} className="flex space-x-5 cursor-pointer" key={comm.id}>
                                                            <div className='overflow-hidden group'>
                                                                <img alt='' src={comm.animeImg} className="w-24 group-hover:scale-110 duration-300 transition-all"/>
                                                            </div>
                                                            <div className='flex flex-col'>
                                                                <h3 className='lg:text-3xl text-2xl font-semibold first-letter:uppercase '>{comm.namaAnime.replaceAll("-"," ")}</h3>
                                                                <q className='italic'>{comm.komentar}</q>
                                                            </div>
                                                    </div>
                                                    <button className='bg-red-700 text-white px-4 py-2 rounded-md' onClick={()=>hapusKomen(comm.id)}><i className='bx bxs-trash-alt'></i></button>
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
                        <button onClick={()=>SignInWithFirebaseGoogle()} className='px-4 py-2 bg-black text-white rounded-lg'>Login dulu untuk melihat riwayat komentar</button>
                    )}
                </div>

            )}
            
        </div>
    );
}

export default CommentsComp;
