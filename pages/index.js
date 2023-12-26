import Layout from '../components/Layout'
import React, {useContext, useEffect} from 'react'
import authContext from '../context/auth/authContext'
import Link from 'next/link'
import Dropzone from '../components/Dropzone'
import appContext from '../context/app/appContext'
import Alert from '../components/Alert'

export default function Home() {
  //extract user auth of storage
  const AuthContext = useContext(authContext)
  const {userAuthenticatedHome} = AuthContext

  //extract msg error of files
  const AppContext = useContext(appContext)
  const { message_file, url} = AppContext

  //exectution only with token
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      userAuthenticatedHome()
    }
    
  }, [])

  return (
    <Layout>
      
        <div className='md:w-4/5 xl:w-3/5 mx-auto mb-32'>
          {url  ? (
            <>
              <p className='text-center text-2xl mt-10'><span className='font-bold text-red-700 text-4xl uppercase'>You URL is: </span>{`${process.env.frontendURL}/links/${url}`}</p>
              <button type='button' className='bg-red-500 hover:bg-gray-900 w-full text-white uppercase font-bold py-3 rounded-md mt-10'
              onClick={() => navigator.clipboard.writeText(`${process.env.frontendURL}/links/${url}`)}
              >Copy Link</button>
            </>
          ) :
          (
            <>
              { message_file && <Alert/>}
              <div className='lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10'>
                <Dropzone/>
                <div className='md:flex-1 mb-3 mx-2 mt-16 lg:mt-0'>
                  <h2 className='text-4xl font-sans font-bold text-gray-800 my-4'>Share files made easy</h2>
                  <p className='text-lg leading-loose'>
                    <span className='text-red-500 font-bold'>ReactNodeSend </span>Enables file to share with end-to-end encryption and a fiel that is removed after to be downloaded
                  </p>
                  <Link href="/createaccount">
                    <p className='text-red-500 font-bold text-lg hover:text-red-700'>Create Account to more bonus</p>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
        
    </Layout>
  )
}
