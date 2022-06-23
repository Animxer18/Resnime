import React, {  useEffect, useState } from 'react';
import { Link, Outlet, useNavigate} from 'react-router-dom';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'
import { app } from '../components/Firebase/firebase';
function Navbar() {
    const [search,setSearch] = useState("")
    const [searchFin,setSearchFin] = useState("")
    let navigate = useNavigate()

    const auth = getAuth(app)
    let [isUserSignedIn,setUserSignerdIn] = useState(true)
    
    
    useEffect(
        ()=>{
            onAuthStateChanged(auth, user => {
                // Check for user status
                console.log("stat of user : ",user)
                if(user){ 
                  setUserSignerdIn(true)
                }else{
                    setUserSignerdIn(false)
                }
              });
        },[]
    )
    const searchAnime = (e)=>{
        e.preventDefault();
        setSearchFin(search)
        setSearch("")
        navigate(`/search`)
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
   
    const SignOut = ()=>{
        signOut(auth).then(
            ()=>{
                console.log("logout successfull")
            }
        )
        navigate("/")
    }

    return (
        <>
            <div className='bg-blue-500 text-white w-full'>
                <div className='container flex justify-between mx-auto'>
                    <div className='flex space-x-5'>
                        <Link to="/" className='py-5'>Home</Link>
                        <Link to="/search" className='py-5'>Genre</Link>
                    </div>
                    <form onSubmit={searchAnime}>
                        <input type="text" placeholder='Search Anime' 
                        className='border w-full text-black text-center px-4 py-2 border-gray-300 focus:outline-0' 
                        value={search}  onChange={(e)=>setSearch(e.target.value)}/>
                        <button>Search</button>
                    </form>

                    {isUserSignedIn?(
                        <button onClick={SignOut}>
                            Logout
                        </button>
                    ):(
                        <button onClick={SignInWithFirebaseGoogle}>
                            Login
                        </button>
                    )}
                    

                </div>
            </div>
                <Outlet context={searchFin}/>

        </>
    );
}

export default Navbar;