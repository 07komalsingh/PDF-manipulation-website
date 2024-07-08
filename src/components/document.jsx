import React from 'react';
import picture from '../assets/rafiki.png'
const DocumentSolution = () => {
  return (
    <div className=" justify-center h-screen  max-w-[1240px] flex items-center">
      <div className="flex flex-col md:flex-row bg-white rounded-lg p-8 space-x-4 ml">
        <div className="flex items-center justify-center flex-1">
          <img src={picture} alt="Documents" className="w-full h-auto" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mt-10 lg:text-wrap md:text-balance ">Your one step Solution for all Documents Need 100% Free & Effortless</h2>
          <button className="bg-[#44B7BC] text-white py-2 px-4 rounded-2xl hover:bg-[#44B7BC] my-11">Know More</button>
        </div>
      </div>
    </div>
  );
};
 
export default DocumentSolution;
 