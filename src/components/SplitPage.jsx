import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import { useLocation, useNavigate } from "react-router-dom";
import JSZip from "jszip";
import { FaCirclePlus } from "react-icons/fa6";
import rangeImg from '../assets/range.svg';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
 
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
 
toastr.options = {
  closeButton: true,
  progressBar: true,
  timeOut: "3000",
  extendedTimeOut: "1000",
  preventDuplicates: true,
  newestOnTop: true,
};
 
const SplitPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState(state?.file || null);
  const [ranges, setRanges] = useState([{ from: '1', to: '3' }]); // Initialize with default values
  const [zipUrl, setZipUrl] = useState("");
  const [error, setError] = useState('');
  const [pdfSplit, setPdfSplit] = useState(false); // Track if PDF is split
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  useEffect(() => {
    if (!file) {
      navigate('/');
    }
  }, [file, navigate]);
 
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
 
  const handleRangeChange = (index, field, value) => {
    if (pdfSplit) return; // If PDF is split, do not allow changes
 
    const newRanges = [...ranges];
    newRanges[index][field] = value;
    setRanges(newRanges);
    validateRanges(newRanges);
  };
  const validateRanges = (ranges) => {
    for (let i = 0; i < ranges.length; i++) {
      const fromValue = parseInt(ranges[i].from);
      const toValue = parseInt(ranges[i].to);
 
 
    if (!fromValue || !toValue) {
      setError(`Invalid range for Range ${i + 1}: Both "from" and "to" values must be provided.`);
      return false;
    }
 
    const fromPage = parseInt(fromValue);
    const toPage = parseInt(toValue);
 
    if (isNaN(fromPage) || isNaN(toPage)) {
      setError(`Invalid range for Range ${i + 1}: Both values must be numbers.`);
      return false;
    }
 
    if (fromPage < 1 || toPage < 1) {
      setError(`Invalid range for Range ${i + 1}: Page values must be greater than 0.`);
      return false;
    }
 
    if (fromPage > toPage) {
      setError(`Invalid range for Range ${i + 1}: "From" value must be less than or equal to "To" value.`);
      return false;
    }
 
   
      // Specific validation for the case "1 in 'from' and last page in 'to'"
      if (fromValue === 1 && toValue === numPages) {
        setError(`Invalid range for Range ${i + 1}: Cannot include all pages in a single range.`);
        return false;
      }

      
      // Ensure each range's start is greater than the end of the previous range
      if (i > 0 && fromValue <= ranges[i - 1].to) {
        setError(`Invalid range for Range ${i + 1}: Start page must be after the previous range.`);
        return false;
      }
    
 
    if (toPage > numPages) {
      setError(`Invalid range for Range ${i + 1}: "To" value must be less than or equal to the number of pages.`);
      return false;
    }
  }
 
  setError('');
  return true;
};
 
 
  const addRange = () => {
   
    if (pdfSplit) return; // If PDF is split, do not allow adding new ranges
 
    setRanges([...ranges, { from: '', to: '' }]); // Add a new range with empty values
  };
 
  const splitPDF = async () => {
    if (!validateRanges(ranges)) return;
    setPdfSplit(true); // Set to true when split starts
 
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const existingPdfBytes = new Uint8Array(reader.result);
          const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
 
          const zip = new JSZip();
          const pageTracker = new Array(numPages).fill(false); // Track pages already included in ranges
 
          for (const [index, range] of ranges.entries()) {
            const fromValue = parseInt(range.from);
            const toValue = parseInt(range.to);
 
            // Ensure valid ranges
            const newPdfDoc = await PDFDocument.create();
            for (let i = fromValue - 1; i < toValue; i++) {
              const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
              newPdfDoc.addPage(copiedPage);
              pageTracker[i] = true; // Mark this page as included
            }
 
            const pdfBytes = await newPdfDoc.save();
            zip.file(`split_${index + 1}.pdf`, pdfBytes);
          }
 
          // Handle non-mentioned pages
          const nonMentionedPages = pageTracker
            .map((included, index) => !included ? index + 1 : null)
            .filter(page => page !== null);
 
          if (nonMentionedPages.length > 0) {
            const newPdfDoc = await PDFDocument.create();
            for (const pageIndex of nonMentionedPages) {
              const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex - 1]);
              newPdfDoc.addPage(copiedPage);
            }
 
            const pdfBytes = await newPdfDoc.save();
            zip.file("non_mentioned_pages.pdf", pdfBytes);
          }
 
          const zipBlob = await zip.generateAsync({ type: "blob" });
          const zipUrl = URL.createObjectURL(zipBlob);
          setZipUrl(zipUrl);
 
          toastr.success("PDF split and ZIP file created successfully!", "Success");
        } catch (e) {
          toastr.error("Failed to process the PDF. It might be protected.", "Error");
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      toastr.error("Failed to split PDF.", "Error");
    }
  };
 
  return (
    <div className="py-10 px-4 mb-30 font-Poppins w-full bg-[#f5f5f5] flex justify-center">
      <div className="flex flex-col">
        {/* PDF Preview Section */}
        <div className="p-4 flex justify-center">
          {file && (
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess} className="text-center">
              {numPages > 1 && Array.from(new Array(numPages), (el, index) => (
                <div
                  key={`page_${index + 1}`}
                  className="rounded-xl bg-white border-2 border-white p-2 inline-block justify-center items-center shadow"
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
          <h2 className="text-3xl font-bold mb-4">Split PDF</h2>
          <hr className="w-[20%] mt-2" />
          <label className="font-semibold mt-6 mb-6 text-center">
            Effortless PDF Splitting for Enhanced Workflow
          </label>
          {ranges.map((range, index) => (
            <div key={index} className="mb-4 flex flex-col md:flex-row gap-4 items-center">
              <div className="flex justify-center items-center gap-1">
                <img src={rangeImg} alt="" className="h-5 w-5" />
                <p className="block font-Poppins">Range {index + 1}</p>
              </div>
              <div className="flex items-center border-2 border-[#44B7BC] rounded-xl p-2 w-[230px] sm:w-fit">
                <span className="mr-2">From Page</span>
                <hr className="rotate-90 border-[1px] border-[#44B7BC] w-[60px]" />
                <input
                  type="number"
                  value={range.from}
                  onChange={(e) =>
                    handleRangeChange(index, "from", e.target.value)
                  }
                  className="border-none p-2 w-16 text-center bg-[#F5F5F5]"
                  min="1"
                  max={numPages - 1}
                  required
                  disabled={pdfSplit} // Disable input if PDF is split
                />
              </div>
 
              <div className="flex items-center border-2 border-[#44B7BC] rounded-xl p-2 w-[230px] sm:w-fit">
                <span className="mr-2">to</span>
                <hr className="rotate-90 border-[1px] border-[#44B7BC] w-[60px]" />
                <input
                  type="number"
                  value={range.to}
                  onChange={(e) =>
                    handleRangeChange(index, "to", e.target.value)
                  }
                  className="border-none p-2 w-16 text-center bg-[#F5F5F5]"
                  min="2"
                  max={numPages}
                  required
                  disabled={pdfSplit} // Disable input if PDF is split
                />
              </div>
              <div className="flex gap-2 justify-center items-center py-4 px-6 rounded-xl border-2 border-[#44B7BC] text-[#44B7BC] w-[230px] sm:w-fit">
                <FaCirclePlus />
                <button
                  onClick={addRange}
                  className="font-semibold"
                  disabled={pdfSplit} // Disable button if PDF is split
                >
                  Add Range
                </button>
              </div>
            </div>
          ))}
 
          {error && (
            <div className="text-red-600 font-semibold mt-4">{error}</div>
          )}
 
          <button
            onClick={splitPDF}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 flex justify-center py-2 sm:px-24 w-[250px] sm:w-fit rounded-full mt-7"
            disabled={!!error || pdfSplit} // Disable button if there's an error or PDF is split
          >
            Split PDF
          </button>
 
          {zipUrl && (
            <a
              href={zipUrl}
              download="splitted_pdfs.zip"
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold sm:py-2 py-2 sm:px-[65px] w-[250px] sm:w-fit text-center rounded-full mt-2"
            >
              Download All PDFs
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default SplitPage;
 
 
