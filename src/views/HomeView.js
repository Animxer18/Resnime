import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import {app} from '../components/Firebase/firebase';
import RecentRelease from '../components/RecentRelease';

function HomeView(props) {
    const auth = getAuth(app)
    const SignOut = ()=>{
        console.log("yeah clicked")
        signOut(auth).then(
            ()=>{
                console.log("logout successfull")
            }
        )
    }
    return (
        <div className='container mx-auto'>
            <div className='my-5'>
                <h1 className='text-4xl font font-semibold mb-10'>Recent Released</h1>
                <button onClick={SignOut}>Sign Out</button>
                <RecentRelease />
            </div>
        </div>
    );
}

export default HomeView;