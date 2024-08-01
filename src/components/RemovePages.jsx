import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import download from "downloadjs";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

function RemovePages() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [checkedPages, setCheckedPages] = useState(new Set());
  const [modifiedPdfBytes, setModifiedPdfBytes] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const buffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(buffer);
    setPdfDoc(doc);
    setSelectedFile(file);
    setModifiedPdfBytes(null); // Reset modified PDF bytes when a new document is loaded
  };

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
  };

  const handleRemovePages = async () => {
    if (!selectedFile || checkedPages.size === 0) {
      console.error("No file selected or no pages selected to remove");
      return;
    }

    const fileBytes = await selectedFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(fileBytes);

    const pagesToKeep = pdfDoc.getPages().filter(
      (_, index) => !checkedPages.has(index)
    );

    const newPdfDoc = await PDFDocument.create();
    for (const [index, page] of pagesToKeep.entries()) {
      const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [index]);
      newPdfDoc.addPage(copiedPage);
    }

    const newPdfBytes = await newPdfDoc.save();
    setModifiedPdfBytes(newPdfBytes);
  };

  const handleDownload = () => {
    if (modifiedPdfBytes) {
      download(modifiedPdfBytes, "modified.pdf", "application/pdf");
    }
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Remove Pages from PDF</h2>
      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-2 mx-auto"
        />
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        {selectedFile && (
          <Document
            file={selectedFile}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <div className="flex flex-wrap justify-center">
              {Array.from(new Array(numPages), (el, index) => (
                <div key={`page_${index + 1}`} className="m-2">
                  <div className="flex flex-col items-center">
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      className="mb-2"
                    />
                    <Page pageNumber={index + 1} />
                  </div>
                </div>
              ))}
            </div>
          </Document>
        )}
      </div>

      <button
        onClick={handleRemovePages}
        className="bg-[#44B7BC] text-white py-2 px-4 rounded-full mx-auto mb-4"
        disabled={!selectedFile || checkedPages.size === 0}
      >
        Remove Pages
      </button>

      {modifiedPdfBytes && (
        <div className="mt-4">
          <button
            className="bg-[#44B7BC] text-white py-2 px-4 rounded-full mx-auto"
            onClick={handleDownload}
          >
            Download Modified PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default RemovePages;
