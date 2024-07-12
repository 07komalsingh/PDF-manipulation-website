import React, { useState } from 'react';
import gupIcon from '../assets/gup.png';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    // Add your upload logic here
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h2 className="text-2xl font-semibold mb-6">Upload Document</h2>
      <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl p-8-md lg:w-[87%] 2xl:w-[60%]  h-[31rem] flex justify-center items-center">
        <div><h1 className="flex flex-col text-[#060808] justify-center items-center mb-8 text-2xl font-semibold mt-7 " >Upload PDF Attachments</h1>
        <div className="flex flex-col items-center">
          {/* <svg className="w-12 h-12 text-[#44B7BC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 01.88-2.59A4.002 4.002 0 0112 5a4 4 0 015.88 5.41 4.001 4.001 0 012.12 3.59A4 4 0 0118 20H6a4 4 0 01-3-1.41A4 4 0 013 15z" /></svg> */}
          <div>
            <img src={gupIcon} alt="PDF Icon" className=" h-20 w-full md:w-auto" />
          </div>
          {/* {<input type="file" onChange={onFileChange} className="mb-4" />} */}
          <div className='mt-9'>
          <button
            onClick={onFileUpload}
            className="bg-[#44B7BC] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
          >
            Choose Files
          </button>
          </div>
        </div>
        <div className="flex flex-col text-gray-600 mt-[1rem]"><h1 className='text-2xl'>Choose your PDF files here</h1></div>
      </div></div>
    </div>
  );
};
export default FileUpload;

// const http= require("http")
