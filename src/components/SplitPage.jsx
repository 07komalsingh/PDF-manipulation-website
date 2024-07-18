

// import React, { useState } from 'react';
// import { PDFDocument } from 'pdf-lib';

// function SplitPage() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSplit = async () => {
//     if (!file) return;

//     const fileReader = new FileReader();
//     fileReader.onload = async (event) => {
//       const pdfBytes = event.target.result;
//       const pdfDoc = await PDFDocument.load(pdfBytes);

//       const splitPdfPromises = pdfDoc.getPageIndices().map(async (index) => {
//         const newPdfDoc = await PDFDocument.create();
//         const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [index]);
//         newPdfDoc.addPage(copiedPage);
//         return await newPdfDoc.save();
//       });

//       const splitPdfBytes = await Promise.all(splitPdfPromises);

//       splitPdfBytes.forEach((bytes, index) => {
//         const blob = new Blob([bytes], { type: 'application/pdf' });
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = `split_page_${index + 1}.pdf`;
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//       });
//     };

//     fileReader.readAsArrayBuffer(file);
//   };

//   return (
//     <div className="split-page">
//       <h2>Split PDF</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <button onClick={handleSplit}>Split PDF</button>
//     </div>
//   );
// }

// export default SplitPage;




// frontend/src/components/SplitPage.jsx
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const SplitPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [startPage, setStartPage] = useState('');
  const [endPage, setEndPage] = useState('');
  const [splitResult, setSplitResult] = useState(null);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSplitPdf = async () => {
    if (!pdfFile || !startPage || !endPage) {
      alert('Please provide a valid PDF file and page range');
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(pdfFile);
    reader.onload = async () => {
      const pdfDoc = await PDFDocument.load(reader.result);
      const start = parseInt(startPage) - 1;
      const end = parseInt(endPage);
      const pagesToExtract = Array.from({ length: end - start }, (_, i) => start + i);
      
      const subDocument = await PDFDocument.create();
      const copiedPages = await subDocument.copyPages(pdfDoc, pagesToExtract);
      copiedPages.forEach(page => subDocument.addPage(page));

      const pdfBytes = await subDocument.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitResult(url);
    };
  };

  return (
    <div className="split-pdf-page">
      <h2>Split PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <input
        type="number"
        placeholder="Start Page"
        value={startPage}
        onChange={(e) => setStartPage(e.target.value)}
      />
      <input
        type="number"
        placeholder="End Page"
        value={endPage}
        onChange={(e) => setEndPage(e.target.value)}
      />
      <button onClick={handleSplitPdf}>Split PDF</button>
      {splitResult && (
        <div>
          <h3>Download Split PDF</h3>
          <a href={splitResult} download="split.pdf">Download</a>
        </div>
      )}
    </div>
  );
};

export default SplitPage;
