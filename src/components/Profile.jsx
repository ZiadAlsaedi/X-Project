import React, { useState, useEffect } from "react";
import Sidebar from './Sidebar'
import Rightbar from './Rightbar'
import axios from 'axios';


const Profile = () => {
    const [users, setUsers] = useState([]);
    const [tweets, setTweets] = useState([]);
    const [likedTweets, setLikedTweets] = useState([]);
    const [TweetsCount, setTweetsCount] = useState([]);



    const [showMenu, setShowMenu] = useState(false);

    const handleSvgClick = () => {
      setShowMenu(!showMenu);
    };
  
    const handleDeleteTweet = async (id) => {
        try {
          await axios.delete(`https://6682c0824102471fa4c81b49.mockapi.io/tweet/${id}`);
          setTweets(tweets.filter(tweet => tweet.id !== id));
        } catch (error) {
          console.error('Error deleting project:', error);
        }
      };

    useEffect(() => {
        const userData = localStorage.getItem('isLoggedIn');
        if (userData) {
          const parsedUsers = JSON.parse(userData);
          setUsers(parsedUsers);
    
        }
      }, []); 

      
  useEffect(() => {
    axios.get('https://6682c0824102471fa4c81b49.mockapi.io/tweet')
      .then(response => {
        const loggedInUser = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (loggedInUser) {
            const filteredTweet = response.data.filter(tweet => tweet.userid === loggedInUser.id);
            setTweets(filteredTweet);
            setTweetsCount(filteredTweet.length)

          }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const MyTweet = async () => {
    axios.get('https://6682c0824102471fa4c81b49.mockapi.io/tweet')
      .then(response => {
        const loggedInUser = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (loggedInUser) {
            const filteredTweet = response.data.filter(tweet => tweet.userid === loggedInUser.id);
            setTweets(filteredTweet);
          }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  const fetchTweets = () => {
        axios.get('https://6682c0824102471fa4c81b49.mockapi.io/tweet')
            .then(response => {
                const loggedInUser = JSON.parse(localStorage.getItem('isLoggedIn'));
                if (loggedInUser) {
                    const likedTweets = response.data.filter(tweet => tweet.likedBy && tweet.likedBy.includes(loggedInUser.id));
                    setTweets(likedTweets);
                }
            })
            .catch(error => {
                console.error('Error fetching liked tweets:', error);
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


  
  return (
    <>
 <div className='flex'>
 <Sidebar/>

 <div className='bg-primary w-[70vw] max-sm:w-[80vw] h-auto border border-gray-700'>
    <div className='flex flex-col'>
        <div className='flex mt-4 mb-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="white"  viewBox="0 0 24 24" stroke="white" className='h-5 w-5 ml-5 mr-5 mt-2'>
        <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/>
      </svg>
      <div className='flex flex-col'>
      <p className='text-white text-left font-semibold text-base ml-2'>{users.name}</p>
      <p className='text-gray-400 text-left font-normal text-xs ml-2 ' > {TweetsCount} POST</p>
      </div>

        </div>
        <div className='w-full h-40 bg-slate-400 relative'>
        <img className='w-40 h-40 rounded-full ml-2 absolute top-20 ' src={users.image} alt="" />

        </div>
        <div className='flex justify-end mt-3 mr-3'>
        <button className="w-28 h-8 text-white border border-gray-400 hover:bg-slate-800  rounded-full">Edit Profile</button>
      
        </div>
        <div className='flex flex-col mt-10 ml-10'> 
        <h3 className='text-xl text-white font-semibold mr-3'>{users.name}</h3>
        <p className='text-md text-gray-400 mr-3'>{users.userName}</p>
        
        </div>
 
        <div className='flex ml-3 mt-5'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="gray"  viewBox="0 0 24 24" stroke="gray" className='h-5 w-5  mr-2'>
        <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"/>
      </svg>
      <p className='text-gray'>Joined October 2014</p>
        </div>
        <div className='flex ml-3 mt-3 mb-3'>
        <p className='text-white font-extrabold'>511 <span className='text-gray-500 font-medium'>Following</span></p>
        <p className='text-white font-extrabold ml-7'>40 <span className='text-gray-500 font-medium'> Followers</span></p>


        </div>


<div className='flex  max-sm:justify-center'> 
<button  onClick={MyTweet} className='btn btn-primary '>Posts</button>
  <button className='btn btn-primary '>Replies</button>
  <button className='btn btn-primary max-sm:hidden '>Highlights</button>
  <button className='btn btn-primary  max-sm:hidden '>Articles</button>
  <button className='btn btn-primary '>Media</button>
  <button  onClick={fetchTweets} className='btn btn-primary '>Likes</button>

</div>
<hr className="border-t-1 border-gray-400" /> 
<div className='contianer'>
  {tweets.slice().reverse().map((user, index) => (

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
    </div>
    <Rightbar/>


     </div>

    
    
    </>
  )
}

export default Profile