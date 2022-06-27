import React, {  useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate} from 'react-router-dom';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'
import { app } from '../components/Firebase/firebase';
import '../custom.css'
import Trakteer from '../components/Trakteer';
function Navbar() {
    const [search,setSearch] = useState("")
    const [searchFin,setSearchFin] = useState("")
    let navigate = useNavigate()
    const [showNavbar,setShowNavbar] = useState(false)
    let [userInfo,setUserInfo] = useState(null)
    const auth = getAuth(app)
    let [isUserSignedIn,setUserSignerdIn] = useState(true)
    let [showInfoAcc,setShowInfoAcc] = useState(false)



    useEffect(
        ()=>{
            onAuthStateChanged(auth, async user => {
                // Check for user status
                if(user){ 
                  await setUserSignerdIn(true)
                }else{
                   await setUserSignerdIn(false)
                }
                await setUserInfo(user)

            });
        },[auth, isUserSignedIn,showNavbar,userInfo]
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
        setUserSignerdIn(false)
        navigate("/")
    }
    

    const moveTo =(destination)=>{
        navigate(`/${destination}`)
        setShowNavbar(false)
        setShowInfoAcc(false)

    }
    const changeShowNavbar = (cond)=>{
        setShowNavbar(cond)
    }
    
    let navbar = useRef()
    let part = useRef()
    let btnGoogle = useRef()
    window.addEventListener("scroll",()=>{
        if(navbar.current){
            navbar.current.classList.toggle("bg-black",window.scrollY>20)
            navbar.current.classList.toggle("shadow-card-shadow",window.scrollY>20)
            navbar.current.classList.toggle("text-white",window.scrollY>20)
            if(part.current){
                part.current.classList.toggle("bg-black",window.scrollY>20)
            }
            if(btnGoogle.current){
                    btnGoogle.current.classList.toggle("bg-white",window.scrollY>20)
                    btnGoogle.current.classList.toggle("text-black",window.scrollY>20)
            }
        }

      
        
    })


    const openShowInfoAcc = ()=>{
        if(showInfoAcc){
            setShowInfoAcc(false)
        }else{
            setShowInfoAcc(true)
        }
    }

    return (
        <>
            <div id='navbar' ref={navbar} className='duration-300 hp:px-5   transition-all w-full sticky top-0 z-10'>
                <div className='container flex flex-col lg:flex-row  justify-between mx-auto'>


                    <div className='flex space-x-10 justify-evenly items-center'>
                        <Link id='logo' to="/" className='py-5 lg:text-5xl text-4xl'>R</Link>
                        <form onSubmit={searchAnime} className="my-3 lg:w-96 w-1/2">
                            <input type="text" placeholder='Search Anime' 
                            className='border w-full rounded-md text-black duration-300 transition-all focus:ring-2 focus:ring-slate-300 px-4 py-2  border-gray-300 focus:outline-0' 
                            value={search}  onChange={(e)=>setSearch(e.target.value)}/>
                        </form>
                        <div onClick={()=>changeShowNavbar(true)} className={`items-center flex duration-300 transition-all ${showNavbar?"h-0":"h-20"} overflow-hidden lg:hidden`}>
                            <i className='bx bx-menu-alt-right bx-md px-4'></i>
                        </div>
                    </div>



                    <div className=''>
                        
                        
                        <div id='part' ref={part} className={`lg:flex lg:space-x-16 items-center space-y-5 lg:space-y-0 lg:rounded-none lg:h-full  rounded-bl-xl   ${showNavbar?  (showInfoAcc?" h-[520px]":"h-[340px]") :"h-0"}  overflow-hidden duration-300 transition-all lg:py-0 lg:px-0 px-5`}>
                            <div className='lg:flex lg:space-x-5'>
                                <div onClick={()=>moveTo('popular')} className=' py-5 cursor-pointer font-semibold'>Popular</div>
                                <div onClick={()=>moveTo('top_airing')} className='py-5 cursor-pointer font-semibold'>Top Airing</div>
                                <div onClick={()=>moveTo('movies')} className='py-5 cursor-pointer font-semibold'>Movies</div>
                            </div>
                            <div className='lg:flex  '>
                                {userInfo?(
                                    <div className=''>
                                        <div onClick={()=>openShowInfoAcc()} className="flex items-center space-x-3 cursor-pointer">
                                            <img alt="" src={userInfo.photoURL} className="w-10 rounded-lg"/>
                                            <p>{userInfo.displayName}</p>
                                            <i className={`bx bx-chevron-down ${showInfoAcc?"bx-rotate-180":""} duration-300 transition-all`}></i>
                                        </div>
                                        <div className={`${showInfoAcc?"lg:h-[134px] h-44":"h-0"} bg-white  lg:absolute lg:top-20 lg:w-44 lg:my-0 my-2  duration-300 transition-all  overflow-hidden `}>
                                            <div onClick={()=>moveTo("favourites")} className=" text-center hover:bg-black transition-all duration-300 cursor-pointer  hover:text-white flex items-center border border-black text-black font-semibold lg:text-base space-x-4 px-4 lg:py-2 py-4">
                                                <i className='bx bx-star bx-sm'></i>
                                                <p>Favourites</p>
                                            </div>
                                            <div onClick={()=>moveTo("comments")} className="text-center hover:bg-black transition-all duration-300 cursor-pointer  hover:text-white flex items-center border border-black text-black font-semibold lg:text-base space-x-4 px-4 lg:py-2 py-4">
                                                <i className='bx bx-message-square-dots bx-sm'></i>
                                                <p>Komentar</p>
                                            </div>
                                            <div onClick={SignOut} className="text-center hover:bg-black transition-all duration-300 cursor-pointer rounded-b-xl hover:text-white flex items-center border border-black text-black font-semibold lg:text-base space-x-4 px-4 lg:py-2 py-4">
                                                <i className='bx bx-log-out bx-sm' ></i>
                                                <p>Logout</p>
                                            </div>
                                        </div>
                                    </div>
                                ):(
                                    <div id='btn-login'  onClick={SignInWithFirebaseGoogle} className={`${!userInfo && "hidden"}cursor-pointer `}>
                                        <div ref={btnGoogle} className='cursor-pointer flex items-center text-xl font-semibold lg:text-base space-x-4 px-4 lg:py-2 py-4 rounded-lg bg-black text-white'>
                                            <i className='bx bxl-google bx-sm'></i> 
                                            <p>Login with google</p> 
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className={`${showNavbar?"h-20":"h-0"} ml-auto lg:hidden duration-300 transition-all overflow-hidden`}>
                                <i onClick={()=>changeShowNavbar(false)} className={`bx bx-x bx-lg ml-auto`}></i>
                            </div>
                        </div>
                    </div>
                    


                </div>
            </div>
            <div className='container mx-auto' >
                <Outlet context={
                        {
                            searchFin,isUserSignedIn
                        }
                        }/>
            </div>
            <div className='fixed sm:bottom-10 sm:right-10 hp:bottom-4 hp:right-4'>
                <Trakteer />
            </div>

        </>
    );
}

export default Navbar;