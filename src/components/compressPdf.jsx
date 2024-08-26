import React, { useState, useEffect } from "react";
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

function CompressPDF() {
  window. scrollTo({ top:0, behavior: 'auto' });
  const { state } = useLocation();
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (state?.file) {
      const loadPdf = async () => {
        const fileBytes = await state.file.arrayBuffer();
        const doc = await pdfjs.getDocument(fileBytes).promise;
        setPdfDoc(doc);
      };

      loadPdf();
    }
  }, [state?.file]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleCompress = async () => {
    if (!pdfDoc) {
      setErrorMessage("Please select a PDF file to compress.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", state.file);

      const response = await fetch("http://192.168.1.77:8000", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        toastr.success("PDF compressed successfully!", "Success");
        download(blob, "compressed.pdf", "application/pdf");
      } else {
        toastr.error("Failed to compress the PDF.", "Error");
      }
    } catch (error) {
      toastr.error("An error occurred while compressing the PDF.", "Error");
      console.error("Compression error:", error);
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
                      <Page pageNumber={index + 1} width={180} />
                    </div>
                  </label>
                ))}
              </div>
            </Document>
          )}
        </div>

        {/* Compress PDF Options Section */}
        <div className="p-4 font-Poppins flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4">Compress PDF</h2>
          <hr className="w-[20%] mt-2" />
          <label className="font-semibold mt-6 mb-2 text-center">
            Optimize Your PDF for Faster Sharing
          </label>
          {errorMessage && (
            <div className="text-red-600 font-semibold mt-4">{errorMessage}</div>
          )}

          <button
            onClick={handleCompress}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 flex justify-center py-2 sm:px-24 w-[250px] sm:w-fit rounded-full mt-7"
            disabled={!pdfDoc || errorMessage !== ""}
          >
            Compress PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompressPDF;

