import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar'
import Rightbar from './Rightbar'
import { useNavigate } from "react-router-dom";
import axios from 'axios';



const Home = () => {
  const [users, setUsers] = useState([]);
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);


  const [showMenu, setShowMenu] = useState(false);

  const handleSvgClick = () => {
    setShowMenu(!showMenu);
  };


  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('isLoggedIn');
    if (userData) {
      const parsedUsers = JSON.parse(userData);
      setUsers(parsedUsers);

    }
  }, []);

  const handleAddPost = async () => {
    if (!users || !users.id) {
      console.error('No student data available');
      return;
    }

    try {
      await axios.post('https://6682c0824102471fa4c81b49.mockapi.io/tweet', {
        name: users.name,
        username:users.userName,
        userid: users.id,
        image:users.image,
        tweet: tweet,
        likedBy:[]
      });
      setToastMessage("Post Added Successfully");

    } catch (error) {
      console.error('Error adding project:', error);
    }
  };


  useEffect(() => {
    axios.get('https://6682c0824102471fa4c81b49.mockapi.io/tweet')
      .then(response => {
        const tweetsData = response.data;
        setTweets(tweetsData);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteTweet = async (id) => {
    try {
      await axios.delete(`https://6682c0824102471fa4c81b49.mockapi.io/tweet/${id}`);
      setTweets(tweets.filter(tweet => tweet.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };
  const fetchTweets = () => {
    axios.get('https://6682c0824102471fa4c81b49.mockapi.io/tweet')
      .then(response => {
        setTweets(response.data.map(tweet => ({
          ...tweet,
          likedBy: tweet.likedBy || [], 
        })));
      })
      .catch(error => {
        console.error('Error fetching tweets:', error);
      });
  };

  const handleChange = async (id, likedBy) => {
    const loggedInUser = JSON.parse(localStorage.getItem('isLoggedIn'));

    if (!loggedInUser) {
      console.error('No logged-in user found');
      return;
    }

    const userId = loggedInUser.id;
    const newLikedBy = likedBy.includes(userId) ? likedBy.filter(uid => uid !== userId) : [...likedBy, userId];

    try {
      const response = await axios.put(`https://6682c0824102471fa4c81b49.mockapi.io/tweet/${id}`, {
        likedBy: newLikedBy
      });

      setTweets(tweets.map(tweet => tweet.id === id ? response.data : tweet));
    } catch (error) {
      console.error('Error updating tweet:', error);
    }
  };

  useEffect(() => {
    fetchTweets(); 
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem('isLoggedIn'));
  const userId = loggedInUser ? loggedInUser.id : null;

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate(`/`);
    }
  }, [navigate]);
  return (
    <>
        <div className='flex'>

    <Sidebar/>
<div className='bg-primary w-[80vw] h-auto border border-gray-700'>
  <div className='flex border border-gray-700'>
<button className='btn btn-primary w-[50%]'>For You</button>
  <button className='btn btn-primary w-[50%]'>  Following
  </button>
  </div>
  <div className='flex flex-col border border-gray-700 '>
    <div className='flex mt-3'>
<img className='w-10 h-10 rounded-full mr-2 ml-4 ' src={users.image} />
<input 
type="text" 
className='w-[30vw] bg-primary'
placeholder='What is happening ?!'
value={tweet}
onChange={(e) => setTweet(e.target.value)}

/>
    </div>
    <div className='flex mt-5 ml-10 mb-5 '>
    <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-5 w-5 ml-5'>
        <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-5 w-5 ml-5'>
        <path d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032H9.4v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-5 w-5 ml-5'>
        <path d="M6 5c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zM2 7c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12V6h10v2zM6 15c-1.1 0-2 .895-2 2s.9 2 2 2 2-.895 2-2-.9-2-2-2zm-4 2c0-2.209 1.79-4 4-4s4 1.791 4 4-1.79 4-4 4-4-1.791-4-4zm20 1H12v-2h10v2zM7 7c0 .552-.45 1-1 1s-1-.448-1-1 .45-1 1-1 1 .448 1 1z" />
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-5 w-5 ml-5'>
        <path  d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z" />
      </svg> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-5 w-5 ml-5'>
        <path d="M6 3V2h2v1h6V2h2v1h1.5C18.88 3 20 4.119 20 5.5v2h-2v-2c0-.276-.22-.5-.5-.5H16v1h-2V5H8v1H6V5H4.5c-.28 0-.5.224-.5.5v12c0 .276.22.5.5.5h3v2h-3C3.12 20 2 18.881 2 17.5v-12C2 4.119 3.12 3 4.5 3H6zm9.5 8c-2.49 0-4.5 2.015-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.01-4.5-4.5-4.5zM9 15.5C9 11.91 11.91 9 15.5 9s6.5 2.91 6.5 6.5-2.91 6.5-6.5 6.5S9 19.09 9 15.5zm5.5-2.5h2v2.086l1.71 1.707-1.42 1.414-2.29-2.293V13z" />
      </svg> 
      <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(29, 155, 240)"  viewBox="0 0 24 24" stroke="rgb(29, 155, 240)" className='h-5 w-5 ml-5'>
        <path  d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z" />
      </svg>

    <button 
    className=" h-7 w-16 ml-12 text-white bg-sky-500 hover:bg-sky-600 rounded-3xl"
    onClick={handleAddPost}

    >Post</button>

    </div>


  </div>
  <div className='contianer'>
  {tweets.map((user, index) => (

  <div  key={user.id}  className='tweet w-full border border-gray-700  rounded-lg p-4  text-white'>
  <div className='head flex justify-between mb-2'>
    <div className='flex items-center'>
      <img className='w-10 h-10 rounded-full mr-2' src={user.image} />
      <h3 className='text-lg font-semibold mr-3'>{user.name}</h3>
  <p className='text-md text-gray-400 mr-3'>{user.username}</p>
  <p className='text-md text-gray-400 mr-3'>2h</p>
    </div>
    <div className='flex '>
    <div style={{ position: 'relative' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-5 w-5"
        onClick={handleSvgClick}
        style={{ cursor: 'pointer' }} 
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
        />
      </svg>
      {showMenu && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '40px',
          backgroundColor: 'primary',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          zIndex: '1000',
          width:"20px"
        }}>
          <button 
          className="btn hover:bg-red-950"
          onClick={() => handleDeleteTweet(user.id)}

           >Delete</button>
        </div>
      )}
    </div>
</div>


  </div>
  <div className='body mb-2'>
    <p className=''>{user.tweet}</p>
  </div>
  <div className='footer grid grid-cols-4 gap-4 mt-2 text-gray-500'>
    <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/>
      </svg>
      <span >1.2k</span>
    </div>
    <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path  d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z" />
      </svg>
      <span >8k</span>
    </div>
    <div className='flex items-center'>
    <button
            onClick={() => handleChange(user.id, user.likedBy)} 
                 style={{ color: user.likedBy.includes(userId) ?  'red' : 'gray' }}
      >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
      </svg>
        </button>
      <span >2.4k</span>
    </div>
    <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/>
      </svg>
      <span >200K</span>
    </div>
    <div className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/>
      </svg>  
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5'>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"/>
      </svg>

    </div>
  </div>
</div>
              ))}



  </div>



</div>

<Rightbar/>
    </div>
    </>
  )
}

export default Home