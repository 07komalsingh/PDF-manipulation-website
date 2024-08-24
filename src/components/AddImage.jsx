import React, { useState, useRef } from "react";
import { DndContext } from "@dnd-kit/core";
import group from "../assets/img_gup.png";
import { pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import ValidatedFileInput from "./ValidatedFileInput";
import DraggableImage from "./ImagePopup";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function AddImageTool() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfPages, setPdfPages] = useState({});
  const [selectedImages, setSelectedImages] = useState({}); // Multiple images per page
  const [imagePositions, setImagePositions] = useState({}); // Store positions for multiple images
  const [imageSize, setImageSize] = useState({ width: 50, height: 50 });
  const [errorMessage, setErrorMessage] = useState(null);
  const pdfRef = useRef([]);

  const handleFileSelected = async (file) => {
    if (file) {
      setPdfFile(file);
      const pdfData = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
      const totalPages = pdf.numPages;

      const renderPage = async (pageIndex) => {
        const page = await pdf.getPage(pageIndex + 1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        return canvas.toDataURL();
      };

      const pages = await Promise.all(
        Array.from({ length: totalPages }, (_, i) => renderPage(i))
      );
      const pagesMap = pages.reduce((acc, dataUrl, index) => {
        acc[index] = dataUrl;
        return acc;
      }, {});

      setPdfPages(pagesMap);
    }
  };

  const handleImageSelection = (e, pageIndex) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (file.type !== "image/png") {
        alert("Please select a PNG file.");
        return;
      }

      const uniqueKey = `${file.name}-${Date.now()}-${Math.random()}`; // Generate a unique key for each image
      const newImage = {
        src: URL.createObjectURL(file),
        key: uniqueKey,
      };

      setSelectedImages((prevState) => ({
        ...prevState,
        [pageIndex]: [...(prevState[pageIndex] || []), newImage], // Add the new image with a unique key
      }));

      setImagePositions((prevState) => ({
        ...prevState,
        [pageIndex]: [...(prevState[pageIndex] || []), { x: 0, y: 0 }], // Set default position for the new image
      }));
    });

    // Reset the file input value to allow re-selection of the same file
    e.target.value = "";
  };

  const handleDragEnd = (event, pageIndex, imageIndex) => {
    const pageElement = pdfRef.current[pageIndex];
    const pageWidth = pageElement.offsetWidth;
    const pageHeight = pageElement.offsetHeight;

    const newX = Math.max(
      0,
      Math.min(
        imagePositions[pageIndex][imageIndex].x + event.delta.x,
        pageWidth - imageSize.width
      )
    );
    const newY = Math.max(
      0,
      Math.min(
        imagePositions[pageIndex][imageIndex].y + event.delta.y,
        pageHeight - imageSize.height
      )
    );

    setImagePositions((prevState) => {
      const updatedPositions = [...prevState[pageIndex]];
      updatedPositions[imageIndex] = { x: newX, y: newY };
      return {
        ...prevState,
        [pageIndex]: updatedPositions,
      };
    });
  };

  const downloadPdfWithImage = async () => {
    if (!pdfFile) return;
    const noImagesAdded = Object.values(selectedImages).every(
      (pageImages) => pageImages.length === 0
    );

    if (noImagesAdded) {
      setErrorMessage("No images have been added to the PDF.");
      return;
    }

    const pdfDoc = await PDFDocument.load(await pdfFile.arrayBuffer());

    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      if (selectedImages[i]) {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();

        const pageElement = pdfRef.current[i];
        const pageWidth = pageElement.offsetWidth;
        const pageHeight = pageElement.offsetHeight;

        for (let j = 0; j < selectedImages[i].length; j++) {
          const posXPercent = imagePositions[i][j]?.x / pageWidth;
          const posYPercent = imagePositions[i][j]?.y / pageHeight;
          const widthPercent = imageSize.width / pageWidth;
          const heightPercent = imageSize.height / pageHeight;

          const adjustedX = posXPercent * width;
          const adjustedY = posYPercent * height;
          const adjustedWidth = widthPercent * width;
          const adjustedHeight = heightPercent * height;

          const imageBytes = await fetch(selectedImages[i][j].src).then((res) =>
            res.arrayBuffer()
          );
          const image = await pdfDoc.embedPng(imageBytes);

          page.drawImage(image, {
            x: adjustedX,
            y: height - adjustedY - adjustedHeight,
            width: adjustedWidth,
            height: adjustedHeight,
          });
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "updated_pdf.pdf";
    link.click();
    setErrorMessage(null); // Clear any previous error message
  };

  return (
    <div className="flex flex-col items-center justify-center pb-14 bg-[#F5F5F5]">
      {!pdfFile ? (
        <div className="mb-1">
          <h2 className="text-4xl font-semibold mb-16 p-0 mt-4 text-center">
            Add Signature to PDF Pages
          </h2>
          <h2 className="text-2xl font-semibold font-poppins mb-5 text-center">
            Upload Document
          </h2>
          <div className="bg-[#E0F2F3B8] border-2 border-[#44B7BC] m-2 rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center">
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
                <ValidatedFileInput
                  onFilesSelected={handleFileSelected}
                  tool="/add-image"
                />
                <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                  <h1 className="text-2xl">Choose your PDF file here</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pdf-preview">
          {Object.keys(pdfPages).map((index) => (
            <div
              key={index}
              className="pdf-page"
              style={{ position: "relative", margin: 40, textAlign: "center" }}
            >
              <img
                src={pdfPages[index]}
                alt={`Page ${parseInt(index) + 1}`}
                ref={(el) => (pdfRef.current[index] = el)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageSelection(e, parseInt(index))}
                style={{ display: "none" }}
                id={`file-input-${index}`}
                key={`file-input-${index}`} // Ensure the input re-renders
                multiple
              />
              <label
                htmlFor={`file-input-${index}`}
                className={`bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 sm:px-[65px] px-14 rounded-full mt-2 inline-block`}
              >
                Choose Image
              </label>
              {selectedImages[index] &&
                selectedImages[index].map((image, imgIdx) => (
                  <DndContext
                    key={image.key}
                    onDragEnd={(event) =>
                      handleDragEnd(event, parseInt(index), imgIdx)
                    }
                  >
                    <DraggableImage
                      key={image.key} // Ensure each DraggableImage has a unique key
                      src={image.src}
                      position={imagePositions[index][imgIdx] || { x: 0, y: 0 }}
                      size={imageSize}
                    />
                  </DndContext>
                ))}
            </div>
          ))}
        </div>
      )}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        onClick={downloadPdfWithImage}
        className={`mt-4 ${
          !pdfFile ? "hidden" : ""
        } bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 sm:px-[65px] px-16 rounded-full`}
      >
        Download PDF
      </button>
    </div>
  );
}

export default AddImageTool;
