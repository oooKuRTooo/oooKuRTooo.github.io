import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from 'antd';
import { Link } from 'react-router-dom';

export default function Drag(props) {

    const { item, index, remove } = props;

    const bodyStyle = { display: 'none' };

    return (
        <Draggable key={item._id} draggableId={item._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="item">
                        <Card 
                            title={item.title}
                            bodyStyle={bodyStyle}
                            extra={<div><Link Link to={`/admin/edit/${item.slug}`}>Edit</Link> | <a onClick={()=>{remove(item._id)}} href="#">Delete</a></div>}
                        >
                        </Card>
                    </div>
                </div>
            )}
        </Draggable>
    );
}