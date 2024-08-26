import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { PDFDocument } from "pdf-lib";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import group from "../assets/img_gup.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import FileInput from './FileInput';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Set up pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

toastr.options = {
  closeButton: true,
  progressBar: true,
  timeOut: "3000",
  extendedTimeOut: "1000",
  preventDuplicates: true,
  newestOnTop: true,
};

const Adding = () => {
  window. scrollTo({ top:0, behavior: 'auto' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileURLs, setFileURLs] = useState([]);
  const [mergedPDFUrl, setMergedPDFUrl] = useState(null);

  const onFilesSelected = (files) => {
    if (selectedFiles.length + files.length > 5) {
      toastr.warning("You can only select up to 5 PDF files.", "Warning");
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setFileURLs((prevUrls) => [...prevUrls, ...newUrls]);
    setMergedPDFUrl(null); // Clear merged PDF URL when new files are selected
  };

  const handleRemoveFile = (index) => {
    const newSelectedFiles = [...selectedFiles];
    const newFileURLs = [...fileURLs];

    newSelectedFiles.splice(index, 1);
    newFileURLs.splice(index, 1);

    setSelectedFiles(newSelectedFiles);
    setFileURLs(newFileURLs);
  };

  const handleMerge = async () => {
    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of selectedFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const mergedPdfBlob = new Blob([mergedPdfFile], {
        type: "application/pdf",
      });
      const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);
      setMergedPDFUrl(mergedPdfUrl);

      toastr.success("PDF merged successfully!", "Success");
    } catch (error) {
      toastr.error("Failed to merge PDFs.", "Error");
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(selectedFiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedFiles(items);

    const urlItems = Array.from(fileURLs);
    const [reorderedUrlItem] = urlItems.splice(result.source.index, 1);
    urlItems.splice(result.destination.index, 0, reorderedUrlItem);

    setFileURLs(urlItems);
  };

  return (
    <div className="flex flex-col items-center mt-5 pb-14 bg-[#F5F5F5]">
      {selectedFiles.length < 1 ? (
        <div className="mb-4">
          <h2 className="text-4xl font-semibold mb-16 text-center">Merge PDF Files</h2>
          <h2 className="text-2xl font-semibold font-poppins mb-5 text-center">Upload Document</h2>
          <div className="bg-gradient-to-r bg-[#E0F2F3B8] border-2 border-[#44B7BC] text-white rounded-2xl xl:w-[70rem] lg:w-[50rem] px-3 md:w-[35rem] h-[23rem] flex justify-center items-center shadow-lg">
            <div>
              <h1 className="text-gray-800 font-poppins text-2xl font-normal text-center">
                Upload PDF Attachments
              </h1>
              <div className="flex flex-col items-center">
                <div>
                <img src={group} 
                alt="PDF Icon" 
                className="h-20 mt-4 w-full md:w-auto" 
                />
                </div>
                <FileInput onFilesSelected={onFilesSelected} useIcon={false} className="rounded-full mt-4" />
                <div className="flex flex-col text-gray-600 mt-4 font-poppins">
                  <h1 className="text-2xl">Choose your PDF files here</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center sm:mb-3 min-h-[550px]">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="pdfs" direction="horizontal">
              {(provided) => (
                <div
                  className="flex flex-wrap justify-center"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {fileURLs.map((url, index) => (
                    <Draggable key={url} draggableId={url} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative mb-8 mx-2 bg-white shadow-md rounded-lg p-4"
                        >
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="absolute top-0 right-0 text-red-500 hover:text-red-700"
                          >
                            <RiDeleteBin5Fill className="w-5 h-5" />
                          </button>
                          <Document file={url}>
                            <Page pageNumber={1} width={250} />
                          </Document>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  {selectedFiles.length < 5 && (
                    <div className="mb-8 mx-2 bg-white shadow-md rounded-lg py-8 px-9 flex items-center justify-center sm:w-[250px] w-[280px]">
                      <FileInput onFilesSelected={onFilesSelected} useIcon={true} />
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex items-center sm:mt-4">
            <button
              className={`bg-gradient-to-r bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-24 rounded-full shadow-md transition duration-300 ${
                selectedFiles.length < 2 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleMerge}
              disabled={selectedFiles.length < 2}
            >
              Merge Files
            </button>
          </div>
          {mergedPDFUrl && (
            <a
              href={mergedPDFUrl}
              className="bg-gradient-to-r bg-[#44B7BC] hover:bg-[#30aab1] text-white font-semibold py-2 px-20 rounded-full mt-4 shadow-md transition duration-300"
              download="merged.pdf"
            >
              Download PDF
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default Adding;

