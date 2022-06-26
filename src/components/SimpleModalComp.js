import React from 'react';

function SimpleModalComp(props) {
    return (
        <div className={`modal ${props.isShowModal && 'scale-100'}`}>
            <div className={`modal-body transition-all duration-300 ${props.isShowModal && 'lg:scale-100 scale-90'}`}>
                <i onClick={()=>props.setShowModal(false)} 
                    className="absolute cursor-pointer bx bx-x bx-lg -top-5 -right-5 bg-black text-white rounded-full" ></i>
                    <h1 className='lg:text-3xl text-2xl font-semibold'>{props.pesan}</h1>
                    <div className='border-b border-gray-500 mt-2 mb-4'></div>
                    <p className='w-11/12 '>{props.pesanKecil}</p>
                    <button className='border-black border text-back px-4 py-2 rounded-md text-xl mt-5' onClick={props.ActionButton}>{props.MainButton}</button>
            </div>
        </div>
    );
}

export default SimpleModalComp;