import React from 'react';
import picture from '../../src/assets/rafiki.png'
const DocumentSolution = () => {
  return (
    <div className="h-screen bg-white max-w-full flex justify-center sm:justify-center ">
      <div className="flex lg:flex-row flex-col">
        <div className="mx-10 my-20 sm:justify-center">
          <img src={picture} alt="Documents" className="w-full h-auto" />
        </div>
        <div className=" flex flex-col justify-center items-center">
          <div className="mt-5 lg:w-[479px] font-Poppins">
          <h2 className="text-[36px] font-Poppins  text-wrap sm:text-wrap">Your one step Solution for all Documents Need 100% Free & Effortless</h2>
          <button className="bg-[#44B7BC] font-Poppins  text-white py-2 px-4 rounded-2xl hover:bg-[#44B7BC] my-11">Know More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentSolution;