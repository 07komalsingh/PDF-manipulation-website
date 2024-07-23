// // PdfToDocs.jsx
// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';
// import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// import { Document, Packer, Paragraph, HeadingLevel } from 'docx';

// // Set the path to the worker script
// GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.js';

// const PdfToDocs = () => {
//     const [pdfFile, setPdfFile] = useState(null);
//     const [doc, setDoc] = useState(null);

//     const handleFileChange = (event) => {
//         setPdfFile(event.target.files[0]);
//     };

//     const extractTextFromPdf = async (file) => {
//         const pdf = await getDocument({ url: URL.createObjectURL(file) }).promise;
//         let text = '';

//         for (let i = 0; i < pdf.numPages; i++) {
//             const page = await pdf.getPage(i);
//             const content = await page.getTextContent();
//             text += content.items.map(item => item.str).join(' ') + '\n';
//         }

//         return text;
//     };

//     const convertToDoc = async () => {
//         if (!pdfFile) return;

//         const text = await extractTextFromPdf(pdfFile);

//         // Create DOCX document
//         const doc = new Document({
//             sections: [
//                 {
//                     properties: {},
//                     children: [
//                         new Paragraph({
//                             text: text,
//                             heading: HeadingLevel.HEADING_1,
//                         }),
//                     ],
//                 },
//             ],
//         });

//         const blob = await Packer.toBlob(doc);
//         setDoc(URL.createObjectURL(blob));
//     };

//     return (
//         <div>
//             <h3>Upload PDF and Convert to DOCX</h3>
//             <input type="file" accept=".pdf" onChange={handleFileChange} />
//             <button onClick={convertToDoc}>Convert to DOCX</button>
//             {doc && <a href={doc} download="converted.docx">Download DOCX</a>}
//         </div>
//     );
// };

// export default PdfToDocs;



import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';

// Use a CDN for the PDF.js worker script
GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const PdfToDocs = () => {
    const [pdfFile, setPdfFile] = useState(null);
    const [doc, setDoc] = useState(null);

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    const extractTextFromPdf = async (file) => {
        const pdf = await getDocument({ url: URL.createObjectURL(file) }).promise;
        let text = '';

        for (let i = 0; i <= pdf.numPages; i++) {
            try{
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(' ') + '\n';
        }catch (error) {
            console.error(`Failed to get page ${i}:`, error);
        }
    }
        return text;
    };

    const convertToDoc = async () => {
        if (!pdfFile) return;

        const text = await extractTextFromPdf(pdfFile);

        // Create DOCX document
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            text: text,
                            heading: HeadingLevel.HEADING_1,
                        }),
                    ],
                },
            ],
        });

        const blob = await Packer.toBlob(doc);
        setDoc(URL.createObjectURL(blob));
    };

    return (
        <div>
            <h3>Upload PDF and Convert to DOCX</h3>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button onClick={convertToDoc}>Convert to DOCX</button>
            {doc && <a href={doc} download="converted.docx">Download DOCX</a>}
        </div>
    );
};

export default PdfToDocs;
