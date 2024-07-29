




import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import Uploading from './Adding'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MergePDF = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [mergedPDFUrl, setMergedPDFUrl] = useState(null);
  const [initialFilesChosen, setInitialFilesChosen] = useState(false); // Track if initial files are chosen
  const fileInputRef = useRef(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Append new files to existing ones
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Create new URLs for the newly selected files
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setFileURLs((prevUrls) => [...prevUrls, ...newUrls]);

    // Set initial files chosen to true
    setInitialFilesChosen(true);
  };

  // Trigger file input click
  const handleAddFiles = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5F5]">
      {/* <h2 className="font-poppins font-bold text-black text-2xl m-8">Select PDFs to Merge</h2> */}
      
      {/* Hidden file input */}
      {/* <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      /> */}
      
      {/* Button to open file picker */}
      {/* {!initialFilesChosen && (
        <button
          className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-4 rounded-full mt-4"
          onClick={handleAddFiles}
        >
          Choose Files
        </button>
      )} */}

      {/* Button to add more files */}
      {/* {initialFilesChosen && (
        <button
          className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-4 rounded-full mt-4"
          onClick={handleAddFiles}
        >
          + Add More Files
        </button>
      )}
       */}
      <div className="">
        {selectedFiles.length > 0 ? (
          <div>
            {/* <h3 className="font-poppins font-semibold text-xl mb-4">Selected Files:</h3>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul> */}
            {/* <div className="mt-8">
              <h3 className="font-poppins font-semibold text-xl mb-4">Preview First Page of Selected PDFs:</h3>
              
            </div> */}
            {/* <button
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4"
              onClick={handleMerge}
            >
              Merge Files
            </button> */}
            {/* {mergedPDFUrl && (
             
            )} */}
          </div>
         ) : (<div >
          <Uploading/>
          


         </div>)}
      </div>
    </div>
  );
};

export default MergePDF;


