import React, { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function RemovePages() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [pageNumbers, setPageNumbers] = useState("");
  const [numPages, setNumPages] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const buffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(buffer);
    setPdfDoc(doc);
    setSelectedFile(file);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handlePageNumbersChange = (event) => {
    setPageNumbers(event.target.value);
  };

  const handleRemovePages = async () => {
    try {
      if (!selectedFile || !pageNumbers) {
        console.error("File or page numbers are not provided");
        return;
      }

      const pageNums = pageNumbers.split(",").map((num) => parseInt(num.trim()) - 1);
      const fileBytes = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);

      const totalPages = pdfDoc.getPageCount();
      const validPageNums = pageNums.filter((num) => num >= 0 && num < totalPages);

      const pagesToKeep = pdfDoc.getPages().filter((_, index) => !validPageNums.includes(index));
      const newPdfDoc = await PDFDocument.create();
      for (const page of pagesToKeep) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pdfDoc.getPageIndex(page)]);
        newPdfDoc.addPage(copiedPage);
      }

      const newPdfBytes = await newPdfDoc.save();
      download(newPdfBytes, "modified.pdf", "application/pdf");
    } catch (error) {
      console.error("Error during PDF manipulation:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Remove Pages from PDF</h2>
      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-2"
        />
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="pageNumbers" className="block mb-2">
          Page Numbers to Remove (comma-separated):
        </label>
        <input
          type="text"
          id="pageNumbers"
          value={pageNumbers}
          onChange={handlePageNumbersChange}
          className="border p-2 w-full"
          placeholder="e.g., 1, 2, 5"
        />
      </div>

      <div className="mb-4">
        {selectedFile && (
          <Document
            file={selectedFile}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={`page_${index + 1}`} className="mb-4">
                <Page pageNumber={index + 1} />
              </div>
            ))}
          </Document>
        )}
      </div>

      <button
        onClick={handleRemovePages}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={!selectedFile || !pageNumbers}
      >
        Remove Pages and Download
      </button>
    </div>
  );
}

export default RemovePages;
