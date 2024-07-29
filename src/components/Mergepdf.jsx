import React, { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { PDFDocument } from 'pdf-lib';
import '@react-pdf-viewer/core/lib/styles/index.css';
 
const MergePDF = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [mergedPDFUrl, setMergedPDFUrl] = useState(null);
 
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
 
    const urls = files.map((file) => URL.createObjectURL(file));
    setFileURLs(urls);
  };
 
  const handleMerge = async () => {
    const mergedPdf = await PDFDocument.create();
 
    for (const file of selectedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
 
    const mergedPdfFile = await mergedPdf.save();
    const mergedPdfBlob = new Blob([mergedPdfFile], { type: 'application/pdf' });
    const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);
    setMergedPDFUrl(mergedPdfUrl);
  };
 
  const renderPageInCard = (url, pageIndex) => (
    <div key={pageIndex} className="card mb-8 w-[300px] h-[400px] border border-gray-300 p-2 ">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer
          fileUrl={url}
          defaultScale={SpecialZoomLevel.PageWidth}
          renderPage={(props) => (
            <div className="page-container">
              <props.canvas
                width="100%"
                height="100%"
                renderViewport={SpecialZoomLevel.PageWidth}
              />
            </div>
          )}
        />
      </Worker>
    </div>
  );
 
  const extractPages = async (file) => {
    const pdf = await PDFDocument.load(await file.arrayBuffer());
    const totalPages = pdf.getPageCount();
    const urls = [];
 
    for (let i = 0; i < totalPages; i++) {
      const [page] = await pdf.copyPages(pdf, [i]);
      const pagePdf = await PDFDocument.create();
      pagePdf.addPage(page);
      const pageBlob = await pagePdf.saveAsBase64({ dataUri: true });
      urls.push(pageBlob);
    }
 
    return urls;
  };
 
  const getAllPages = async () => {
    let allPagesUrls = [];
 
    for (const file of selectedFiles) {
      const pages = await extractPages(file);
      allPagesUrls = allPagesUrls.concat(pages);
    }
 
    setFileURLs(allPagesUrls);
  };
 
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="font-poppins font-bold text-black text-2xl m-8">Select PDFs to Merge</h2>
      <input type="file" accept="application/pdf" multiple onChange={handleFileChange} />
      <button
        className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4"
        onClick={getAllPages}
      >
        Preview PDFs
      </button>
      <div className="mt-4">
        {selectedFiles.length > 0 && (
          <div>
            <h3 className="font-poppins font-semibold text-xl mb-4">Selected Files:</h3>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
            <div className="mt-8">
              <h3 className="font-poppins font-semibold text-xl mb-4">Preview Selected PDFs:</h3>
              <div className="flex flex-wrap gap-4">
                {fileURLs.map((url, index) => renderPageInCard(url, index))}
              </div>
            </div>
            <button
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4"
              onClick={handleMerge}
            >
              Merge Files
            </button>
            {mergedPDFUrl && (
              <div className="mt-8">
                <h3 className="font-poppins font-semibold text-xl mb-4">Preview Merged PDF:</h3>
                <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                  <Viewer fileUrl={mergedPDFUrl} />
                </Worker>
                <a
                  href={mergedPDFUrl}
                  className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4"
                  download="merged.pdf"
                >
                  Download Merged PDF
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default MergePDF;

