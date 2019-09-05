import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Drag from "./Drag";

export default function Drop(props) {

    const { items, remove } = props;

    return (
        <Droppable droppableId='droppable'>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {items.map((item, index) => (
                        <Drag key={item._id} item={item} index={index} remove={remove}/>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}
