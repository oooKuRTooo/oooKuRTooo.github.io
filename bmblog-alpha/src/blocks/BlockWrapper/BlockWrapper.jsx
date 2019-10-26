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
    }

    return (
        <div className="block-wr-item" style={style}>
            {block && blockParser({...block, isEditMode})}
            {!block && <div>Empty</div>}
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

class BlockWrapper extends React.Component {

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
        if (!this.props.data) this.setState({
            settingsVisible: true
        });
        window.addEventListener("resize", this.gridRef.updateLayout || null, false);
        this.state.items.forEach(item => {
            item.block && (item.block.save = this.saveBlock);
        });
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

    getDefaultWidth = () => {
        if (window.matchMedia("(min-width: 1600px)").matches) return 50;
        if (window.matchMedia("(min-width: 1200px)").matches) return 50;
        if (window.matchMedia("(min-width: 992px)").matches) return 60;
        if (window.matchMedia("(min-width: 768px)").matches) return 70;
        if (window.matchMedia("(min-width: 576px)").matches) return 80;
        if (window.matchMedia("(max-width: 575.98px)").matches) return 85;
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
            setColCount: this.setColCount,
            data: {
                ...settings,
                colCount: itemList.length
            }
        }

        const stackGridProps = {
            columnWidth: window.matchMedia("(max-width: 500px)").matches ? '100%' : ((settings.columnWidth && `${(100 / settings.columnWidth).toFixed(2)}%`) || '50%'),
            gutterWidth: settings.gutterWidth || 0,
            gutterHeight: settings.gutterHeight || 0,
            style: {
                width: `${this.getDefaultWidth() + (settings.widthOffset || 0)}%`
            }
        }

        const wrapperProps = {
            className: `block-wrapper ${isEditMode ? 'edit': null} ${settingsVisible ? 'edit-active': null}`,
            style: {
                padding: (settings.padding && `${settings.padding}vh 0`) || '5vh 0',
            }
        }

        const readMode = () => {
            return (
                <div {...wrapperProps}>
                    <StackGrid
                        {...stackGridProps}
                        gridRef={grid => this.gridRef = grid}
                        className='stack-grid'
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
                        className='stack-grid'
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

export default BlockWrapper;