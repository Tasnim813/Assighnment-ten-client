import React, { useContext, useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { auth } from '.././Firebase/Firebase';
import { motion } from 'framer-motion';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';

const googleprovider = new GoogleAuthProvider();

const Login = () => {
    const [show, setShow] = useState(false);
    const { user, setUser } = useContext(AuthContext);
    const emailRef = useRef(null);
const location=useLocation()
const from=location.state || '/'
const navigate=useNavigate()
console.log(location)


    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email?.value;
        const password = e.target.password?.value;
        signInWithEmailAndPassword(auth,email, password)
            .then(result => {
               if(!result.user?.emailVerified){
                toast.error('Your email is not verified');
                return ;
               }
                setUser(result.user);
                toast.success('Successfully login');
                navigate(from)
            })
            .catch(error => {
                toast.error(error.code);
            });
    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        signInWithPopup(auth,googleprovider)
        .then((result)=>{
            setUser(result.user);
            toast.success("Successfully Login");
            navigate(from)
        })
        .catch(error=>{
            toast.error(error.message);
        })
    }

  
  

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
       
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="card  w-full max-w-sm shadow-2xl "
            >
                
                <div>
             <h1 className='text-white text-4xl mb-5 font-bold text-center'>Login Now!!</h1>
                    <div className="card-body rounded-2xl bg-gray-800">
                   
                        <form onSubmit={handleSignIn} className="space-y-4">
                            <div className="flex flex-col space-y-1">
                                <label className="text-gray-300 font-semibold">Email</label>
                                <input type="email" ref={emailRef} required name='email' 
                                       className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-cyan-400" 
                                       placeholder="Email" 
                                />
                            </div>

                            <div className="relative flex flex-col space-y-1">
                                <label className="text-gray-300 font-semibold">Password</label>
                                <input required type={show ? 'text' : 'password'} name='password'
                                       className="input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-cyan-400" 
                                       placeholder="Password" 
                                />
                                <span onClick={() => setShow(!show)} 
                                      className='absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-cyan-400'>
                                    {show ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <div className="text-right">
 
</div>
                            
                            <button type='submit' 
                                    className="btn w-full bg-cyan-500 hover:bg-cyan-400 text-white font-bold shadow-lg transition-all">
                                Login
                            </button>

                            <p className="text-center text-gray-300 text-sm">
                                Don't have an account? <Link className="text-cyan-400 hover:text-cyan-300" to='/register'>Create an account</Link>
                            </p>

                            <div className="flex items-center justify-center gap-2 my-2">
                                <div className="h-px w-16 bg-gray-600"></div>
                                <span className="text-sm text-gray-400">or</span>
                                <div className="h-px w-16 bg-gray-600"></div>
                            </div>

                            <button onClick={handleGoogleSignIn} 
                                    className="btn w-full bg-gray-800 hover:bg-gray-700 border border-cyan-400 text-cyan-400 hover:text-white font-semibold transition-all shadow-md">
                                Login with Google
                            </button>
                        </form>
               
                </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;

