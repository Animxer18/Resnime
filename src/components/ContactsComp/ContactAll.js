import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../Firebase/firebase';
import FormFeedback from '../FormFeedback';


function ContactAll(props) {
    let [hiddenSuccessAlert,setHiddenSuccessAlert] = useState(false)
    

  

//---------------------------------------------------------------------------------------
    //Form
    let [email,setEmail] = useState("")
    let [msg,setMsg] = useState("")
    let [errorEmail,setErrorEmail] = useState("")
    let [errorMsg,setErrorMsg] = useState("")
    let [showFinishedFeedback,setShowFinishedFeedback] = useState(false)

    const auth = getAuth(app)
    const [isUserSignedIn,setUserSignerdIn] = useState(true)

    const validateEmail = (e)=>{
        let validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmail(e.target.value)
        if(email.match(validRegex)){
            setErrorEmail("")
        }else{
            setErrorEmail("Format email salah")
        }
    }

    const validateMsg = (e)=>{
        setMsg(e.target.value)
        if(msg.length>2){
            setErrorMsg("")
        }else{
            setErrorMsg("Minimal 3 kata")
        }
    }

    const fetchUserData = ()=>{
        onAuthStateChanged(auth, user => {
            // Check for user status
            if(user){ 
            setEmail(user.email)
              return setUserSignerdIn(true)
            }
              setUserSignerdIn(false)
          });
    }

    const addFeedback = async(e)=>{
        e.preventDefault();
        try{
            await addDoc(collection(db, "feedback-from-except"), {
                email: email,
                message: msg,
              });
              setEmail("")
              setMsg("")
              setHiddenSuccessAlert(true)
              setShowFinishedFeedback(true)
        }
        catch(e){
        }
        
    }

    useEffect(
        ()=>{
            fetchUserData()
        },[]
    )
    
    return (
        <>
         <div onClick={()=>setHiddenSuccessAlert(true)} className='px-4 text-center cursor-pointer pt-8 rounded-xl border 
            border-gray-400 hover:shadow-xl duration-300 transition-all'>
                <img alt="icon-all" src='https://cdn-icons-png.flaticon.com/512/32/32441.png'/>
                <h1 className='text-xl pt-8 pb-4 font-semibold'>Gak kenal aku sebelumnya</h1>
            </div>
            <FormFeedback 
            hiddenSuccessAlert={hiddenSuccessAlert}
            setHiddenSuccessAlert={setHiddenSuccessAlert}
            addFeedback={addFeedback}
            email={email}
            validateEmail={validateEmail}
            errorEmail={errorEmail}
            msg={msg}
            validateMsg={validateMsg}
            errorMsg={errorMsg}
            />

            
    </>
    );
}

export default ContactAll;