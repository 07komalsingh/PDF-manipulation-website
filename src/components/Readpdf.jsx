import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

const ReadPDF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(800); // Default width for desktop

  useEffect(() => {
    if (location.state && location.state.file) {
      setPdfFile(location.state.file);
    } else {
      navigate("/"); // Redirect if no file is passed
    }

    // Adjust PDF page width based on window size
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPageWidth(300); // Mobile
      } else if (window.innerWidth < 768) {
        setPageWidth(400); // Small tablets
      } else if (window.innerWidth < 1024) {
        setPageWidth(600); // Large tablets
      } else {
        setPageWidth(800); // Laptops and desktops
      }
    };

    // Initialize on component mount
    handleResize();

    // Add event listener to resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [location, navigate]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#F5F5F5] pb-14 p-8">
      <div className="flex flex-col justify-center items-center">
        <Document
          file={pdfFile}
          onLoadSuccess={onDocumentLoadSuccess}
          className="w-full"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={pageWidth} // Dynamic width based on screen size
              className="mb-4 shadow-md relative mx-2 bg-white p-4"
            />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default ReadPDF;
