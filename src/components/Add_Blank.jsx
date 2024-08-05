import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function AddBlankPage() {
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setFile(selectedFile);
                setFileDataURL(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const addBlankPage = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('YOUR_API_ENDPOINT', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'modified_file.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error adding blank page:', error);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className='flex flex-col items-center justify-center mt-16 pb-14'>
            {!file ? (
                <div className="mb-4 m-2">
                    <h2 className="text-4xl font-semibold mb-24 text-center">
                        Add Blank Page to PDF
                    </h2>
                    <h2 className="text-2xl font-semibold font-poppins mb-5 text-center">
                        Upload Document
                    </h2>
                    <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
                        <div>
                            <h1 className="text-[#060808] font-poppins text-2xl font-normal text-center">
                                Upload PDF Attachment
                            </h1>
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="bg-[#44B7BC] hover:bg-[#44B7BC] text-white font-semibold py-3 px-4 rounded mb-4 mt-9"
                                >
                                    Choose File
                                </button>
                                <h1 className="text-2xl text-gray-600 mt-[1rem] font-poppins">
                                    Choose your PDF file here
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full flex flex-col items-center mb-[520px]'>
                    <div className="w-full flex flex-wrap justify-center mb-4">
                        {fileDataURL && (
                            <Document
                                file={fileDataURL}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                {Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                            width={150}
                                            className="m-2 border border-gray-300 bg-blue-100"
                                        />
                                    )
                                )}
                            </Document>
                        )}
                    </div>
                    <button onClick={addBlankPage} className='bg-[#44B7BC] text-white p-2 mt-2 rounded'>
                        Add Blank Page
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddBlankPage;
