import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate if using react-router-dom
import group from "../assets/img_gup.png";
import SplitPage from "./SplitPage";

const FileUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const onFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);

      // Navigate to SplitPage component with the selected file
      navigate('/split', { state: { file } });
    }

    // Reset the file input value to allow selecting the same file again if needed
    event.target.value = null;
  };

  const onChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {!selectedFile ? (
        <div className="mb-4">
          <h2 className="text-4xl font-semibold mb-24 text-center">{props.name}</h2>
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
                <input
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={onFileChange}
                  className="hidden"
                />
                <div className="mt-9">
                  <button
                    onClick={onChooseFileClick}
                    className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-3 px-4 rounded mb-4"
                  >
                    Choose File
                  </button>
                </div>
              </div>
              <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                <h1 className="text-2xl">Choose your PDF file here</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          {<SplitPage/>}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
