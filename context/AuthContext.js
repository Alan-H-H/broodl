'use client'
import { auth, db } from '@/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore';
import React, {useContext, useState, useEffect} from 'react'

const AuthContext= React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}


export function AuthProvider({children}){

    const[currentUser, setCurrentUser] = useState(null)
    const[userDataObj, setUserDataObj] = useState(null)
    const[loading, setLoading] = useState(true)

    //AUTH HANDLERS
    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
          try {
            setLoading(true);
            setCurrentUser(user);
      
            if (!user) {
              return console.log('No user found');
            }
      
            // If user exists, fetch user data from Firestore
            const docRef = doc(db, 'users', user.uid); // Reference to the Firestore document
            const docSnap = await getDoc(docRef); // Fetch document from Firestore
            
            let firebaseData = {};
            if (docSnap.exists()) {
              console.log('fetching user data')
              firebaseData = docSnap.data(); // Fetch document data
              console.log('User data:', firebaseData);
            }
            setUserDataObj(firebaseData);
          } catch (err) {
            console.error('Error fetching user data:', err.message);
          } finally {
            setLoading(false);
          }
        });
      
        return unsubscribe;
      }, []);
      

      const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        login,
        logout,
        loading,
      };
    
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}