import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { useLocation, useNavigate } from "react-router-dom";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

toastr.options = {
  closeButton: true,
  progressBar: true,
  timeOut: "3000",
  extendedTimeOut: "1000",
  preventDuplicates: true,
  newestOnTop: true,
};

const AddBlankPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(state?.file || null);
  const [modifiedPdfBytes, setModifiedPdfBytes] = useState(null);
  const [modifiedPdfUrl, setModifiedPdfUrl] = useState(""); // URL for the modified PDF
  const [blankPageCount, setBlankPageCount] = useState(0); // State for counting blank pages

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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const initializePdf = () => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const existingPdfBytes = new Uint8Array(reader.result);
        setModifiedPdfBytes(existingPdfBytes);
        const pdfDoc = await PDFDocument.load(existingPdfBytes, {
          ignoreEncryption: true,
        });
        const pdfBytes = await pdfDoc.save();
        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setModifiedPdfUrl(pdfUrl);
      } catch (e) {
        toastr.error("Failed to process the PDF. It might be protected.", "Error");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const addBlankPageToEndOfPDF = async () => {
    try {
      const pdfDoc = await PDFDocument.load(modifiedPdfBytes, {
        ignoreEncryption: true,
      });

      // Add a blank page at the end
      pdfDoc.addPage();

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setModifiedPdfBytes(pdfBytes); // Update the modified PDF bytes
      setModifiedPdfUrl(pdfUrl);
      setBlankPageCount(blankPageCount); // Increase the blank page count

      toastr.success("Blank page added successfully!", "Success");
    } catch (error) {
      toastr.error("Failed to add blank page to PDF.", "Error");
    }
  };

  return (
    <div className="py-10 px-4 mb-30 font-Poppins w-full bg-[#f5f5f5] flex justify-center">
      <div className="flex flex-col">
        {/* PDF Preview Section */}
        <div className="p-4 flex flex-wrap justify-center">
          {modifiedPdfUrl && (
            <Document
              file={modifiedPdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              className="text-center"
            >
              {numPages &&
                Array.from(new Array(numPages + blankPageCount), (el, index) => (
                  <div
                    key={`page_${index + 1}`}
                    className="rounded-xl bg-white border-2 border-white p-2 m-2 inline-block justify-center items-center shadow"
                    style={{ width: "200px", height: "300px" }}
                  >
                    {index < numPages ? (
                      <Page pageNumber={index + 1} width={180} />
                    ) : ("")}
                  </div>
                ))}
            </Document>
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
