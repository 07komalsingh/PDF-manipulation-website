import React, { useState, useRef } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { useLocation } from "react-router-dom";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { FaCirclePlus } from "react-icons/fa6";
import rangeImg from '../assets/range.svg';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const SplitPage = () => {
  const { state } = useLocation(); // Access state passed via useNavigate
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(state.file);
  const [ranges, setRanges] = useState([{ from: 1, to: 2 }]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const inputRef = useRef();

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleRangeChange = (index, field, value) => {
    const newRanges = [...ranges];
    newRanges[index][field] = value;
    setRanges(newRanges);
  };

  const addRange = () => {
    setRanges([...ranges, { from: 1, to: 2 }]);
  };

  const splitPDF = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const existingPdfBytes = new Uint8Array(reader.result);
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const newPdfDoc = await PDFDocument.create();
      for (const range of ranges) {
        for (let i = range.from - 1; i < range.to; i++) {
          const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
          newPdfDoc.addPage(copiedPage);
        }
      }

      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="py-10 px-4 mb-30 font-Poppins w-full bg-[#f5f5f5]">
      <div className="flex flex-col">
        {/* PDF Preview Section */}
        <div className="p-4 flex justify-center">
          {file && (
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="rounded-3xl bg-white border-white  p-2 inline-block justify-center items-center "
                  style={{ width: "200px", height: "300px", margin: "10px" }}
                >
                  <Page pageNumber={index + 1} width={180} />
                </div>
              ))}
            </Document>
          )}
        </div>

        {/* Split PDF Options Section */}
        <div className="p-4 font-Poppins flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold mb-4 ">Split PDF</h2>
          <hr className="w-[20%] mt-2" />
          <label className="font-semibold mt-6 mb-6">
            Effortless PDF Splitting for Enhanced Workflow
          </label>
          {ranges.map((range, index) => (
            <div key={index} className="mb-4 flex gap-4 items-center">
              <div className="flex justify-center items-center gap-1">
                <img src={rangeImg} alt="" className="h-5 w-5" />
                <p className="block font-Poppins">Range {index + 1}</p>
              </div>
              <div className="flex items-center border-2 border-[#44B7BC] rounded-xl p-2">
                <span className="mr-2">From Page</span>
                <hr className="rotate-90 border-[1px] border-[#44B7BC] w-[60px]" />
                <input
                  type="number"
                  value={range.from}
                  onChange={(e) =>
                    handleRangeChange(index, "from", parseInt(e.target.value))
                  }
                  className="border-none p-2 w-16 text-center"
                  min="1"
                  max={numPages}
                />
              </div>

              <div className="flex items-center border-2 border-[#44B7BC] rounded-xl p-2">
                <span className="mr-2">to</span>
                <hr className="rotate-90 border-[1px] border-[#44B7BC] w-[60px]" />
                <input
                  type="number"
                  value={range.to}
                  onChange={(e) =>
                    handleRangeChange(index, "to", parseInt(e.target.value))
                  }
                  className="border-none p-2 w-16 text-center"
                  min="1"
                  max={numPages}
                />
              </div>
              <div className="flex gap-2 justify-center items-center py-4 px-6 rounded-xl border-2 border-[#44B7BC] text-[#44B7BC]">
                <FaCirclePlus />
                <button onClick={addRange} className="font-semibold">
                  Add Range
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={splitPDF}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4"
          >
            Split to PDF
          </button>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download="split.pdf"
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-11 rounded-full mt-4"
            >
              Download Split PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default SplitPage;
