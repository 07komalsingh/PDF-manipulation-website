// import React from 'react';
// import pana from '../../src/assets/pana.png'
// const PremiumSol = () => {
//   return (
//     <div className=" bg-[#E5F2F3] flex justify-center items-center mt-10 ">
//       <div className="flex lg:flex-row flex-col-reverse ml-10">
//         <div className=" flex flex-col justify-center items-center">
//           <div className="mt-5 font-Poppins lg:w-[500px] ">
//             <h2 className="text-[36px] font-poppins font-semibold line-clamp-3">Get more Functionality With Our Premium</h2>
//             <button className="bg-[#44B7BC] font-poppins  font-semibold  text-white py-3 px-8 rounded-full hover:bg-[#44B7BC] my-11">Get Now</button>
//           </div>
//         </div>
//         <div className="flex justify-center ml-7 w-full  ">
//           <img src={pana} alt="Documents" className="w-[635px] lg:h-[450px]  mt-6 ml-70" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumSol;


import React from 'react';
// import picture from '../../src/assets/rafiki.png'
import pana from '../../src/assets/img_pana.png'

const PremiumSol = () => {
  return (
    <div className=" bg-[#E5F2F33D] flex justify-center items-center mt-6 ">
      <div className="flex lg:flex-row flex-col-reverse lg:ml-10">
        <div className=" flex flex-col justify-center items-center sm:gap-0 ">
          <div className="mt-5 font-Poppins lg:w-[500px] w-full text-center lg:text-start sm:p-5 p-4">
            <h2 className="md:text-[36px] text-2xl leading-10 font-poppins font-semibold lg:line-clamp-3  lg:leading-normal  ">{`Get more Functionality With Our Premium`}</h2>
            <button className="bg-[#44B7BC] font-poppins  font-semibold  text-white py-2 px-8 rounded-full hover:bg-[#30aab1] my-6">Get Now</button>
          </div>
        </div>
        <div className="flex justify-center m-4 lg:m-20 md:m-12">
          <img src={pana} alt="Documents" className="w-full "/>
        </div>
      </div>
    </div>
  );
};
export default PremiumSol;