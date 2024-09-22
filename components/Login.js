'use client'
import { sendPasswordResetEmail } from 'firebase/auth';
import React, {useState} from 'react'
import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
import { auth } from '@/firebase';

const fugaz = Fugaz_One ({ subsets: ['latin'], weight: ['400']})

export default function Login() {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[isRegister, setIsRegister] = useState(false)
  const[error, setError] = useState('')
  const[authenticating, setAuthenticating] = useState(false)

  const {signup, login} = useAuth()

  async function handleSubmit (){
    if(password.length < 6) {
      setError('Password mus have at least 6 characters')
    }
    if(!email || !password) {
      setError('Cant be empty')
    }
    setAuthenticating(true)
    try{
    if(isRegister) {
      console.log('Signing up a new user')
      await signup(email, password)
    } else {
      console.log('logging in existing user')
      await login(email, password)
    }
  } catch (err) {
      console.log(err.message)
  } finally{
    setAuthenticating(false)
  } 

  }

  async function handlePasswordReset() {
    if (!email) {
      setError('Please enter your email to reset password');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
    } catch (err) {
      setError(err.message);
    }
  }


  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={' text-4xl sm:stext-5xl md:text-6xl ' 
        + fugaz.className}>{isRegister ? 'Register' : 'Log in'}</h3>
        <p>You're one step away</p>
        <input 
        value={email} onChange={(e)=>{setEmail(e.target.value)}}
        className='max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-200 rounded-full duration-200 outline-none hover:border-indigo-400 focus:border-indigo-600'
        placeholder='Email' />
        <input 
        value={password} onChange={(e)=>{setPassword(e.target.value)}}
        className='max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-200 rounded-full duration-200 outline-none hover:border-indigo-400 focus:border-indigo-600'
        placeholder='Password' type='password' />
        <div className='max-w-[400px] w-full mx-auto'>
          <Button clickHandler={handleSubmit} text={ authenticating ? 'Submiting' : 'Submit' } full/>
          {error ? error : ' '}
        </div>
        <p>{isRegister ? 'Already have an account' : 'Dont have an account?' }
          <button onClick={() => setIsRegister(!isRegister)} className='text-indigo-600'>
            {isRegister ? 'Sign in' : 'Sign up'}</button></p>
            {!isRegister && (
        <p>
          Forgot your password?
          <button onClick={handlePasswordReset} className='text-indigo-600'>
            Reset Password
          </button>
        </p>
      )}
      </div>
  )
}
