import axios from "axios";
import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import group from "../assets/img_gup.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import ValidatedFileInput from "./ValidatedFileInput"; // Import the ValidatedFileInput component

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function Compresspdf() {
  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);
  }, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileSelected = (selectedFile) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(selectedFile);
        setFileDataURL(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://feasibility.azurewebsites.net/compress-pdf/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      debugger;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setDownloadUrl(url);

      // Display success message
      toastr.success("successfully compress", "Success");
    } catch (error) {
      setError(error.message);
      toastr.error("Failed to compress pdf.", "Error");
    } finally {
      setLoading(false);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-14 bg-[#F5F5F5]">
      {!file ? (
        <div className="mb-4">
          <h2 className="text-4xl font-semibold mb-16 p-0 mt-6 text-center">
            compress pdf
          </h2>
          <h2 className="text-2xl font-semibold font-poppins mb-5 text-center">
            Upload Document
          </h2>
          <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] m-2 rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
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
                <ValidatedFileInput onFilesSelected={handleFileSelected} />{" "}
                {/* Use ValidatedFileInput here */}
                <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                  <h1 className="text-2xl">Choose your PDF file here</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center sm:mb-[150px] mb-[35px]">
          <div className="w-full flex flex-wrap justify-center mb-4 mt-7">
            {fileDataURL && (
              <Document
                file={fileDataURL}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className="m-2 p-4 border-2 border-white bg-white inline-block rounded-3xl"
                  >
                    <Page pageNumber={index + 1} width={250} />
                  </div>
                ))}
              </Document>
            )}
          </div>
          <button
            onClick={handleUpload}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-24 rounded-full"
          >
            Compress
          </button>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="compress.pdf"
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 sm:px-[65px] px-16 rounded-full mt-4"
            >
              Download compress
            </a>
          )}
        </div>
      )}
    </div>
  );
}
export default Compresspdf;
