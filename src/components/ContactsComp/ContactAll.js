import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../Firebase/firebase';
import FormFeedback from '../FormFeedback';


function ContactAll(props) {
    let [hiddenSuccessAlert,setHiddenSuccessAlert] = useState(false)
    let [hidden,setHidden] = useState(false)
    

  

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
            console.log("email  not aman awikwok")
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
            console.log("user: ",user)
            if(user){ 
            setEmail(user.email)
              return setUserSignerdIn(true)
            }
              setUserSignerdIn(false)
          });
    }

    const addFeedback = async(e)=>{
        e.preventDefault();
        console.log("hmmm")
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
            console.log("error : ",e)
        }
        
    }

    useEffect(
        ()=>{
            fetchUserData()
        },[]
    )
    
    return (
        <>
         <div onClick={()=>setHiddenSuccessAlert(true)} className='px-4 text-center cursor-pointer py-8 rounded-xl border 
            border-gray-400 hover:shadow-xl duration-300 transition-all'>
                <h1>ICON All</h1>
                <h1>Gak kenal aku sebelumnya</h1>
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