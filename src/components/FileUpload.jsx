

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate if using react-router-dom
import group from "../assets/img_gup.png";
import SplitPage from "./SplitPage";
import ValidatedFileInput from "./ValidatedFileInput";

const FileUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const onFileSelected = (file) => {
    setSelectedFile(file);
    // Navigate to SplitPage component with the selected file
    navigate('/split', { state: { file } });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5F5]  pb-14">
      {!selectedFile ? (
        <div className="mb-4">
          <h2 className="text-4xl font-semibold mb-16 p-5 text-center ">{props.splitp}</h2>
          <h2 className="text-2xl font-semibold font-poppins mb-5 text-center">Upload Document</h2>
          <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
            <div>
              <h1 className="text-[#060808] font-poppins text-2xl font-normal text-center">
                Upload PDF Attachments
              </h1>
              <div className="flex flex-col items-center">
                <div>
                  <img src={group} alt="PDF Icon" className="h-20 mt-4 w-full md:w-auto" />
                </div>
                <ValidatedFileInput onFilesSelected={onFileSelected} />
              </div>
              <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                <h1 className="text-2xl">Choose your PDF file here</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          {<SplitPage />}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
