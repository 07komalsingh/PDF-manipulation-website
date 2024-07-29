import React from 'react';
import picture1 from '../assets/img_play_store.png';

const PlayStore = () => {
  return (
    <div className='flex md:justify-center flex-wrap'>
      <div className="flex flex-col lg:flex-row items-center w-full justify-center bg-white">
        <div className="mb-6 lg:mb-0 lg:mr-6 sm:w-1/2 flex lg:justify-center w-full">
          <img src={picture1} alt="Google Play" className="w-[42rem] h-[17rem] lg:p-10 pt-10" />
        </div>

        <div className="text-center text-sm lg:text-left md:text-xl w-1/2 my-[2rem] lg:pr-40">
          <h2 className="text-3xl lg:text-3xl font-bold lg:mb-4 lg:mt-[3rem] leading-10 font-Poppins">
            You Can Download Our App From Play Store
          </h2>
          <div className='lg:w-[30vw]'>
            <p className="text-black text-2xl mt-[3rem] mb-[3rem] leading-9 font-Poppins font-semibold">
            Easy Documents App: Available on Play Store Manage your documents effortlessly with Easy Documents. Download it now from the Play Store!
            </p>
         
            <button className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full">
              Download Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayStore;
