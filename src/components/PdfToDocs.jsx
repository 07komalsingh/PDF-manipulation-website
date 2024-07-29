import axios from 'axios';
import React, { useState, useRef } from 'react';
import group from "../assets/img_gup.png";

function PdfToDocs() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', "word");

        try {
            const response = await axios.post('https://feasibility.azurewebsites.net/convert/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',  // Important to receive binary data
            });

            // Create a link element, use it to trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted_file.docx'); // Set the file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onChooseFileClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='flex flex-col items-center justify-center mt-16 pb-14'>
            {!file ? (
                <div className="mb-4 m-2">
                    <h2 className="text-4xl font-semibold mb-24 text-center">
                        PDF to DOCs Converter
                    </h2>
                    <h2 className="text-2xl font-semibold font-poppins mb-5 text-center ">
                        Upload Document
                    </h2>
                    <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
                        <div className="">
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
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <div className="mt-9">
                                    <button
                                        onClick={onChooseFileClick}
                                        className="bg-[#44B7BC] hover:bg-[#44B7BC] text-white font-semibold py-3 px-4 rounded mb-4"
                                    >
                                        Choose Files
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                                <h1 className="text-2xl">Choose your PDF files here</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full flex justify-center  mb-[520px]'>
                    <button onClick={handleUpload} className='bg-[#44B7BC] text-white p-2 mt-2 rounded'>
                        Upload and Convert
                    </button>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                </div>
            )}
        </div>
    );
}
export default PdfToDocs;

