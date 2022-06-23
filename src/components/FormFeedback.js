import React from 'react';
function FormFeedbackIRL(props) {
  
   
    return (
        <div className={`modal ${props.hiddenSuccessAlert && "scale-100"}`}>
                <div className={`modal-body ${props.hiddenSuccessAlert && "scale-100 delay-500"}`}>
                    <i onClick={()=>props.setHiddenSuccessAlert(false)} 
                        className="absolute cursor-pointer bx bx-x bx-lg -top-5 -right-5 bg-blue-500 text-white rounded-full" ></i>
                    
                    
                    <h1 className='text-3xl font-semibold'>Jadi ada keluhan apa ?</h1>


                    <div className='my-5'>
                        <form onSubmit={props.addFeedback}
                        className='flex flex-col space-y-5'
                        >   
                            <div className='flex flex-col space-y-3 text-left'>
                                <label htmlFor='email'>Your email:</label>
                                <input value={props.email} onChange={props.validateEmail}  type="email" id='email' name="email" 
                                    className={`${props.errorEmail && 'border-red-500 text-red-500'} px-4 py-2 border border-gray-300 focus:outline-0`}/>
                                <p className="text-red-500">{props.errorEmail}</p>
                            </div>

                            <div className='flex flex-col space-y-3 text-left'>
                                <label htmlFor='message'>Your message:</label>
                                <textarea value={props.msg} onChange={props.validateMsg} name="message"  id='message' className='px-4 py-2 border border-gray-300 focus:outline-0'></textarea>
                                {props.errorMsg}
                            </div>
                            <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 text-white my-5">Send</button>
                        </form>
                    </div>
                </div>
        </div>
     
    );
}

export default FormFeedbackIRL;