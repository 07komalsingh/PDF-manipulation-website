import React from 'react';
import PropTypes from 'prop-types';
import { PDFDocument } from 'pdf-lib';

const ValidatedFileInput = ({ onFilesSelected, tool }) => {
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Check if the file is a PDF
      if (selectedFile.type !== 'application/pdf') {
        alert('Please select only PDF files.');
        event.target.value = null;
        return;
      }

      try {
        const fileArrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileArrayBuffer, { updateMetadata: false });

        // Check for encryption/protection
        if (pdfDoc.isEncrypted) {
          alert('Protected files cannot be uploaded.');
          event.target.value = null;
          return;
        }

        if (tool === '/split' || tool === '/remove' || tool === '/reorder') {
          const pageCount = pdfDoc.getPageCount();
          if (pageCount <= 1) {
            alert('Please select a PDF with more than one page.');
            event.target.value = null;
            return;
          }
        }

      } catch (error) {
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
  tool: PropTypes.string.isRequired,
};

export default ValidatedFileInput;
