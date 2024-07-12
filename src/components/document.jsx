import React from 'react';
import picture from '../../src/assets/rafiki.png'
const DocumentSolution = () => {
  return (
    <div className=" bg-white flex justify-center items-center ">
      <div className="flex lg:flex-row flex-col ">
        <div className=" flex flex-col justify-center items-center">
          <div className="mt-5 font-Poppins lg:w-[500px]">
            <h2 className="text-[36px] font-poppins font-semibold line-clamp-3">Your one step Solution for all Documents Need 100% Free & Effortless</h2>
            <button className="bg-[#44B7BC] font-poppins  font-semibold  text-white py-3 px-8 rounded-full hover:bg-[#44B7BC] my-11">Know More</button>
          </div>
        </div>
        <div className="flex justify-center ml-7 ">
          <img src={picture} alt="Documents" className="w-full lg:h-[600px] " />
        </div>
      </div>
    </div>
  );
};
 
export default DocumentSolution;