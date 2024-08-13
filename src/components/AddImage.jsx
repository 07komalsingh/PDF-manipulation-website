import React, { useState } from 'react';
import group from "../assets/img_gup.png";
import { PDFDocument } from 'pdf-lib';
import ImagePopup from './ImagePopup';
import PdfPreview from './PdfPreview';
import ValidatedFileInput from './ValidatedFileInput'; // Import ValidatedFileInput

const AddImageToPDF = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDataURL, setPdfDataURL] = useState(null);
  const [pdfPreviewPages, setPdfPreviewPages] = useState([]);
  const [updatedPdf, setUpdatedPdf] = useState(null);
  const [pageRange, setPageRange] = useState({ from: 1, to: 1 });

  // Handle PDF file upload
  const handlePdfUpload = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    setPdfFile(arrayBuffer);

    // Convert array buffer to a Blob URL for previewing
    const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfDataURL(url);

    // Set the page numbers for preview (e.g., all pages)
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageNumbers = Array.from({ length: pdfDoc.getPages().length }, (_, i) => i + 1);
    setPdfPreviewPages(pageNumbers);

    // Update the default page range to cover all pages
    setPageRange({ from: 1, to: pageNumbers.length });
  };

  // Handle opening the image popup
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // Handle closing the image popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  // Handle applying the image to the PDF
  const handleApplyImage = async (imageFile, position) => {
    const existingPdfBytes = pdfFile;
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    // Load and embed the image in the PDF
    const imageBytes = await fetch(imageFile).then((res) => res.arrayBuffer());
    const image = await pdfDoc.embedPng(imageBytes);

    const { x, y } = position;
    const imageWidth = 50;
    const imageHeight = 50;

    // Apply the image to the specified page range
    for (let i = pageRange.from - 1; i < pageRange.to; i++) {
      const page = pages[i];
      page.drawImage(image, {
        x,
        y: page.getHeight() - y - imageHeight, // Flip y-axis for PDF
        width: imageWidth,
        height: imageHeight,
      });
    }

    // Save the updated PDF
    const pdfBytes = await pdfDoc.save();
    setUpdatedPdf(pdfBytes);
  };

  // Handle downloading the updated PDF
  const handleDownloadPdf = () => {
    const blob = new Blob([updatedPdf], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);           
    link.download = 'updated.pdf';
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center pb-14 bg-[#F5F5F5]">
      {!pdfFile ? (
        <div className="mb-4 m-2">
          <h2 className="text-4xl font-semibold mb-16 p-5 text-center">
            Add Image to PDF Pages
          </h2>
          <h2 className="text-2xl font-semibold font-poppins mb-7 text-center">
            Upload Document
          </h2>
          <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
            <div>
              <h1 className="text-[#060808] font-poppins text-2xl font-normal text-center">
                Upload PDF Attachments
              </h1>
              <div className="flex flex-col items-center">
                <div>
                  <img
                    src={group}
                    alt="PDF Icon"
                    className="h-20 mt-4 w-full md:w-auto"
                  />
                </div>
                <ValidatedFileInput 
                  onFilesSelected={handlePdfUpload} 
                  tool="/add-image" 
                />
                <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                  <h1 className="text-2xl">Choose your PDF file here</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <PdfPreview pdfDataURL={pdfDataURL} pdfPreviewPages={pdfPreviewPages} />

          <div className="mt-4">
            <label className="mr-2">From:</label>
            <input
              type="number"
              min="1"
              max={pdfPreviewPages.length}
              value={pageRange.from}
              onChange={(e) => setPageRange({ ...pageRange, from: Number(e.target.value) })}
              className="border rounded px-2 py-1 mr-4"
            />
            <label className="mr-2">To:</label>
            <input
              type="number"
              min="1"
              max={pdfPreviewPages.length}
              value={pageRange.to}
              onChange={(e) => setPageRange({ ...pageRange, to: Number(e.target.value) })}
              className="border rounded px-2 py-1"
            />
          </div>

          <button
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-24 rounded-full mt-4"
            onClick={handleOpenPopup}
          >
            Add Image
          </button>
          {isPopupOpen && (
            <ImagePopup onClose={handleClosePopup} onApplyImage={handleApplyImage} />
          )}
          {updatedPdf && (
            <button
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 sm:px-[65px] px-16 rounded-full mt-4"
              onClick={handleDownloadPdf}
            >
              Download PDF
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AddImageToPDF;

