import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";
import { pdfjs, Document, Page } from "react-pdf";
import { useLocation } from "react-router-dom";
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
 
function RemovePages() {
  window. scrollTo({ top:0, behavior: 'auto' });
  const { state } = useLocation();
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [checkedPages, setCheckedPages] = useState(new Set());
  const [modifiedPdfBytes, setModifiedPdfBytes] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
 
  useEffect(() => {
    if (state?.file) {
      const loadPdf = async () => {
        const fileBytes = await state.file.arrayBuffer();
        const doc = await PDFDocument.load(fileBytes);
        setPdfDoc(doc);
        setModifiedPdfBytes(null); // Reset modified PDF bytes when a new document is loaded
      };
 
      loadPdf();
    }
  }, [state?.file]);
 
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCheckedPages(new Set()); // Reset checked pages when a new document is loaded
  };
 
  const handleCheckboxChange = (pageNumber) => {
    const updatedCheckedPages = new Set(checkedPages);
    if (updatedCheckedPages.has(pageNumber)) {
      updatedCheckedPages.delete(pageNumber);
    } else {
      updatedCheckedPages.add(pageNumber);
    }
    setCheckedPages(updatedCheckedPages);
 
    // Update error message based on selected pages
    if (updatedCheckedPages.size === 0) {
      setErrorMessage("At least select one page to remove.");
    } else if (updatedCheckedPages.size === numPages) {
      setErrorMessage("All pages cannot be removed.");
    } else {
      setErrorMessage("");
    }
  };
  const handleRemovePages = async () => {
    if (!pdfDoc || checkedPages.size === 0) {
      setErrorMessage("At least select one page to remove.");
      return;
    }
  
    if (checkedPages.size === numPages) {
      setErrorMessage("All pages cannot be removed.");
    } else {
      setErrorMessage("");
  
      const newPdfDoc = await PDFDocument.create();
      const pages = pdfDoc.getPages();
      
      for (let i = 0; i < numPages; i++) {
        if (!checkedPages.has(i)) {
          const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
          newPdfDoc.addPage(copiedPage);
        }
      }
  
      const newPdfBytes = await newPdfDoc.save();
      setModifiedPdfBytes(newPdfBytes);
  
      // Show success message
      toastr.success("Pages removed successfully!", "Success");
    }
  };

   
  const handleDownload = () => {
    if (modifiedPdfBytes) {
      download(modifiedPdfBytes, "modified.pdf", "application/pdf");
    }
  };
 
  
 
  return (
    <div className="py-10 px-4 mb-30 font-Poppins w-full bg-[#f5f5f5] flex justify-center">
      <div className="flex flex-col">
        {/* PDF Preview Section */}
        <div className="p-4 flex justify-center">
          {pdfDoc && (
            <Document file={state.file} onLoadSuccess={onDocumentLoadSuccess} className="text-center">
              <div className="flex flex-wrap justify-center">
                {Array.from(new Array(numPages), (el, index) => (
                  <label
                    key={`page_${index + 1}`}
                    className="rounded-xl bg-white border-2 border-white p-2 inline-block justify-center items-center shadow relative m-2 cursor-pointer"
                    style={{ width: "200px", height: "300px", margin: "10px" }}
                  >
                    <div className="flex flex-col items-center">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(index)}
                        className="mb-2 absolute top-2 right-2 z-10"
                      />
                      <Page pageNumber={index + 1} width={180} />
                    </div>
                  </label>
                ))}
              </div>
            </Document>
          )}
        </div>
 
        {/* Remove Pages Options Section */}
        <div className="p-4 font-Poppins flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Remove Pages</h2>
          <hr className="w-[20%] mt-2" />
          <label className="font-semibold mt-6 mb-2 text-center">
            Effortless PDF Page Removal for Enhanced Workflow
          </label>
          {errorMessage && (
            <div className="text-red-600 font-semibold mt-4">{errorMessage}</div>
          )}
 
          <button
            onClick={handleRemovePages}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 flex justify-center py-2 sm:px-24 w-[250px] sm:w-fit rounded-full mt-7"
            disabled={!pdfDoc || checkedPages.size === 0 || errorMessage !== ""}
          >
            Remove Pages
          </button>
 
          {modifiedPdfBytes && (
            <div className="mt-4">
              <button
                className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold px-[120px] sm:px-[70px] py-2 w-[300px] rounded-full mt-2"
                onClick={handleDownload}
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default RemovePages;
 
