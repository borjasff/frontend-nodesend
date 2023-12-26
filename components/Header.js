
import React, {useContext, useEffect} from 'react'
import authContext from '../context/auth/authContext'

import appContext from '../context/app/appContext'
import Link from 'next/link'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/router'

const Header = () => {
  //routing
  const router = useRouter()
    //extract user auth of storage
    const AuthContext = useContext(authContext)
    const {userAuthenticatedHome, user, logout} = AuthContext
  
    //extract user auth of storage
    const AppContext = useContext(appContext)
    const { clearState } = AppContext
    useEffect(() => {
      userAuthenticatedHome()
    }, [])

    const redirect = () => {
      router.push('/')
      clearState()
    }

  return (
    <header className='py-8 flex flex-col md:flex-row items-center justify-between'>
        
          <img 
          onClick={() => redirect()}
          src='/logo.svg' className='w-64 mb-8 md:mb-0 cursor-pointer'/>  
        

        
        <div className='flex flex-row'>
          {user ? (
            <div className='flex items-center'>
              <p  className='mr-2'>Hi! {user.name}</p> 
              <button type='button' 
              onClick={() => logout()}
              className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'> Logout</button>
            </div>
              
          ) : (
            <>
              <Link href="/login" >
                    <p className='bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2'>Login</p>
                </Link>
                <Link href="/createaccount" >
                    <p className='bg-black px-5 py-3 rounded-lg text-white font-bold uppercase'>Create Account</p>
                </Link> 
            </>
            )}
        </div>
    </header>
  )
}

export default Header