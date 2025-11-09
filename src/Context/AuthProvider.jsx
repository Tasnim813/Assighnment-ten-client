import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword,onAuthStateChanged,sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
;

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const createUserWithEmailAndPasswordfunc=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInWithEmailAndPasswordfunc=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }
   
    const   signOutfunc=()=>{
        return   signOut(auth)
    }
    const    sendPasswordResetEmailfunc=(email)=>{
        return   sendPasswordResetEmail(auth,email)
    }

  

    const authData={
        user,
        setUser,
        createUserWithEmailAndPasswordfunc,
        signInWithEmailAndPasswordfunc,
        
        signOutfunc,
        sendPasswordResetEmailfunc
      

    }
    useEffect(()=>{
       const unSubscribe=onAuthStateChanged(auth,(currentUser)=>{
        console.log(currentUser)
        setUser(currentUser)
    })
    return ()=>{
        unSubscribe()
    }
    },[])
    
    return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;