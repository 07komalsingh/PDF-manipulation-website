import React from 'react';
import picture from '../../src/assets/img_rafiki.png'
const DocumentSolution = () => {
  return (
    <div className=" bg-white flex justify-center items-center ">
      <div className="flex lg:flex-row flex-col-reverse lg:ml-10">
        <div className=" flex flex-col justify-center items-center">
          <div className="mt-5 font-Poppins lg:w-[500px] w-full text-center lg:text-start">
            <h2 className="md:text-[36px] text-2xl leading-10 font-poppins font-semibold lg:line-clamp-3 lg:leading-normal">{`Your one step Solution for all Documents Need 100% Free & Effortless`}</h2>
            <button className="bg-[#44B7BC] font-poppins  font-semibold  text-white py-3 px-8 rounded-full hover:bg-[#30aab1] my-11">Know More</button>
          </div>
        </div>
        <div className="flex justify-center ml-7  ">
          <img src={picture} alt="Documents" className="w-full lg:h-[600px] mt-6" />        </div>
      </div>
    </div>
  );
};

export default DocumentSolution;