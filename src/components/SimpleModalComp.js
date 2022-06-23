import React from 'react';

function SimpleModalComp(props) {
    return (
        <div className={`modal ${props.isShowModal && 'scale-100'}`}>
            <div className={`modal-body transition-all duration-300 ${props.isShowModal && 'scale-100'}`}>
                <i onClick={()=>props.setShowModal(false)} 
                    className="absolute cursor-pointer bx bx-x bx-lg -top-5 -right-5 bg-blue-500 text-white rounded-full" ></i>
                    <h1>{props.pesan}</h1>
                    <p>{props.pesanKecil}</p>
                    <button onClick={props.ActionButton}>Login with google</button>
            </div>
        </div>
    );
}

export default SimpleModalComp;