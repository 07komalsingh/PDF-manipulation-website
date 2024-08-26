import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import group from "../assets/img_gup.png";
import ValidatedFileInput from "./ValidatedFileInput";

const FileUpload = () => {
  window. scrollTo({ top:0, behavior: 'auto' });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [heading, setHeading] = useState("");
 
  useEffect(() => {
    if (state && state.toolPath) {
      // Set the heading based on the toolPath
      let toolName = "";
   
      switch (state.toolPath) {
        case "/split":
          toolName = "Split PDF";
          break;
        case "/remove":
          toolName = "Remove Pages";
          break;
        case "/add_blank":
          toolName = "Add Blank Page";
          break;
        case "/compress":
          toolName= "Compress PDF";
          break;
        default:
          toolName = "Upload Document";
          break;
      }
      setHeading(toolName);
    } else {
      navigate("/");
    }
  }, [state, navigate]);

  const onFileSelected = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      setSelectedFile(file);
      // Navigate to the appropriate route based on the tool selected
      if (state && state.toolPath) {
        navigate(state.toolPath, { state: { file } });
      }
    } catch (error) {
      console.error("Error processing file:", error);
      alert("An error occurred while processing the file.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5F5] pb-14">
      {!selectedFile ? (
        <div className="mb-4">
          <h2 className="text-4xl font-semibold mb-16 p-0 mt-4 text-center ">
            {heading}
          </h2>
          <h2 className="text-2xl font-semibold font-poppins mb-5 text-center">
            Upload Document
          </h2>
          <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
            <div>
              <h1 className="text-[#060808] font-poppins text-2xl font-normal text-center">
                Upload PDF Attachments
              </h1>
              <div className="flex flex-col items-center">
                <div>
                  <img
                    src={group}
                    alt="PDF Icon"
                    className="h-20 mt-4 w-full md:w-auto"
                  />
                </div>
                <ValidatedFileInput
                  onFilesSelected={onFileSelected}
                  tool={state?.toolPath}
                />
              </div>
              <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                <h1 className="text-2xl">Choose your PDF file here</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center justify-center">
          {/* You can conditionally render components based on state.toolPath if needed */}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
// ok so my problem is i want to do the same for compress pdf the way it is done for split pdf, also i want the structure of code the same way as SplitPdf 
