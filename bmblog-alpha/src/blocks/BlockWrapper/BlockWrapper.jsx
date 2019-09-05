import React, { useState } from 'react';
import StackGrid from "react-stack-grid";
import uniqid from 'uniqid';
import { blockParser, getBlocks } from "../index";
import { Icon, Modal, Button } from 'antd';
import Settings from './Settings';
import './block-wrapper.scss';

function TestItem(props) {

    const [visible, setVisible] = useState(false);

    const { style, addBlock, index, block, grid, isEditMode } = props.data;
    
    const onOk = () => {
        setVisible(false);
        grid.updateLayout();
    };

    const onCancel = () => {
        setVisible(false);
        grid.updateLayout();
    };

    return (
        <div className="block-wr-item" style={style}>
            {blockParser({...block, isEditMode})}
            {isEditMode &&
                <>
                    <Icon onClick={()=>setVisible(true)} type="plus-circle" />
                    <Modal
                        title="Basic Modal"
                        visible={visible}
                        onOk={onOk}
                        onCancel={onCancel}
                        >
                            {getBlocks().map(block => <Icon onClick={()=>{addBlock(index, block.name);}} type={block.icon}></Icon>)}
                    </Modal>
                </>
            }
        </div>
    );
}

export default class BlockWrapper extends React.Component {

    static getInfo() {
        return {
            name: 'blockwrapper',
            icon: 'appstore'
        }
    }

    state = this.props.data || {

        items: [
            {
                index: 0,
                id: uniqid(),
                block: null,
                style: {minHeight: '100px'}
            },
            {
                index: 1,
                id: uniqid(),
                block: null,
                style: {minHeight: '100px'}
            }
        ],
        settings: { },
        settingsVisible: false
    }

    gridRef = {};

    componentDidMount = () => {
        this.setState({
            settingsVisible: true
        });
    }

    componentDidUpdate = () => {
        console.log('didupdate!');
        this.gridRef.updateLayout && this.gridRef.updateLayout();
    }

    
    addBlock = (index, blockName) => {

        let temp = this.state.items.concat();
        let tempCurrent = temp[index];

        tempCurrent.block = {
            id: uniqid(),
            name: blockName,
            data: null,
            save: this.saveBlock,
            remove: ()=>{},
            isEditMode: true
        };

        this.setState({ 
            items: temp
        });

        this.gridRef.updateLayout()
    }

    saveBlock = (blockId, newData) => {

        this.gridRef.updateLayout && this.gridRef.updateLayout();
        const { id, save } = this.props;

        let tempItems = this.state.items.concat();
        let index;

        tempItems.forEach((item, i)=>{ 
            if (item.block && (item.block.id === blockId)) index = i;
        });

        const tempData = {...tempItems[index], block: {...tempItems[index].block, data: newData}};
        tempItems.splice(index, 1, tempData);

        this.setState({
            items: tempItems
        });

        save(id, {...this.state, items: tempItems});
    }

    saveSettings = data => {
        this.setState({
            settings: { ...this.state.settings, ...data }
        });
        const { id, save } = this.props;
        save(id, this.state);
    }

    openSettings = () => {
        this.setState({ settingsVisible: true });
    }

    closeSettings = () => {
        this.setState({ settingsVisible: false });
    }

    setColCount = count => {
        let items = [];
        items.length = count;
        for (let index = 0; index < items.length; index++) {
            items[index] = {
                index,
                id: uniqid(),
                block: null,
                style: {minHeight: '100px', backgroundColor: '#fff'}
            };
        }
        this.setState({ items });
    }

    render() {
        this.gridRef.updateLayout && this.gridRef.updateLayout();
        const { items, settings, settingsVisible } = this.state;
        const { isEditMode } = this.props;
        const addBlock = this.addBlock;

        const itemList = items.map(item => <TestItem data={{...item, isEditMode, addBlock, grid: this.gridRef}}/>);

        const settingsProps = {
            defaultValue: settings,
            visible: settingsVisible,
            save: this.saveSettings,
            close: this.closeSettings,
            setColCount: this.setColCount
        }

        const stackGridProps = {
            columnWidth: settings.columnWidth || 600,
            gutterWidth: settings.gutterWidth || 0,
            gutterHeight: settings.gutterHeight || 0,
        }

        const wrapperProps = {
            className: `block-wrapper ${isEditMode ? 'edit': null} ${settingsVisible ? 'edit-active': null}`
        }

        const readMode = () => {
            return (
                <div {...wrapperProps}>
                    <StackGrid
                        {...stackGridProps}
                        gridRef={grid => this.gridRef = grid}
                    >
                        {itemList}
                    </StackGrid>
                </div>
            );
        }

        const editMode = () => {
            return (
                <div {...wrapperProps}>
                    <StackGrid
                        {...stackGridProps}
                        gridRef={grid => this.gridRef = grid}
                    >
                        {itemList}
                    </StackGrid>
                    <Settings {...settingsProps}/>
                    <Icon onClick={this.openSettings} type='setting'></Icon>
                    <Icon onClick={this.props.remove} type='delete'></Icon>
                </div>
            );
        }

        return (
            <>
                { this.props.isEditMode ? editMode() : readMode() }
            </>
        );
    }
}