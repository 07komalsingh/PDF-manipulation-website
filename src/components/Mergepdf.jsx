// import React from 'react';
// import { PDFDocument } from 'pdf-lib';

// const MergePDF = () => {

//     const mergePDFs = async (files) => {
//         const mergedPdf = await PDFDocument.create();
//         for (const file of files) {
//             const existingPdfBytes = await file.arrayBuffer();
//             const pdfDoc = await PDFDocument.load(existingPdfBytes);
//             const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
//             copiedPages.forEach((page) => mergedPdf.addPage(page));
//         }
//         const mergedPdfFile = await mergedPdf.save();
//         download(mergedPdfFile, "merged.pdf", "application/pdf");
//     }

//     const download = (blob, filename, mimeType) => {
//         const url = window.URL.createObjectURL(new Blob([blob], { type: mimeType }));
//         const a = document.createElement('a');
//         a.style.display = 'none';
//         a.href = url;
//         a.download = filename;
//         document.body.appendChild(a);
//         a.click();
//         window.URL.revokeObjectURL(url);
//     }

//     const handleFileChange = (e) => {
//         const files = e.target.files;
//         mergePDFs(files);
//     }

//     return (
//         <div className="mt-16 flex flex-col items-center">
//       <h2 className="font-poppins font-medium text-black lg:text-4xl text-2xl mb-8">Merge PDF</h2>
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <input 
//           type="file" 
//           accept="application/pdf" 
//           multiple 
//           onChange={handleFileChange} 
//           className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
//         />
//         <button 
//           onClick={() => document.querySelector('input[type="file"]').click()} 
//           className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
//         >
//           Select PDF Files
//         </button>
//       </div>
//     </div>
//   );
// };



//new code
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
            <h1 className="font-poppins font-medium text-black lg:text-4xl text-2xl mb-8">Merge PDF Files</h1>
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <input
             type="file"  multiple 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4" 
            />
            {mergedPdfUrl && (
                <a href={mergedPdfUrl} download="merged.pdf" className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                    Download Merged PDF

                </a>
            )}
            </div>
        </div>
    );
    };
    // const mergePDFs = async (files) => {
    //             const mergedPdf = await PDFDocument.create();
    //             for (const file of files) {
    //                 const existingPdfBytes = await file.arrayBuffer();
    //                 const pdfDoc = await PDFDocument.load(existingPdfBytes);
    //                 const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    //                 copiedPages.forEach((page) => mergedPdf.addPage(page));
    //             }
    //             const mergedPdfFile = await mergedPdf.save();
    //             download(mergedPdfFile, "merged.pdf", "application/pdf");
    //         }

    //         const download = (blob, filename, mimeType) => {
    //             const url = window.URL.createObjectURL(new Blob([blob], { type: mimeType }));
    //             const a = document.createElement('a');
    //             a.style.display = 'none';
    //             a.href = url;
    //             a.download = filename;
    //             document.body.appendChild(a);
    //             a.click();
    //             window.URL.revokeObjectURL(url);
    //         }

    //         const handleFileChange = (e) => {
    //             const files = e.target.files;
    //             mergePDFs(files);
    //         }

    //         return (
    //             <div className="mt-16 flex flex-col items-center">
    //           <h2 className="font-poppins font-medium text-black lg:text-4xl text-2xl mb-8">Merge PDF</h2>
    //           <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    //             <input 
    //               type="file" 
    //               accept="application/pdf" 
    //               multiple 
    //               onChange={handleFileChange} 
    //               className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
    //             />
    //             <button 
    //               onClick={() => document.querySelector('input[type="file"]').click()} 
    //               className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    // //             >
    // <div className="mt-16 flex flex-col items-center">
    //                     <h2 className="font-poppins font-medium text-black lg:text-4xl text-2xl mb-8">Merge PDF</h2>
    //                     <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    //                         <input
    //                             type="file"
    //                             accept="application/pdf"
    //                             multiple
    //                             onChange={handleFileChange}
    //                             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-4"
    //                         />
    //                         <button
    //                             onClick={() => document.querySelector('input[type="file"]').click()}
    //                             className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    //                         >
    //                             Select PDF Files
    //                         </button>
    //                     </div>
    //                 </div>
    //               Select PDF Files
    //             </button>
    //           </div>
    //         </div>
    //       );
    //     }




    export default MergePDF;
