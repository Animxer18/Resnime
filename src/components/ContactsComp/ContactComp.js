import React from 'react';

function ContactComp(props) {
    return (
        <div>
            <div onClick={()=>props.setHidden(true)} className='px-4 text-center cursor-pointer py-8 rounded-xl border 
            border-gray-400 hover:shadow-xl duration-300 transition-all'>
                <h1>{props.From}</h1>
                <h1>Kenalan di {props.From}</h1>
            </div>

            <div className={`modal ${props.hidden && "scale-100"}`}>
                <div className={`modal-body ${props.hidden && "scale-100 delay-500"}`}>
                    <i onClick={()=>props.setHidden(false)} 
                        className="absolute cursor-pointer bx bx-x bx-lg -top-5 -right-5 bg-black text-white rounded-full" ></i>
                    <h1 className='lg:text-3xl  text-2xl font-semibold'>Afah iyah, coba tebak gwehj siapa ?</h1>
                    <p className='lg:text-sm text-base text-slate-500'>Nama panggilan gapapa si</p>
                    <form onSubmit={props.nameHandler} className='my-5'>  
                        <input value={props.name} onChange={(e)=>props.setName(e.target.value)} className='border w-full text-center px-4 py-2 border-gray-300 focus:outline-0' />
                    </form>
                </div>
            </div>


           
            <div className={`modal ${props.hiddenFailedAlert && "scale-100"}`}>
                <div className={`modal-body ${props.hiddenFailedAlert && "scale-100 "}`}>
                    <i onClick={()=>props.setHiddenFailedAlert(false)} 
                        className="absolute cursor-pointer bx bx-x bx-lg -top-5 -right-5 bg-black text-white rounded-full" ></i>
                    <h1 className='text-3xl font-semibold'>Tetot !</h1>
                    <p className='text-sm text-slate-500'>Kamu salah</p>
                   <button onClick={()=>props.setHiddenFailedAlert(false)} className="px-4 py-2 rounded-md lg:text-base text-xl bg-black text-white my-5">Yah coba lagi deh</button>
                </div>
            </div>

        </div>
    );
}

export default ContactComp;