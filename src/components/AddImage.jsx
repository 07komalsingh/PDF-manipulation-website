import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { pdfjs } from "react-pdf";
import ValidatedFileInput from "./ValidatedFileInput";
import { Document, Page } from "react-pdf";
import group from "../assets/img_gup.png";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
const AddImage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfDataURL, setPdfDataURL] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [pdfPreview, setPdfPreview] = useState([]);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 50 });
  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [pageRange, setPageRange] = useState({ from: 1, to: 1 });

  const handlePdfSelected = async (selectedFile) => {
    const fileDataURL = URL.createObjectURL(selectedFile);
    setPdfFile(selectedFile);
    setPdfDataURL(fileDataURL);

    try {
      const fileArrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);
      const numPages = pdfDoc.getPageCount();

      const previewPages = Array.from({ length: numPages }, (_, index) => index + 1);
      setPdfPreview(previewPages);
      setPageRange({ from: 1, to: numPages });
    } catch (err) {
      console.error("Failed to load PDF:", err);
    }
  };

  const handleImageSelected = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleAddImage = async () => {
    if (!pdfFile || !imageFile) {
      alert("Please upload both a PDF and an image.");
      return;
    }

    try {
      const pdfArrayBuffer = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfArrayBuffer);

      const imageArrayBuffer = await imageFile.arrayBuffer();
      const embeddedImage = await pdfDoc.embedPng(imageArrayBuffer);

      const pages = pdfDoc.getPages();
      for (let i = pageRange.from - 1; i < pageRange.to; i++) {
        const page = pages[i];
        page.drawImage(embeddedImage, {
          x: imagePosition.x,
          y: page.getHeight() - imagePosition.y - imageSize.height,
          width: imageSize.width,
          height: imageSize.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      alert("Image added successfully!");
    } catch (err) {
      console.error("Failed to add image to PDF:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pb-14 bg-[#F5F5F5]">
      {!pdfFile ? (
        <div className="mb-4 m-2">
          <h2 className="text-4xl font-semibold mb-16 p-5 text-center">
            Add Image to PDF
          </h2>
          <h2 className="text-2xl font-semibold font-poppins mb-7 text-center">
            Upload PDF Document
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
                <ValidatedFileInput onFilesSelected={handlePdfSelected} />
                <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                  <h1 className="text-2xl">Choose your PDF file here</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center sm:mb-[150px] mb-[35px]">
          {pdfPreview.length > 0 && (
            <div className="mt-4 inline-block justify-center">
              <Document file={pdfDataURL}>
                {pdfPreview.map((pageNumber) => (
                  <div key={pageNumber} className="m-2 p-4 border-2 border-white bg-white inline-block rounded-3xl">
                    <Page pageNumber={pageNumber} width={250} />
                  </div>
                ))}
              </Document>
            </div>
          )}
          <div className="mb-4">
            <h2 className="text-xl font-semibold font-poppins mb-3 text-center">
              Set Image Position (x, y)
            </h2>
            <input
              type="number"
              value={imagePosition.x}
              onChange={(e) => setImagePosition({ ...imagePosition, x: +e.target.value })}
              placeholder="X position"
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="number"
              value={imagePosition.y}
              onChange={(e) => setImagePosition({ ...imagePosition, y: +e.target.value })}
              placeholder="Y position"
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold font-poppins mb-3 text-center">
              Set Image Size (width, height)
            </h2>
            <input
              type="number"
              value={imageSize.width}
              onChange={(e) => setImageSize({ ...imageSize, width: +e.target.value })}
              placeholder="Width"
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="number"
              value={imageSize.height}
              onChange={(e) => setImageSize({ ...imageSize, height: +e.target.value })}
              placeholder="Height"
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold font-poppins mb-3 text-center">
              Set Page Range (from, to)
            </h2>
            <input
              type="number"
              value={pageRange.from}
              onChange={(e) => setPageRange({ ...pageRange, from: +e.target.value })}
              placeholder="From page"
              min="1"
              max={pdfPreview.length}
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="number"
              value={pageRange.to}
              onChange={(e) => setPageRange({ ...pageRange, to: +e.target.value })}
              placeholder="To page"
              min="1"
              max={pdfPreview.length}
              className="border rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold font-poppins mb-7 text-center">
              Upload Image to Add to PDF
            </h2>
            <input type="file" accept="image/*" onChange={handleImageSelected} />
          </div>
          <button
            onClick={handleAddImage}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-24 rounded-full mt-4"
          >
            Add Image
          </button>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="updated_file.pdf"
              className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 sm:px-[65px] px-16 rounded-full mt-4"
            >
              Download PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default AddImage;

