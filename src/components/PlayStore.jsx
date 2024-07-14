import React from 'react';
import picture1 from '../assets/playstore.png'
const PlayStore = () => {
  return (

    <div className='flex justify-center'>
      <div className="flex flex-col lg:flex-row items-center w-full justify-center  bg-white">
        <div className="mb-6 lg:mb-0 lg:mr-6 w-1/2 flex lg:justify-center ">
          <img src={picture1} alt="Google Play" className="w-[27rem] h-[13rem] lg:p-10 pt-10" />
        </div>
        <div className="text-center lg:text-left w-1/2 my-[2rem] lg:pr-40">
          <h2 className="text-2xl lg:text-3xl font-bold lg:mb-4 lg:mt-[3rem]">
            You Can Download Our App From Play Store
          </h2>
          <p className="text-gray-600 text-xl mt-[3rem] mb-[3rem]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <button className="bg-[#44B7BC] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayStore;
