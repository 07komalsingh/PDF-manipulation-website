import axios from 'axios';
import React, { useState, useRef } from 'react';
import group from "../assets/img_gup.png";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PdfToDocs() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'converted_file.docx');
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

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div className='flex flex-col items-center justify-center mt-30 pb-14   bg-[#F5F5F5]'>
            {!file ? (
                <div className="mb-4 m-2">
                    <h2 className="text-4xl font-semibold mb-24 text-center">
                        PDF to DOCs Converter
                    </h2>
                    <h2 className="text-2xl font-semibold font-poppins mb-5 text-center">
                        Upload Document
                    </h2>
                    <div className=" bg-[#E0F2F3B8] border-2 border-[#44B7BC] rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
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
                                        Choose File
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                                <h1 className="text-2xl">Choose your PDF file here</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full flex flex-col items-center mb-[150px]  '>
                    <div className="w-full flex flex-wrap justify-center mb-4">
                        {fileDataURL && (
                            <Document
                                file={fileDataURL}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                {Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <div
                                            key={`page_${index + 1}`}
                                            className="m-2 p-4 border-2 border-white   bg-white inline-block rounded-3xl"
                                        >
                                            <Page
                                                pageNumber={index + 1}
                                                width={250}
                                            />
                                        </div>
                                    )
                                )}
                            </Document>
                        )}
                    </div>
                    <button onClick={handleUpload} className='bg-[#44B7BC] p-2 hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4'>
                        Convert
                    </button>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error}</p>}
                </div>
            )}
        </div>
    );
}

export default PdfToDocs;



