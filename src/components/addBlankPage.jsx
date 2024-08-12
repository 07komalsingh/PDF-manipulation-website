


import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { useLocation, useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import DraggablePage from "./DraggablePage"; // Import DraggablePage component

const AddBlankPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [numPages, setNumPages] = useState(0); // Initialized to 0
  const [file, setFile] = useState(state?.file || null);
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(""); // URL for the modified PDF
  const [pages, setPages] = useState([]); // Always an array

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!file) {
      navigate("/");
    } else {
      initializePdf();
    }
  }, [file, navigate]);

  const initializePdf = () => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const existingPdfBytes = new Uint8Array(reader.result);
        const pdfDoc = await PDFDocument.load(existingPdfBytes, {
          ignoreEncryption: true,
        });
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setModifiedPdfUrl(pdfUrl);
        setNumPages(pdfDoc.getPageCount()); // Correctly set the number of pages
        setPages(Array.from({ length: pdfDoc.getPageCount() }, (_, index) => index + 1));
      } catch (e) {
        toastr.error("Failed to process the PDF. It might be protected.", "Error");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const addBlankPageToEndOfPDF = () => {
    setPages([...pages, `blank_${pages.length + 1}`]);
    toastr.success("Blank page added successfully!", "Success");
  };

  return (
    <div className="py-10 px-4 mb-30 font-Poppins w-full bg-[#f5f5f5] flex justify-center">
      <div className="flex flex-col">
        {/* PDF Preview Section with Draggable Pages */}
        <div className="p-4 flex flex-wrap justify-center">
          {modifiedPdfUrl && pages.length > 0 && (
            <DraggablePage
              fileDataURL={modifiedPdfUrl}
              pages={pages}
              setPages={setPages}
            />
          )}
        </div>

        {/* Add Blank Page Button */}
        <div className="p-4 font-Poppins flex flex-col items-center justify-center ">
          <h2 className="text-3xl font-bold mb-4">Add Blank Page</h2>
          <hr className="w-[20%] mt-2" />
          <label className="font-semibold mt-6 mb-6 text-center">
            Effortless PDF Blank Page Addition for Enhanced Workflow
          </label>

          <button
            onClick={addBlankPageToEndOfPDF}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 flex justify-center py-2 sm:px-24 w-[250px] sm:w-fit rounded-full mt-7"
          >
            Add Blank Page
          </button>

          {modifiedPdfUrl && (
            <a
              href={modifiedPdfUrl}
              download="modified_pdf_with_blank_pages.pdf"
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 py-2 sm:px-[65px] w-[250px] sm:w-fit text-center rounded-full mt-2"
            >
              Download Modified PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBlankPage;
