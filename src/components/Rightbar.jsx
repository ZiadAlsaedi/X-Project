import React from 'react'

const Rightbar = () => {
  return (
<div className='bg-primary w-[70vw] h-auto border border-gray-700 max-sm:hidden'>
<div className='flex justify-center mt-2 '>
  <div className="flex bg-gray-700 items-center  rounded-full px-3 py-2 w-[85%]">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className='h-5 w-5 mr-2'
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"
      />
    </svg>
    <input
      type="text"
      className="w-full outline-none bg-gray-700 " 
      placeholder='Search'
    />
  </div>
</div>
<div  className='flex justify-center mt-4  '>
<div className='flex flex-col bg-base  rounded-2xl px-2  py-2 w-[85%] h-[25vh] border border-gray-700'>
<p className='text-white text-left font-extrabold text-lg mb-2'>Subscribe to Premium</p>
<p className='text-white text-left font-semibold text-[.9em] mb-3'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
<button className="w-28 h-8 text-white bg-sky-500  hover:bg-sky-600  rounded-full">Subscribe</button>

</div>
</div>
<div  className='flex justify-center mt-4  '>
<div className='flex flex-col  bg-base  rounded-2xl px-3 py-2 w-[85%] h-[60vh] border border-gray-700'>
<p className='text-white text-left font-extrabold text-lg mb-2'>What’s happening</p>
<div className='flex '>
<img className='w-[6vw] h-[10vh]' src="https://pbs.twimg.com/semantic_core_img/1806377928504012800/LfXwmqlz?format=jpg&name=360x360" alt="" />
<div className='flex flex-col'>
<p className='text-white text-left font-semibold text-base ml-2'>France vs Belgium</p>
<p className='text-white text-left font-normal text-xs ml-2 ' > UEFA European Championship. Starts at 7:00 PM</p>
</div>
</div>
<div className='flex justify-between mt-2'>
  <p className='text-xs'>Trending in Saudi Arabia</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5 '>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </svg>

</div>
<p className='text-right text-white rtl'>تسجيل_في_الجامعات#</p>
<div className='flex justify-between mt-2'>
  <p className='text-xs'>Trending in Saudi Arabia</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5 '>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </svg>

</div>
<p className='text-right text-white rtl'>صالح الشهري</p>
<div className='flex justify-between mt-2'>
  <p className='text-xs'>Trending in Saudi Arabia</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5 '>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </svg>

</div>
<p className='text-right text-white rtl'>القبول_الموحد#</p>
<div className='flex justify-between mt-2'>
  <p className='text-xs'>Trending in Saudi Arabia</p>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className='h-5 w-5 '>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    </svg>

</div>
<p className='text-right text-white rtl'>البرتغال_سلوفينيا#</p>
<p className='text-xs'>Trending with #فرنسا_بلجيكا</p>
</div>



</div>


          
   
</div>  )
}

export default Rightbar