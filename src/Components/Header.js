import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser, deleteUser } from '../Utils/userSlice'
import { auth } from '../Utils/firebase'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(addUser({
          email: user.email,
          name: user.displayName,
          uid: user.uid
        }));
        navigate("/browser")
      } else {
        dispatch(deleteUser());
        navigate("/")
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="relative min-h-screen">

      {/* Black gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/90 via-black/40 to-black/80"></div>

      {/* Netflix Logo */}
      <img
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAVIENVPMEM3Kn4hVzJseX4N8xPjtBDIpwuFDucWksdxQZ8Ss6Xf8U_vt7ThYYfRmzq0x1CS3nOwTGyVrgADvwfB_tPiK_liS2RjvI40RJSzbKRk-o8b3nCxHfCCnBsyB2XBB9_vRoSmN.svg"
        className="absolute left-8 top-5 z-20 w-36 h-auto"
        alt="Netflix Logo"
      />

      {/* Login / Browse pages */}
      <div className="relative z-10">
        <Outlet />
      </div>

    </div>
  )
}

export default Header