
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Document, Page } from "react-pdf";

const DraggablePage = ({ fileDataURL, pages, setPages }) => {
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
      <Droppable droppableId="droppable" direction="horizontal" >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="text-center"
          >
            <Document file={fileDataURL}>
              {pages.map((pageNumber, index) => (
                <Draggable key={pageNumber} draggableId={pageNumber.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="m-3 p-4 border-2 border-white bg-white inline-block rounded-3xl cursor-pointer shadow-lg"
                      style={{ ...provided.draggableProps.style }}
                    >
                      <Page pageNumber={pageNumber} width={200} />
                      <div className="text-center mt-2 text-lg">{pageNumber}</div>
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
