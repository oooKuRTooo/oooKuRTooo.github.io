import React from "react";
import Drop from "./Drop";
import { DragDropContext } from "react-beautiful-dnd";

export default function Layer(props) {

    const onDragEnd = (result) => {
        props.onDragEnd({...result, index: props.index});
    }
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Drop className={`layer-${props.index} ${props.isActive ? 'layer-active' : 'layer-disable'}`} items={props.items} />
        </DragDropContext>
    );
}