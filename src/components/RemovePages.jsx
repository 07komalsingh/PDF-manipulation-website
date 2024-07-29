
// import React, { useEffect, useState } from 'react';
// import { PDFDocument } from 'pdf-lib';
// import download from 'downloadjs';

// function RemovePages() {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [pdfDoc, setPdfDoc] = useState(null);
//     const [pageNumbers, setPageNumbers] = useState('');
//     const handleFileChange = async (event) => {
//         const buffer = await event.target.files[0].arrayBuffer()
//         const doc = await PDFDocument.load(buffer)
//         setPdfDoc(doc)
//         setSelectedFile(event.target.files[0]);
//     };

//     useEffect(() => {
//         if (selectedFile) {
//             const pages = pdfDoc.getPages()
//             pages.map((item, i) => {
//                 debugger
//                 const page = pdfDoc.getPage(i + 1)
//                 var scale = 1.5;
//                 var viewport = page.getViewport({scale: scale});
//                 debugger
//             })
//         }
//     }, [selectedFile])

//     const handlePageNumbersChange = (event) => {
//         setPageNumbers(event.target.value);
//         console.log('Page numbers:', event.target.value);
//     };

//     const handleRemovePages = async () => {
//         try {
//             if (!selectedFile || !pageNumbers) {
//                 console.error('File or page numbers are not provided');
//                 return;
//             }

//             console.log('Starting PDF manipulation');
//             const pageNums = pageNumbers.split(',').map(num => parseInt(num.trim()) - 1);
//             const fileBytes = await selectedFile.arrayBuffer();
//             const pdfDoc = await PDFDocument.load(fileBytes);
//             console.log('PDF loaded successfully');

//             const totalPages = pdfDoc.getPageCount();
//             console.log('Total pages in PDF:', totalPages);

//             const validPageNums = pageNums.filter(num => num >= 0 && num < totalPages);
//             console.log('Valid page numbers:', validPageNums);

//             const pagesToKeep = pdfDoc.getPages().filter((_, index) => !validPageNums.includes(index));
//             console.log('Pages to keep:', pagesToKeep.length);

//             const newPdfDoc = await PDFDocument.create();
//             for (const page of pagesToKeep) {
//                 const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pdfDoc.getPageIndex(page)]);
//                 newPdfDoc.addPage(copiedPage);
//             }
//             console.log('Pages copied to new PDF');

//             const newPdfBytes = await newPdfDoc.save();
//             console.log('New PDF created successfully');

//             download(newPdfBytes, 'modified.pdf', 'application/pdf');
//             console.log('Download triggered');
//         } catch (error) {
//             console.error('Error during PDF manipulation:', error);
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Remove Pages from PDF</h2>
//             <div className="mb-4">
//                 <input
//                     type="file"
//                     accept="application/pdf"
//                     onChange={handleFileChange}
//                     className="mb-2"
//                 />
//                 {selectedFile && (
//                     <div>
//                         <p>Selected file: {selectedFile.name}</p>
//                     </div>
//                 )}
//             </div>
//             <div className="mb-4">
//                 <label htmlFor="pageNumbers" className="block mb-2">Page Numbers to Remove (comma-separated):</label>
//                 <input
//                     type="text"
//                     id="pageNumbers"
//                     value={pageNumbers}
//                     onChange={handlePageNumbersChange}
//                     className="border p-2 w-full"
//                     placeholder="e.g., 1, 2, 5"
//                 />
//             </div>
//             <button
//                 onClick={handleRemovePages}
//                 className="bg-blue-500 text-white p-2 rounded"
//                 disabled={!selectedFile || !pageNumbers}
//             >
//                 Remove Pages and Download
//             </button>
//         </div>
//     );
// }
// export default RemovePages;



 
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
// import download from 'downloadjs';
 
function RemovePages() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pageNumbers, setPageNumbers] = useState('');
 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
 
  const handlePageNumbersChange = (event) => {
    setPageNumbers(event.target.value);
    console.log('Page numbers:', event.target.value);
  };
 
  const handleRemovePages = async () => {
    try {
      if (!selectedFile || !pageNumbers) {
        console.error('File or page numbers are not provided');
        return;
      }
 
      console.log('Starting PDF manipulation');
      const pageNums = pageNumbers.split(',').map((num) => parseInt(num.trim()) - 1);
      const fileBytes = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      console.log('PDF loaded successfully');
 
      const totalPages = pdfDoc.getPageCount();
      console.log('Total pages in PDF:', totalPages);
 
      const validPageNums = pageNums.filter((num) => num >= 0 && num < totalPages);
      console.log('Valid page numbers:', validPageNums);
 
      const pagesToKeep = pdfDoc.getPages().filter((_, index) => !validPageNums.includes(index));
      console.log('Pages to keep:', pagesToKeep.length);
 
      const newPdfDoc = await PDFDocument.create();
      for (const index in pagesToKeep) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [parseInt(index)]);
        newPdfDoc.addPage(copiedPage);
      }
      console.log('Pages copied to new PDF');
 
      const newPdfBytes = await newPdfDoc.save();
      console.log('New PDF created successfully');
 
      download(newPdfBytes, 'modified.pdf', 'application/pdf');
      console.log('Download triggered');
    } catch (error) {
      console.error('Error during PDF manipulation:', error);
    }
  };
 
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Remove Pages from PDF</h2>
      <div className="mb-4">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mb-2"
        />
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
          </div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="pageNumbers" className="block mb-2">
          Page Numbers to Remove (comma-separated):
        </label>
        <input
          type="text"
          id="pageNumbers"
          value={pageNumbers}
          onChange={handlePageNumbersChange}
          className="border p-2 w-full"
          placeholder="e.g., 1, 2, 5"
        />
      </div>
      <button
        onClick={handleRemovePages}
        className="bg-blue-500 text-white p-2 rounded"
        disabled={!selectedFile || !pageNumbers}
      >
        Remove Pages and Download
      </button>
    </div>
  );
}
 
export default RemovePages;
 
 
 