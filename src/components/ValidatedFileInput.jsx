
import React from 'react';
import PropTypes from 'prop-types';
import { PDFDocument } from 'pdf-lib';

const ValidatedFileInput = ({ onFilesSelected }) => {
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    const path = window.location.pathname;

    if (selectedFile) {
      // Check if the file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        alert('Please select only PDF files.');
        event.target.value = null;
        return;
      }

      // Check if the path is '/split'
      if (path === '/split' && path === '/convert') {
        try {
          const fileArrayBuffer = await selectedFile.arrayBuffer();
          const pdfDoc = await PDFDocument.load(fileArrayBuffer);
          const pageCount = pdfDoc.getPageCount();
          if (pageCount <= 1) {
            alert('Please upload a PDF with more than one page.');
            event.target.value = null;
            return;
          }
        } catch (error) {
          alert('Protected files cannot be uploaded');
          event.target.value = null;
          return;
        }
      }

      // Simple check for protected file (you can replace this with actual PDF protection check logic)
      if (selectedFile.name.toLowerCase().includes('protected')) {
        alert('Protected files cannot be uploaded.');
        event.target.value = null;
        return;
      }

      onFilesSelected(selectedFile);
      event.target.value = null;
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
        onClick={onChooseFileClick}
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
