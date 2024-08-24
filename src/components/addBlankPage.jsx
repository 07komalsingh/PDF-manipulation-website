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
  const [pdfDoc, setPdfDoc] = useState(null); // Store the PDFDocument object
  const [isBlankPageAdded, setIsBlankPageAdded] = useState(false); // Track if a blank page has been added
  const [pageSize, setPageSize] = useState(null); // Store the size of the pages

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

  const initializePdf = async () => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const existingPdfBytes = new Uint8Array(reader.result);
        const loadedPdfDoc = await PDFDocument.load(existingPdfBytes, {
          ignoreEncryption: true,
        });
        setPdfDoc(loadedPdfDoc); // Store the loaded PDFDocument
        const pdfBytes = await loadedPdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setModifiedPdfUrl(pdfUrl);
        setNumPages(loadedPdfDoc.getPageCount()); // Correctly set the number of pages
        setPages(Array.from({ length: loadedPdfDoc.getPageCount() }, (_, index) => index + 1));

        // Get the size of the first page
        const firstPage = loadedPdfDoc.getPage(0);
        const { width, height } = firstPage.getSize();
        setPageSize({ width, height });
      } catch (e) {
        toastr.error("Failed to process the PDF. It might be protected.", "Error");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddBlankPage = async () => {
    if (pdfDoc && pageSize) {
      // Add the blank page with the same size as existing pages
      pdfDoc.addPage([pageSize.width, pageSize.height]);
      setPages([...pages, `blank_${pages.length + 1}`]);
      setIsBlankPageAdded(true); // Indicate that a blank page has been added

      // Save and update the modified PDF URL
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setModifiedPdfUrl(pdfUrl);

      toastr.success("Blank page added successfully!", "Success");
    }
  };

  const handleDownloadPdf = async () => {
    if (pdfDoc) {
      const reorderedPdfDoc = await PDFDocument.create();
      for (const pageNumber of pages) {
        if (typeof pageNumber === "number") {
          const [copiedPage] = await reorderedPdfDoc.copyPages(pdfDoc, [pageNumber - 1]);
          reorderedPdfDoc.addPage(copiedPage);
        } else {
          reorderedPdfDoc.addPage([pageSize.width, pageSize.height]);
        }
      }
      const pdfBytes = await reorderedPdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "modified_pdf_with_blank_pages.pdf";
      link.click();
    }
  };

  return (
    <div className="py-10 px-4 mb-30 font-Poppins w-full bg-[#f5f5f5] flex justify-center">
      <div className="flex flex-col text-center">
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
        <div className="p-4 font-Poppins flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Add Blank Page</h2>
          <hr className="w-[20%] mt-2" />
          <label className="font-semibold mt-6 mb-6 text-center">
            Effortless PDF Blank Page Addition for Enhanced Workflow
          </label>

          <button
            onClick={handleAddBlankPage}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 flex justify-center py-2 sm:px-24 w-[250px] sm:w-fit rounded-full mt-7"
          >
            Add Blank Page
          </button>

          {isBlankPageAdded && (
            <button
              onClick={handleDownloadPdf}
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 py-2 sm:px-[65px] w-[250px] sm:w-fit text-center rounded-full mt-2"
            >
              Download Modified PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBlankPage;
