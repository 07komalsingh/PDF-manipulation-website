import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Document, Page } from "react-pdf";

const DraggablePage = ({ fileDataURL, pages = [], setPages }) => {
  const [pageSizes, setPageSizes] = useState({});

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const reorderedPages = Array.from(pages);
    const [removed] = reorderedPages.splice(source.index, 1);
    reorderedPages.splice(destination.index, 0, removed);
    setPages(reorderedPages);
  };

  const handleLoadSuccess = (pageNumber, { width, height }) => {
    setPageSizes((prevSizes) => ({
      ...prevSizes,
      [pageNumber]: { width, height },
    }));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full flex flex-wrap justify-center"
          >
            <Document file={fileDataURL}>
              {pages.map((pageNumber, index) => (
                <Draggable
                  key={pageNumber.toString()}
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
                      {typeof pageNumber === "number" ? (
                        <Page
                          pageNumber={pageNumber}
                          onLoadSuccess={(page) => handleLoadSuccess(pageNumber, page)}
                          width={pageSizes[pageNumber]?.width || 200}
                          height={pageSizes[pageNumber]?.height || 300}
                        />
                      ) : (
                        <div
                          className="w-[250px] h-[323px] flex justify-center items-center bg-gray-200"
                          style={{
                            width: pageSizes[1]?.width || 200, // Default size if not available
                            height: pageSizes[1]?.height || 300,
                          }}
                        >
                          Blank Page
                        </div>
                      )}
                      <div className="text-center mt-2 text-lg">
                        {typeof pageNumber === "number" ? `Page ${pageNumber}` : "Blank Page"}
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
  );
};

export default DraggablePage;
