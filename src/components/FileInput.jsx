
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { GoPlus } from 'react-icons/go';
import { pdfjs } from 'react-pdf';

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const FileInput = ({ onFilesSelected, useIcon }) => {
  const fileInputRef = useRef(null);

  const checkProtectedPDF = async (file) => {
    try {
      const data = new Uint8Array(await file.arrayBuffer());
      const pdf = await pdfjs.getDocument({ data }).promise;
      return false; // File is not password-protected
    } catch (error) {
      if (error.name === 'PasswordException') {
        return true; // File is password-protected
      }
      throw error; // Some other error occurred
    }
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');

    if (pdfFiles.length !== files.length) {
      alert('Please select only PDF files.');
      event.target.value = null; // Reset file input
      return;
    }

    const protectedFiles = [];
    for (const file of pdfFiles) {
      const isProtected = await checkProtectedPDF(file);
      if (isProtected) {
        protectedFiles.push(file);
      }
    }

    if (protectedFiles.length > 0) {
      alert('file are password-protected and cannot be uploaded.');
      event.target.value = null; // Reset file input
      return;
    }

    onFilesSelected(pdfFiles);
    event.target.value = null; // Reset file input to allow selecting the same file again
  };

  const onChooseFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        type="file"
        accept="application/pdf"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={onChooseFileClick}
        className={`bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-3 px-3 sm:mt-6 flex items-center ${useIcon ? 'text-4xl p-4 rounded-full' : 'rounded'}`}
      >
        {useIcon ? <GoPlus /> : 'Choose Files'}
      </button>
    </>
  );
};

FileInput.propTypes = {
  onFilesSelected: PropTypes.func.isRequired,
  useIcon: PropTypes.bool,
};

export default FileInput;
