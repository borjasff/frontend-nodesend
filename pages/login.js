import Layout from '../components/Layout'
import React, {useContext, useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import authContext from '../context/auth/authContext'
import Alert from "../components/Alert"
import { useRouter } from 'next/router'

export default function Login() {

    //define context
    const AuthContext = useContext(authContext)
    const {message, login, authenticated} = AuthContext

    //next router
    const router = useRouter()
    useEffect(() => {
        if(authenticated){
            router.push('/')
        }
    },[authenticated])

    //form and validation with formik and yup
  const formik = useFormik({
    initialValues: {
        email: "",
        password: ""
    },
    validationSchema: Yup.object({
        email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
        password: Yup.string()
        .required("Password is required"),
    }),
    onSubmit: values => {
        login(values);
    }
})


  return (
    <Layout>
    <div className='md:w-4/5 xl:w3/5 mx-auto mb-32'>
        <h2 className='text-4xl font-sans font-bold text-gray-800 text-center my-4'>Login</h2>
        {message && <Alert/>}
        <div className='flex justify-center mt-5'>
            <div className='max-w-lg w-full'>
                <form onSubmit={formik.handleSubmit} className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'>
                    
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-black text-sm font-bold mb-2'>Email</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type='email' id="email" placeholder='User email' className='shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                        <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error</p>
                            <p>{formik.errors.email}</p>
                        </div>
                    ): null}
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-black text-sm font-bold mb-2'>Password</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type='password' id="password" placeholder='User password' className='shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                        <div className='my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error</p>
                            <p>{formik.errors.password}</p>
                        </div>
                    ): null}
                        <input type='submit' className='bg-red-500 hover:bg-gray-900 w-full text-white uppercase font-bold py-3 rounded-md' value="Login"/>
                </form>

            </div>
        </div>
    </div>
  </Layout>
  )
}