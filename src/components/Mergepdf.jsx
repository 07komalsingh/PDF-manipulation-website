
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const MergePDF = () => {
    const [mergedPdfUrl, setMergedPdfUrl] = useState(null);

    const mergePDFs = async (files) => {
        const mergedPdf = await PDFDocument.create();
        for (const file of files) {
            const existingPdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        const mergedPdfFile = await mergedPdf.save();
        const url = URL.createObjectURL(new Blob([mergedPdfFile], { type: 'application/pdf' }));
        setMergedPdfUrl(url);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        mergePDFs(files);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Merge PDF Files</h1>
            <input type="file" multiple onChange={handleFileChange} className="mb-4" />
            {mergedPdfUrl && (
                <a href={mergedPdfUrl} download="merged.pdf" className="text-blue-500 underline">
                    Download Merged PDF

                </a>
            )}
        </div>
    );
    };
 



    export default MergePDF;
