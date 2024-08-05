import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { PDFDocument } from 'pdf-lib';
import group from "../assets/img_gup.png";

import FileInput from './FileInput';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const ReorderPDF = () => {
    const [file, setFile] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pages, setPages] = useState([]);

    const onFilesSelected = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPages(Array.from({ length: numPages }, (_, index) => index + 1));
    };

    const reorderPages = (startIndex, endIndex) => {
        const reorderedPages = Array.from(pages);
        const [removed] = reorderedPages.splice(startIndex, 1);
        reorderedPages.splice(endIndex, 0, removed);
        setPages(reorderedPages);
    };

    const downloadReorderedPDF = async () => {
        if (!file) return;
        const existingPdfBytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const newPdfDoc = await PDFDocument.create();
        const pagesToCopy = await newPdfDoc.copyPages(pdfDoc, pages.map(p => p - 1));
        pagesToCopy.forEach(page => newPdfDoc.addPage(page));
        const pdfBytes = await newPdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reordered.pdf';
        a.click();
    };

    return (
        <div className="mt-8">
            {!file ? (
                 <div className="mb-4 m-2">
                 <h2 className="text-4xl font-semibold mb-16 p-5 text-center">
                   PDF to DOCs Converter
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
                       
                       <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                         <h1 className="text-2xl">Choose your PDF file here</h1>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               
            ) : (
                <div>
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        {pages.map((page, index) => (
                            <div key={index} className="mb-4">
                                <Page pageNumber={page} />
                                <button onClick={() => reorderPages(index, index - 1)} disabled={index === 0}>Move Up</button>
                                <button onClick={() => reorderPages(index, index + 1)} disabled={index === pages.length - 1}>Move Down</button>
                            </div>
                        ))}
                    </Document>
                    <button onClick={downloadReorderedPDF}>Download Reordered PDF</button>
                </div>
            )}
        </div>
    );
};

export default ReorderPDF;
