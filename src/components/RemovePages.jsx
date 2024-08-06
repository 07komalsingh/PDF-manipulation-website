import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import group from '../assets/img_gup.png';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import ValidatedFileInput from './ValidatedFileInput';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

toastr.options = {
  closeButton: true,
  progressBar: true,
  timeOut: "3000",
  extendedTimeOut: "1000",
  preventDuplicates: true,
  newestOnTop: true,
};

const RemovePages = () => {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [selectedPages, setSelectedPages] = useState([]);
  const [fileURL, setFileURL] = useState(null);
  const [updatedPdfUrl, setUpdatedPdfUrl] = useState(null);

  const handleFileSelected = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
      const url = URL.createObjectURL(files[0]);
      setFileURL(url);
      setUpdatedPdfUrl(null); // Reset the updated PDF URL
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    const pages = Array.from({ length: numPages }, (_, i) => i + 1);
    setPageNumbers(pages);
  };

  const handlePageSelection = (pageNumber) => {
    setSelectedPages((prevSelected) => {
      if (prevSelected.includes(pageNumber)) {
        return prevSelected.filter((num) => num !== pageNumber);
      } else {
        return [...prevSelected, pageNumber];
      }
    });
  };

  const handleRemovePages = async () => {
    if (!file || selectedPages.length === 0) {
      toastr.error("No pages selected for removal.", "Error");
      return;
    }

    try {
      const pdfDoc = await PDFDocument.load(await file.arrayBuffer());
      const pagesToKeep = pageNumbers.filter((pageNum) => !selectedPages.includes(pageNum - 1));

      const newPdfDoc = await PDFDocument.create();
      for (const pageNum of pagesToKeep) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageNum - 1]);
        newPdfDoc.addPage(copiedPage);
      }

      const newPdfBytes = await newPdfDoc.save();
      const newPdfBlob = new Blob([newPdfBytes], { type: 'application/pdf' });
      const newPdfUrl = URL.createObjectURL(newPdfBlob);
      setUpdatedPdfUrl(newPdfUrl);

      toastr.success("Pages removed successfully!", "Success");
    } catch (error) {
      toastr.error("Failed to remove pages.", "Error");
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 pb-14 bg-[#F5F5F5]">
      {!file ? (
        <div className="mb-4 m-2">
          <h2 className="text-4xl font-semibold mb-16 p-5 text-center">Remove PDF Pages</h2>
          <h2 className="text-2xl font-semibold font-poppins mb-7 text-center">Upload Document</h2>
          <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
            <div>
              <h1 className="text-[#060808] font-poppins text-2xl font-normal text-center">Upload PDF Attachments</h1>
              <div className="flex flex-col items-center">
                <div>
                  <img src={group} alt="PDF Icon" className="h-20 mt-4 w-full md:w-auto" />
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
        <div className="flex flex-col items-center justify-center sm:mb-3 min-h-[540px]">
          <Document file={fileURL} onLoadSuccess={onDocumentLoadSuccess}>
            {pageNumbers.map((pageNumber) => (
              <div key={pageNumber} className="relative mb-8 mx-2 bg-white shadow-md rounded-lg p-4">
                <Page pageNumber={pageNumber} width={250} />
                <div className="absolute top-0 left-0">
                  <input
                    type="checkbox"
                    checked={selectedPages.includes(pageNumber)}
                    onChange={() => handlePageSelection(pageNumber)}
                  />
                </div>
              </div>
            ))}
          </Document>
          <button
            className="bg-gradient-to-r bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-24 rounded-full shadow-md transition duration-300"
            onClick={handleRemovePages}
          >
            Remove Pages
          </button>
          {updatedPdfUrl && (
            <a
              href={updatedPdfUrl}
              className="bg-gradient-to-r bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-20 rounded-full mt-4 shadow-md transition duration-300"
              download="updated.pdf"
            >
              Download PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default RemovePages;
