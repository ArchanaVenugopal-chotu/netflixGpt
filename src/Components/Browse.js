import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Utils/firebase'
import { useNavigate } from 'react-router-dom'

function Browse() {
    const navigate = useNavigate()
    const handleLogout = async () =>{
        await signOut(auth)
        navigate("/")
    }
  return (
    <div>
      browse
      <button className="left" onClick={()=>handleLogout()}>Logout</button>
    </div>
  )
}

export default Browse
