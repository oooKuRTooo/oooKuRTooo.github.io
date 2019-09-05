import React, { useState } from 'react';
import UploadImages from '../components/Uploads/UploadImages';
import { Row, Col, Slider, Icon, Modal } from 'antd';
import StackGrid from "react-stack-grid";
import uniqid from 'uniqid';
import { blockParser, getBlocks } from "../blocks/index";

function TestItem(props) {

    const [visible, setVisible] = useState(false);

    const { style, addBlock, index, block } = props.data;

    return (
        <div className="test-item" style={style}>
            {blockParser(block)}
            <Icon onClick={()=>setVisible(true)} type="plus-circle" />
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={()=>setVisible(false)}
                onCancel={()=>setVisible(false)}
                >
                    {getBlocks().map(block => <Icon className='test-btn' onClick={()=>{addBlock(index, block.name)}} type={block.icon}></Icon>)}
            </Modal>
        </div>
    );
}

export default class Test extends React.Component {

    state = {

        items: [
            {
                index: 0,
                id: uniqid(),
                block: null,
                style: {minHeight: '100px', backgroundColor: '#fff'}
            },
            {
                index: 1,
                id: uniqid(),
                block: null,
                style: {minHeight: '100px', backgroundColor: '#fff'}
            }
        ],

        wrapperStyle: {
            
        },
    }

    
    addBlock = (index, blockName) => {

        let temp = this.state.items.concat();
        let tempCurrent = temp[index];

        tempCurrent.block = {
            id: uniqid(),
            name: blockName,
            data: null,
            save: ()=>{},
            remove: ()=>{},
            isEditMode: true
        };

        this.setState({ 
            items: temp
        });
    }

    render() {
        const { wrapperStyle, items } = this.state;
        const addBlock = this.addBlock;

        const itemList = items.map(item => <TestItem data={{...item, addBlock}}/>);

        return (
            <div className="lol">
                    <StackGrid
                        columnWidth={600}
                    >
                        {itemList}
                    </StackGrid>
            </div>
        );
    }
}