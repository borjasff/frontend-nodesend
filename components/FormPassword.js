import React, {useState, useContext} from 'react'
import appContext from '../context/app/appContext'

const FormPassword = () => {

  const AppContext = useContext(appContext)
  const { addPassword, addDownload } = AppContext

  const[havePassword, setHavePassword] = useState(false)

  return (
    <div className='w-full mt-20'>
      <div>
        <label className='text-lg text-gray-800'>Remove after:</label>
        <select 
            onChange={e => addDownload(parseInt(e.target.value))}
            className='apparence-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'>
            <option value='' selected disabled>-- Select --</option>
            <option value='1'>1 download</option>
            <option value='5'>5 downloads</option>
            <option value='10'>10 downloads</option>
            <option value='20'>20 downloads</option>
        </select>
        </div>
    
        <div className='mt-4'>
          <div className='flex justify-between items-center'>
            <label className='text-lg text-gray-800 mr-2'>Protect with Password</label>
                  <input type='checkbox' onChange={() => setHavePassword(!havePassword)}/>
            
          </div>
          {havePassword ? (
            <input type='password' 
                  onChange={e => addPassword(e.target.value)}
                    className='apparence-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 pr-8 rounded leading-none focus:outline-none focus:border-gray-500'/>    
                      
          ) : null}
            
          
        </div>
    </div>
  )
}

export default FormPassword