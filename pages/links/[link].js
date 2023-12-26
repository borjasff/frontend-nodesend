import Layout from "../../components/Layout";
import React, {useState, useContext} from 'react'
import clientAxios from "../../config/axios";
import appContext from "../../context/app/appContext";
import Alert from "../../components/Alert";

export async function getServerSideProps({params}) {
    const {link} = params;
    const answer = await clientAxios.get(`/api/links/${link}`)
    console.log(answer)
    return{
        props: {
            link: answer.data
        }
    }
}

//generate different url for all dinamic content 
export async function getServerSidePaths() {
    const links = await clientAxios.get('/api/links')
    //console.log(links.data)

    return{
        paths: links.data.map(link => ({
            params: {link: link.url}
        })),
        fallback: false
    }
}

export default ({link}) => {

    const AppContext = useContext(appContext)
    const {  showAlert, message_file} = AppContext
    //console.log(link)
    const [ havePassword, setHavePassword] = useState(link.password)
    const [ password, setpassword] = useState('')
    
    console.log(havePassword)

    const validatePassword= async e => {
        e.preventDefault()
        
        const data = {
            password
        }
        try {
            const answer = await clientAxios.post(`/api/links/${link.link}`, data)
           
            setHavePassword(answer.data.password)
        } catch (error) {
            showAlert(error.response.data.msg)
        }
        
    }
  return (
    <Layout>
        {
            havePassword ? (
                <>
                <p className="text-center">This link is password protected</p>
                { message_file && <Alert/>}
                <div className='flex justify-center mt-5'>
                <div className='max-w-lg w-full'>
                <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                onSubmit={e => validatePassword(e)}>
                <div className='mb-4'>
                        <label htmlFor='password' className='block text-black text-sm font-bold mb-2'>Password</label>
                        <input value={password} onChange={e => setpassword(e.target.value)}  type='password' id="password" placeholder='Link password' className='shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
                    </div>
                    
                    <input type='submit' className='bg-red-500 hover:bg-gray-900 w-full text-white uppercase font-bold py-3 rounded-md' value="Validated Password"/>
                </form>
                </div>
                </div>
                </>
                
            ) : (
                <>
                    <h1 className="text-4xl text-center text-gray-400">Download you file:</h1>
                    <div className="flex items-center justify-center mt-10">
                        <a href={`${process.env.backendURL}/api/files/${link.doc}`}
                        download
                        className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-red-800">Here</a>
                    </div>
                </>
            )
        }
        
    </Layout>
  )
}
