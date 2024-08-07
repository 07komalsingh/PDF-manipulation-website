import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import group from "../assets/img_gup.png";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import ValidatedFileInput from "./ValidatedFileInput";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Reorder = () => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pages, setPages] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileSelected = (selectedFile) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      setFile(selectedFile);
      setFileDataURL(e.target.result);

      try {
        const fileArrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(fileArrayBuffer);
        const numPages = pdfDoc.getPageCount();

        if (numPages > 10) {
          toastr.error("Selected PDF has more than 10 pages. Please select a PDF with 10 pages or fewer.", "Error");
          setFile(null);
          setFileDataURL(null);
          setNumPages(0);
          setPages([]);
          return;
        }

        setNumPages(numPages);

        // Create an array of pages
        const pageArray = Array.from({ length: numPages }, (_, index) => index + 1);
        setPages(pageArray);
      } catch (err) {
        console.error("Failed to load PDF:", err);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleReorder = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    try {
      const fileArrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileArrayBuffer);

      // Create a new PDF document
      const newPdfDoc = await PDFDocument.create();

      for (let pageIndex of pages) {
        const [page] = await newPdfDoc.copyPages(pdfDoc, [pageIndex - 1]);
        newPdfDoc.addPage(page);
      }

      const pdfBytes = await newPdfDoc.save();
      const url = window.URL.createObjectURL(new Blob([pdfBytes]));
      setDownloadUrl(url);

      toastr.success("PDF reordered successfully!", "Success");
    } catch (err) {
      console.error("Failed to reorder PDF:", err);
      toastr.error("Failed to reorder PDF.", "Error");
    }
  };

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const reorderedPages = Array.from(pages);
    const [removed] = reorderedPages.splice(source.index, 1);
    reorderedPages.splice(destination.index, 0, removed);

    setPages(reorderedPages);
  };

  return (
    <div className="flex flex-col items-center justify-center pb-14 bg-[#F5F5F5]">
      {!file ? (
        <div className="mb-4 m-2">
          <h2 className="text-4xl font-semibold mb-16 p-5 text-center">
            Reorder PDF Pages
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
                <ValidatedFileInput onFilesSelected={handleFileSelected} />
                <div className="flex flex-col text-gray-600 mt-[1rem] font-poppins">
                  <h1 className="text-2xl">Choose your PDF file here</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center sm:mb-[150px] mb-[35px]">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-full flex flex-wrap justify-center"
                >
                  <Document
                    file={fileDataURL}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  >
                    {pages.map((pageNumber, index) => (
                      <Draggable
                        key={pageNumber}
                        draggableId={pageNumber.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="m-2 p-4 border-2 border-white bg-white inline-block rounded-3xl cursor-pointer shadow-lg"
                            style={{ ...provided.draggableProps.style }}
                          >
                            <Page pageNumber={pageNumber} width={250} />
                            <div className="text-center mt-2 text-lg">
                              {pageNumber}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </Document>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button
            onClick={handleReorder}
            className="bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-24 rounded-full mt-4"
          >
            Reorder
          </button>
          {downloadUrl && (
            <a
              href={downloadUrl}
              download="reordered_file.pdf"
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

export default Reorder;

