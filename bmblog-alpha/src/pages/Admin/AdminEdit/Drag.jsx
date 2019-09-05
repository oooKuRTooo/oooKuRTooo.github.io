import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { blockParser } from "../../../blocks/index";
import { Icon } from 'antd';

export default function Drag(props) {

    const { item, index } = props;

    const deleteOnClick = () => {
        item.remove(item.id);
    }

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {blockParser({ ...props.item, isEditMode: true, remove: deleteOnClick })}
                </div>
            )}
        </Draggable>
    );
}
