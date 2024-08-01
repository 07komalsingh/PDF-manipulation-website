
import React from 'react';
import PropTypes from 'prop-types';
import { PDFDocument } from 'pdf-lib'; // Import PDF-lib

const ValidatedFileInput = ({ onFilesSelected }) => {
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const path = window.location.pathname; // Get the current path

    if (selectedFile) {
      // Check if the file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        alert('Please select only PDF files.');
        event.target.value = null; // Reset file input
        return;
      }

      // Check if the path is '/split'
      if (path === '/split') {
        try {
          // Read the PDF file
          const fileArrayBuffer = await selectedFile.arrayBuffer();
          const pdfDoc = await PDFDocument.load(fileArrayBuffer);

          // Check the number of pages
          const pageCount = pdfDoc.getPageCount();
          if (pageCount <= 1) {
            alert('Please upload a PDF with more than one page.');
            event.target.value = null; // Reset file input
            return;
          }
        } catch (error) {
          alert('An error occurred while processing the PDF.');
          event.target.value = null; // Reset file input
          return;
        }
      }

      // If validation passes, trigger the callback
      onFilesSelected(selectedFile);
      event.target.value = null; // Reset file input to allow selecting the same file again
    }
  };

  const onChooseFileClick = () => {
    const fileInput = document.getElementById('file-input');
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <input
        id="file-input"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={onChooseFileClick} // Use onChooseFileClick to trigger file input
        className="bg-[#44B7BC] hover:bg-[#30aab1] mt-5 text-white font-semibold py-2 px-4 rounded"
      >
        Choose File
      </button>
    </>
  );
};

ValidatedFileInput.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
};

export default ValidatedFileInput;
