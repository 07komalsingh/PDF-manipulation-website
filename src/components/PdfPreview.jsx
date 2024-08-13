import React from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const PdfPreview = ({ pdfDataURL, pdfPreviewPages }) => {
  return (
    <div className="mt-4 inline-block justify-center">
      <Document file={pdfDataURL}>
        {pdfPreviewPages.map((pageNumber) => (
          <div
            key={pageNumber}
            className="m-2 p-4 border-2 border-white bg-white inline-block rounded-3xl"
          >
            <Page pageNumber={pageNumber} width={250} />
          </div>
        ))}
      </Document>
    </div>
  );
};


export default PdfPreview;

