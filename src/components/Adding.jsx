import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import group from "../assets/img_gup.png";
import { GoPlus } from "react-icons/go";

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Adding = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [mergedPDFUrl, setMergedPDFUrl] = useState(null);
  const fileInputRef = useRef(null);

  const onFileChange = (event) => {
    const files = Array.from(event.target.files);

    // Append new files to existing ones
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    // Create new URLs for the newly selected files
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setFileURLs((prevUrls) => [...prevUrls, ...newUrls]);

    // Reset the file input value to allow selecting the same file again if needed
    event.target.value = null;
  };

  const onChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMerge = async () => {
    const mergedPdf = await PDFDocument.create();

    for (const file of selectedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();
    const mergedPdfBlob = new Blob([mergedPdfFile], {
      type: "application/pdf",
    });
    const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);
    setMergedPDFUrl(mergedPdfUrl);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16 pb-14">
      {selectedFiles.length < 1 ? (
        <div className="mb-4 m-3">
          <h2 className="text-4xl font-semibold mb-24 text-center">
            Merge PDF Files
          </h2>
          <h2 className="text-2xl font-semibold font-poppins mb-5 text-center ">
            Upload Document
          </h2>
          <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
            <div className="">
              <h1 className="text-[#060808] font-poppins text-2xl  font-normal text-center">
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
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  ref={fileInputRef}
                  onChange={onFileChange}
                  className="hidden"
                />
                <div className="mt-9">
                  <button
                    onClick={onChooseFileClick}
                    className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-3 px-4 rounded mb-4"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
              <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                <h1 className="text-2xl">Choose your PDF files here</h1>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mb-3">
          <div className="flex flex-wrap justify-center">
            {fileURLs.map((url, index) => (
              <div
                key={index}
                className="mb-8 mx-2 bg-white shadow-md rounded-lg p-4"
              >
                <Document file={url}>
                  <Page pageNumber={1} width={250} />
                </Document>
              </div>
            ))}
            <div className="mb-8 mx-2 bg-white shadow-md rounded-lg p-4 flex  items-center w-[250px]  justify-center">
              <button
                onClick={onChooseFileClick}
                className="bg-[#44B7BC] hover:bg-[#30aab1] flex justify-center text-white font-semibold py-[13px] items-center px-4 rounded-full text-4xl"
              >
                <GoPlus />
              </button>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <button
              className={`bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mr-4 ${
                selectedFiles.length < 2 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleMerge}
              disabled={selectedFiles.length < 2}
            >
              Merge Files
            </button>
          </div>
          <input
            type="file"
            accept="application/pdf"
            multiple
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
          />
          {mergedPDFUrl && (
            <a
              href={mergedPDFUrl}
              className={`bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4 ${
                selectedFiles.length < 2 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              download="merged.pdf"
            >
              Download PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Adding;
