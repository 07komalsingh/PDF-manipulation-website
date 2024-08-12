
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Document, Page } from "react-pdf";

const DraggablePage = ({ fileDataURL, pages = [], setPages }) => {
  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || destination.index === source.index) return;

    const reorderedPages = Array.from(pages);
    const [removed] = reorderedPages.splice(source.index, 1);
    reorderedPages.splice(destination.index, 0, removed);

    setPages(reorderedPages);
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
                <Draggable key={index} draggableId={pageNumber.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="m-2 p-4 border-2 border-white bg-white inline-block rounded-3xl cursor-pointer shadow-lg"
                      style={{ ...provided.draggableProps.style }}
                    >
                      {typeof pageNumber === "number" ? (
                        <Page pageNumber={pageNumber} width={250} />
                      ) : (
                        <div className="w-[250px] h-[323px] flex justify-center items-center bg-gray-200">
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
