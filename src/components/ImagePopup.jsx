import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function DraggableImage({ src, position, size }) {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: 'draggable-image',
    });

    return (
        <img
            ref={setNodeRef}
            src={src}
            className="draggable-image"
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                cursor: 'move',
            }}
            {...listeners}
            {...attributes}
        />
    );
}

export default DraggableImage;
