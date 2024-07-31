import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const ValidatedFileInput = ({ onFilesSelected }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type !== 'application/pdf') {
      alert('Please select only PDF files.');
      event.target.value = null; // Reset file input
      return;
    }

    if (selectedFile) {
      onFilesSelected(selectedFile);
    }
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
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={onChooseFileClick}
        className="bg-[#44B7BC] hover:bg-[#30aab1] mt-5 text-white font-semibold py-2 px-4 rounded "
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
