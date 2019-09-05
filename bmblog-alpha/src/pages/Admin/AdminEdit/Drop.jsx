import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Drag from "./Drag";

export default function Drop(props) {

    const { items, className } = props;
    
    return (
        <Droppable droppableId="droppable">
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className = {className}
                >
                    {items.map((item, index) => (
                        <Drag key={item.id} item={item} index={index}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}