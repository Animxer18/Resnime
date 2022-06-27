import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { app, db } from '../Firebase/firebase';
import FormFeedback from '../FormFeedback';
import ContactComp from './ContactComp';
import SimpleModalComp from '../SimpleModalComp'
import { useNavigate } from 'react-router-dom';



function ContactRL(props) {
    let [hidden,setHidden] = useState(false)
    let [hiddenSuccessAlert,setHiddenSuccessAlert] = useState(false)
    let [hiddenFailedAlert,setHiddenFailedAlert] = useState(false)
    let [name,setName] = useState("")
    

    let nameHandler = (e)=>{
        e.preventDefault();
        if(name.toLowerCase().match("restu") || 
            name.toLowerCase().match("restu averian") || 
            name.toLowerCase().match("restu averian putra") || 
            name.toLowerCase().match("res") || 
            name.toLowerCase().match("stu") ){
            setHidden(false)
            setHiddenSuccessAlert(true)
            setName("")
        }else{
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
    const navigate = useNavigate()


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
        if(msg.length>3){
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
            await addDoc(collection(db, "feedback-from-irl"), {
                email: email,
                message: msg,
              });
              setMsg("")
              setHiddenSuccessAlert(true)
              setShowFinishedFeedback(true)
        }
        catch(e){
        }
        
    }
    const backHome = ()=>{
        navigate("/")
    }
    useEffect(
        ()=>{
            fetchUserData()
        },[]
    )
    
    return (
        <>
            <ContactComp 
            imgContact="https://i.pinimg.com/originals/ae/7f/f9/ae7ff98ff0e808ff7d241733ad84a43a.png"
            setHidden={setHidden}
            hidden={hidden}
            From="RL"
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
             <SimpleModalComp
                isShowModal={showFinishedFeedback}
                setShowModal={setShowFinishedFeedback}
                pesan="Feedback telah dikirim!"
                pesanKecil={`Feedbackmu akan dibaca oleh ${name}, sang owner dari website ini`}
                ActionButton={backHome}
                MainButton="Kembali ke home"
            />
            
        </>
    );
}

export default ContactRL;