import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Validation } from '../Utils/Validation';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Utils/firebase';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../Utils/userSlice';

function Login() {
    const [login,setLogin] = useState("signIn")
    const [error,setErrorMessage] = useState("");
    const email = useRef(null)
    const password = useRef(null);
    const name = useRef("");
    const dispatch = useDispatch()
    // const handleValidation = () =>{
    //     console.log(email)
    //     console.log(password)
    //     const message = Validation(name?.current?.value,email.current.value,password.current.value)
    //     console.log(message)
    //     setErrorMessage(message)
    //     if(message) return
    //     if(login !== "signIn"){
    //         createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
    //         .then((userCredential) => {
    //             // Signed up 
    //             const user = userCredential.user;
    //             console.log("signup api",user) 
                
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log("signup api error", errorCode,"-",errorMessage)
    //         });

    //     }else{ 
    //         signInWithEmailAndPassword(auth, email.current.value, password.current.value)
    //         .then((userCredential) => {
    //             // Signed in 
    //             const user = userCredential.user;
    //             console.log("signin api",user)
    //         })
    //         .catch((error) => {
    //             const errorCode = error.code;
    //             const errorMessage = error.message;
    //             console.log("signin api error",errorCode,"-",errorMessage)
    //         });
    //     }
        
    //     dispatch(addUser({
    //         email: email.current.value,
    //         name: name.current.value
    //     }));
    //     navigate("/browser")
    // }
    // const message = Validation(email.current.value, password.current.value)
    // setErrorMessage(message)
    const handleValidation = async () => {

        const message = Validation(
            name.current?.value,
            email.current.value,
            password.current.value
        );

        setErrorMessage(message);

        if (message) return;

        try {
            let userCredential;

            if (login !== "signIn") {
                userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );
                await updateProfile(userCredential.user, {
                displayName: name.current.value
            });
            dispatch(addUser({
                email: userCredential.user.email,
                name: userCredential.user.displayName,
                uid: userCredential.user.uid
            }));
            } else {
                userCredential = await signInWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );
            }

            console.log("Authenticated user:", userCredential.user);


        } catch (error) {
            setErrorMessage(error.message);
            console.log(error.code, error.message);
        }
    };
  return (
    <div className="absolute inset-0 min-h-screen">

      {/* Background Image */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/5aa70728-e223-472f-9230-babd8f6ba166/web/IN-en-20261019-TRIFECTA-perspective_79fa76c2-2cb2-4d20-8de2-f696f3b6131e_large.jpg"
        className="absolute inset-0 h-full w-full object-cover z-5"
        alt="Netflix Background"
      />
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/90 via-black/40 to-black/80"></div>


      {/* Login Form */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">

        <div className="w-96 rounded-md bg-black/75 px-10 py-12 text-white">

          <h1 className="mb-6 text-3xl font-bold">
            {login}
          </h1>

          {login !== "signIn" && (
                <>
                    <h6 className="mb-2">Full name</h6>
                    <input
                    type="fullname"
                    ref = {name}
                    className="mb-5 w-full rounded border border-gray-500 bg-gray-800 p-3 text-white outline-none"
                    placeholder="Full name"
                    />
                </>
                )}

          <h6 className="mb-2">Email</h6>
          <input
            type="email"
            ref = {email}
            className="mb-5 w-full rounded border border-gray-500 bg-gray-800 p-3 text-white outline-none"
            placeholder="Email or mobile number"
          />

          <h6 className="mb-2">Password</h6>
          <input
            type="password"
            ref = {password}
            className="w-full rounded border border-gray-500 bg-gray-800 p-3 text-white outline-none"
            placeholder="Password"
          />
          <p className='font-bold text-red-400 mb-6 '>{error}</p>

          <button onClick ={()=>{handleValidation()}} className="w-full rounded bg-red-600 py-3 font-bold hover:bg-red-700">
            {login}
          </button>

          <div className='mt-10'>
            <span>{login === "signIn" ? "New to netflix? " : "Already a Registered User? "}  </span>

            <button className="text-red-600 font-bold " onClick={()=>{login === "signIn" ? setLogin("signUp"): setLogin("signIn")}}>  {login === "signIn" ? "signUp": "signIn"}</button>
          </div>


        </div>
      </div>

    </div>
  );
}

export default Login;