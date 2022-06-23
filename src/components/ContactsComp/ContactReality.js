import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../Firebase/firebase';
import FormFeedback from '../FormFeedback';
import ContactComp from './ContactComp';


function ContactReality(props) {
    let [hidden,setHidden] = useState(false)
    let [hiddenSuccessAlert,setHiddenSuccessAlert] = useState(false)
    let [hiddenFailedAlert,setHiddenFailedAlert] = useState(false)
    let [name,setName] = useState("")
    

    let nameHandler = (e)=>{
        e.preventDefault();
        if(name.toLowerCase().match("keiji") ||
            name.toLowerCase().match("kei") || 
            name.toLowerCase().match("kadara") || 
            name.toLowerCase().match("vina") || 
            name.toLowerCase().match("pina")){
            console.log("iyahh")
            setHidden(false)
            setHiddenSuccessAlert(true)
            setName("")
        }else{
            console.log("engga")
            setHiddenFailedAlert(true)
            setName("")

        }
    }


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
            await addDoc(collection(db, "feedback-from-reality"), {
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
            <ContactComp 
            setHidden={setHidden}
            hidden={hidden}
            From="Reality"
            nameHandler={nameHandler} 
            name={name}
            setName={setName}
            hiddenFailedAlert={hiddenFailedAlert}
            setHiddenFailedAlert={setHiddenFailedAlert}
            />
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

            <div className={`modal ${showFinishedFeedback && "scale-100 delay-500"}`}>
                <div className={`modal-body ${showFinishedFeedback && "scale-100 delay-500"}`}>
                    <p className='text-4xl'>Ok</p>
                </div>
            </div>
    </>
    );
}

export default ContactReality;