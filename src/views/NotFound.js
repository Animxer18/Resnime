import React from 'react';
import { Link } from 'react-router-dom';
import ContactAll from '../components/ContactsComp/ContactAll';
import ContactReality from '../components/ContactsComp/ContactReality';
import ContactRL from '../components/ContactsComp/ContactRL';

function NotFound() {
    return (
        <div className='flex  text-center justify-center flex-col h-screen items-center'>
            <h1 className='text-4xl font-semibold'>Page Not Found</h1>
            <p className='w-96 my-5'>Jikalau di saat membuka sebuah anime, dan menemukan halaman ini. Mohon hubungi aku ya lewat 3 cara di bawah!</p>
            
            {/* <!-- modify this form HTML and place wherever you want your form --> */}
            <div className='grid grid-cols-3 gap-5 my-5'>
                <ContactRL />
                <ContactReality />
                <ContactAll />
            </div>
            <Link to='/' className='px-4 py-2 rounded-md bg-blue-500 text-white'>Kembali ke home</Link>
        </div>
    );
}

export default NotFound;