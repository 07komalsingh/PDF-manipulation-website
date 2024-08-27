import React, { useState } from "react";
import { pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import group from "../assets/img_gup.png";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import ValidatedFileInput from "./ValidatedFileInput";
import DraggablePage from './Draggable'
import toastr from "toastr";
import "toastr/build/toastr.min.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Reorder = () => {
  window. scrollTo({ top:0, behavior: 'auto' });
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [originalPages, setOriginalPages] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileSelected = async (selectedFile) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setFile(selectedFile);
      setFileDataURL(e.target.result);

      try {
        const fileArrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileArrayBuffer);
        const numPages = pdfDoc.getPageCount();

        if (numPages === 1) {
          toastr.error("Please select a PDF with more than one page.");
          setFile(null);
          setFileDataURL(null);
          setNumPages(0);
          setPages([]);
          setOriginalPages([]);
          return;
        }

        if (numPages > 10) {
          toastr.error("Selected PDF has more than 10 pages.");
          setFile(null);
          setFileDataURL(null);
          setNumPages(0);
          setPages([]);
          setOriginalPages([]);
          return;
        }

        setNumPages(numPages);

        const pageArray = Array.from({ length: numPages }, (_, index) => index + 1);
        setPages(pageArray);
        setOriginalPages([...pageArray]);
      } catch (err) {
        console.error("Failed to load PDF:", err);
        toastr.error("Failed to load PDF. Please try again.", "Error");
        setFile(null);
        setFileDataURL(null);
        setNumPages(0);
        setPages([]);
        setOriginalPages([]);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleReorder = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    // Check if the pages have been reordered
    if (JSON.stringify(originalPages) === JSON.stringify(pages)) {
      toastr.error("No reordering has been applied to the PDF.");
      setDownloadUrl(null);
      return;
    }

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);

      const newPdfDoc = await PDFDocument.create();

      for (let pageIndex of pages) {
        const [page] = await newPdfDoc.copyPages(pdfDoc, [pageIndex - 1]);
        newPdfDoc.addPage(page);
      }

      const pdfBytes = await newPdfDoc.save();
      const url = window.URL.createObjectURL(new Blob([pdfBytes]));
      setDownloadUrl(url);

      toastr.success("PDF reordered successfully!", "Success");
    } catch (err) {
      console.error("Failed to reorder PDF:", err);
      toastr.error("Failed to reorder PDF.", "Error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-9 bg-[#F5F5F5]">
      {!file ? (
        <div className="mt-8">
          <h2 className="text-4xl font-semibold mb-12 text-center">
            Reorder PDF Pages
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
                <ValidatedFileInput onFilesSelected={handleFileSelected} />
                <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                  <h1 className="text-2xl">Choose your PDF file here</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center sm:[10px] md:mb-[70px]">
          <DraggablePage fileDataURL={fileDataURL} pages={pages} setPages={setPages} />
          <div className="flex flex-col justify-center items-center">
          <button
            onClick={handleReorder}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold  py-2  rounded-full  text-center mt-4 w-[300px] h-11" 
          >
            Reorder
          </button>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="reordered_file.pdf"
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 sm:px-[65px] text-center  px-16 rounded-full mt-4 w-[300px] h-11"
            >
              Download PDF
            </a>
          )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reorder;

