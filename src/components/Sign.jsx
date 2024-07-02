import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Sign = () => {
const navigate = useNavigate();
const [emailcount, setEmail] = useState('');
  const [passwordCount, setPassword] = useState('')
  const [toastMessage, setToastMessage] = useState("");
  ;

  const [formSign, setFormDataSign] = useState({
    userName: '',
    name: '',
    email: '',
    image: '',
    password: ''
  });


  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataSign({
      ...formSign,
      [name]: value
    });
  };



  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formSign.email)) {
      setError('Invalid email format');
      return;
    }
    if (formSign.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!formSign.name) {
      setError('name is required');
      return;
    }
    if (!formSign.userName) {
      setError('User Name is required');
      return;
    }
    if (!formSign.userName.startsWith('@')) {
      setError('User Name must start with @');
      return;
    }
    if (!formSign.image) {
      setError('image URL is required');
      return;
    }
    setError('');
    try {
      const response = await axios.post('https://6682c0824102471fa4c81b49.mockapi.io/users', formSign);
      setToastMessage("User Sign Up Successfully");

  
    } catch (error) {
      console.error(error);
      setError('Sign up failed');
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
 

    try {
    const response = await axios.get('https://6682c0824102471fa4c81b49.mockapi.io/users');
      const User = response.data.find(user => user.email === emailcount && user.password === passwordCount  );
      if (User) {
      localStorage.setItem('isLoggedIn',  JSON.stringify(User));
      navigate("/Home");
      }
    } catch (error) {
      console.error(error);
      setError('Sign in failed');
    }
  
};
  return (
    <>
    <div className='contaner flex'>
    <div className='flex justify-center items-center min-h-screen'>
  <div className='w-[50%] max-sm:hidden'>
    <div className="flex justify-end items-center">
      <svg 
        xmlnsXlink="http://www.w3.org/2000/svg" 
        viewBox="0 0 512 512" 
        style={{ width: "50vw", height: "50vh", fill: "white" }} 
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
      </svg>
    </div>
  </div>
</div>

        <div className=' bg-base w-[50%] h-[100vh]  max-sm:w-[100%] '>
<div className='flex flex-col max-sm:flex-col max-sm:items-center   '>
    <p className='text-white max-sm:text-center text-left font-extrabold text-6xl mb-2 mt-20'>Happening now</p>
    <p className='text-white  max-sm:text-center text-left font-extrabold text-3xl mb-6 mt-5'>Join today.</p>
    <button
    className="flex  items-center mb-2 justify-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    <svg className="h-6 w-6 mr-2" xmlnsXlink="http://www.w3.org/2000/svg"
        viewBox="-0.5 0 48 48" version="1.1">

        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                    <path
                        d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                        id="Fill-1" fill="#FBBC05"> </path>
                    <path
                        d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                        id="Fill-2" fill="#EB4335"> </path>
                    <path
                        d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                        id="Fill-3" fill="#34A853"> </path>
                    <path
                        d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                        id="Fill-4" fill="#4285F4"> </path>
                </g>
            </g>
        </g>
    </svg>
    <span>Continue with Google</span>
</button>

<button
    className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    <svg className="h-6 w-6 mr-2" xmlnsXlink="http://www.w3.org/2000/svg" 
        viewBox="-1.5 0 20 20" version="1.1">
        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="#000000">
                <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                        d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485"
                        id="apple-[#173]">

                    </path>
                </g>
            </g>
        </g>
    </svg>

    <span>Continue with Apple</span>
</button>
<h1 className="text-left max-sm:hidden overflow-hidden before:h-[1px] after:h-[1px] after:bg-slate-200 
           after:inline-block after:relative after:align-middle after:w-1/4 
           before:bg-slate-200 before:inline-block before:relative before:align-middle 
           before:w-1/4 before:right-1 after:left-1 text-xl p-4">or
</h1>
      <button
        onClick={() => document.getElementById('my_modal_1').showModal()}
        className="flex max-sm:w-[50%] items-center max-sm:mt-4 justify-center bg-sky-500 hover:bg-sky-600 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <span>Create Account</span>
      </button>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center text-white">Sign Up</h3>
            <div className="my-4">
              <label className="block text-sm font-medium text-white">
                Username
              </label>
              <input
                type="text"
                name="userName"
                value={formSign.userName}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder='@UserName'
                required
              />
            </div>
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
            Name
              </label>
              <input
                type="text"
                name="name"
                value={formSign.name}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='Name'
              />
            </div>
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formSign.email}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='Name@gmail.com'

              />
            </div>
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                image
              </label>
              <input
                type="text"
                name="image"
                value={formSign.image}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='url'

              />
            </div>
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formSign.password}
                onChange={handleChange}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='******'
              />
                    {toastMessage && (
            <div className="alert alert-info p-4 mt-4 bg-blue-100 rounded-lg shadow-lg text-blue-700">
              <span>{toastMessage}</span>
            </div>
        )}
            </div>
            <div className="modal-action">
              <button type="submit" onClick={handleSubmit} className="btn bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4 py-2">
                Sign Up
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </div>
      </dialog>
<p className='mt-5 mb-3'>Already have an account?</p>
<button
    onClick={() => document.getElementById('my_modal_2').showModal()}
    className="flex max-sm:w-[50%] items-center justify-center border border-gray-200 rounded-lg shadow-md max-w-xs px-6 py-2 text-sm font-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
    <span>Sign in</span>
</button>
<dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl text-center text-white">Sign in</h3>

            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={emailcount}
                onChange={(e) => setEmail(e.target.value)}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='Name@gmail.com'

              />
            </div>
            <div className="my-4">
            <label className="block text-sm font-medium text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={passwordCount}
                onChange={(e) => setPassword(e.target.value)}
                className="text-left btn mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
                placeholder='******'
              />
            </div>
            <div className="modal-action">
              <button type="submit" onClick={handleSubmit2} className="btn bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4 py-2">
                Sign in
              </button>
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        </div>
      </dialog>

</div>


</div>




    </div>
    
    
    </>
  )
}

export default Sign