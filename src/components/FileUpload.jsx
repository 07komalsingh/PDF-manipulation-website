import React, { useState, useRef } from 'react';
import axios from 'axios';
import gupIcon from '../assets/img_gup.png';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const fileInputRef = useRef(null);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadMessage('');  // Clear any previous messages
  };

  const onFileUpload = async () => {
    if (!selectedFile) {
      setUploadMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadMessage('File uploaded successfully!');
      console.log('File path:', response.data.filePath);
    } catch (error) {
      setUploadMessage('Error uploading file.');
      console.error('Error uploading file:', error);
    }
  };

  const onChooseFileClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 sm:px-0 ">
      <h2 className="text-2xl font-semibold mb-6 font-poppins">Upload Document</h2>
      <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl p-8 md:lg:w-[87%] 2xl:w-[60%] h-[31rem] flex justify-center items-center">
        <div>
          <h1 className=" text-[#060808] font-poppins mb-8 text-2xl font-semibold mt-7 text-center">
            Upload PDF Attachments
          </h1>
          <div className="flex flex-col items-center">
            <div>
              <img src={gupIcon} alt="PDF Icon" className="h-20 w-full md:w-auto" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileChange}
              className="hidden"
            />
            <div className='mt-9'>
              <button
                onClick={onChooseFileClick}
                className="bg-[#44B7BC] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
              >
                Choose Files
              </button>
            </div>
          </div>
          <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
            <h1 className='text-2xl'>Choose your PDF files here</h1>
          </div>
        </div>
        {uploadMessage && <p className="mt-4 text-red-600">{uploadMessage}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
