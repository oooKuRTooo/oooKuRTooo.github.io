import React, { Component } from "react";
import uniqid from 'uniqid';
import { Menu, Dropdown, Button, Icon } from 'antd';
import { getBlocks } from '../../../blocks/index';
import convertToLatin from 'cyrillic-to-latin';
import { Link } from 'react-router-dom';
import Layer from './Layer';
import ToolHud from './ToolHud';
import Settings from './Settings';
import LayerSettings from './LayerSettings';
import './admin-edit.scss';

// for react-beautiful-dnd
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export default class EditPost extends Component {

    state = (this.props.data && {...this.props.data, activeLayer: 2}) || {
        title: 'Title',
        category: '',
        tags: [],
        slug: '',
        preview: { path: '', fullPath: '' },
        backview: { path: '', fullPath: '' },
        comments: null,
        layers: [
            { items: [], settings: { opacity: 1 , speed: 0 } },
            { items: [], settings: { opacity: 1 , speed: 0 } },
            { items: [], settings: { opacity: 1 , speed: 0 } }
        ],
        activeLayer: 2,
        settingsVisible: true,
        layerSettingsVisible: false
    };

    componentDidMount() {
        const tempLayers = this.state.layers;
        tempLayers.forEach(layer => {
            layer.items.forEach(item => {
                item.save = this.saveBlock;
                item.remove = this.removeBlock;
            });
        });
    }

    // for react-beautiful-dnd
    onDragEnd = (result) => {

        if (!result.destination) {
            return;
        }

        const items = reorder(
            this.state.layers[result.index].items,
            result.source.index,
            result.destination.index
        );

        let temp = this.state.layers.concat();
        temp[result.index] = { ...temp[result.index] , items };

        this.setState({
            layers: temp
        });
    }

    addBlock = blockName => {

        let tempLayers = this.state.layers.concat();
        let tempActiveLayer = tempLayers[this.state.activeLayer];

        tempActiveLayer.items = tempActiveLayer.items.concat([{
            id: uniqid(),
            name: blockName,
            data: null,
            save: this.saveBlock,
            remove: this.removeBlock
        }]);

        this.setState({ 
            layers: tempLayers
        })
    }

    saveBlock = (id, newData) => {

        console.log(newData);

        let tempLayers = this.state.layers.concat();
        let tempActiveLayer = tempLayers[this.state.activeLayer];
        let index;

        tempActiveLayer.items.forEach((item, i)=>{
            if (item.id === id) index = i;
        });

        const tempData = {...tempActiveLayer.items[index], data: {...tempActiveLayer.items[index].data, ...newData}};
        tempActiveLayer.items.splice(index, 1, tempData);

        this.setState({
            layers: tempLayers
        });
    }

    save = () => {
        const slug = convertToLatin(this.state.title).replace(/ /ig, '-').toLowerCase();
        this.props.savePost({...this.state, slug}, ()=>{
            this.props.updatePost(slug);
        });
    }

    removeBlock = id => {

        let tempLayers = this.state.layers.concat();
        let tempActiveLayer = tempLayers[this.state.activeLayer];
        let index;

        tempActiveLayer.items.forEach((item, i)=>{
            if (item.id === id) index = i;
        });

        tempActiveLayer.items.splice(index, 1);

        this.setState({
            layers: tempLayers
        });
    }

    changeLayer = index => {
        this.setState({
            activeLayer: index
        });
    }

    setSettingsVisible = bool => {
        this.setState({
            settingsVisible: bool
        });
    }

    setLayerSettingsVisible = bool => {
        this.setState({
            layerSettingsVisible: bool
        });
    }

    settingsSave = data => {
        this.setState({...this.state, ...data});
    }

    layerSettingsSave = index => data => {
        let tempLayers = this.state.layers.concat();
        let tempActiveLayer = tempLayers[index];

        tempActiveLayer.settings = {...tempActiveLayer.settings, ...data};

        this.setState({
            layers: tempLayers
        });
    }

    render() {
        console.log(this.state.layers[2]);

        const { activeLayer, settingsVisible, layerSettingsVisible } = this.state;

        const toolHudProps = {
            changeLayer: this.changeLayer,
            addBlock: this.addBlock,
            savePost: this.save,
            openSettings: () => this.setSettingsVisible(true),
            openLayerSettings: () => this.setLayerSettingsVisible(true)
        }

        const settingsProps = {
            visible: settingsVisible,
            close: () => this.setSettingsVisible(false),
            save: this.settingsSave,
            initData: this.state
        }
        const layerSettingsProps = {
            visible: layerSettingsVisible,
            close: () => this.setLayerSettingsVisible(false),
            save: this.layerSettingsSave(this.state.activeLayer)
        }

        return (
            <div className='edit-post'>
                <div style={{ opacity: this.state.layers[0].settings.opacity }}>
                    <Layer 
                        index={0} 
                        onDragEnd={this.onDragEnd} 
                        items={this.state.layers[0].items}
                        isActive={activeLayer === 0}
                    />
                </div>
                <div style={{ opacity: this.state.layers[1].settings.opacity }}>
                        <Layer 
                            index={1} 
                            onDragEnd={this.onDragEnd} 
                            items={this.state.layers[1].items}
                            isActive={activeLayer === 1}
                        />
                </div>
                <div style={{ opacity: this.state.layers[2].settings.opacity }}>
                    <Layer 
                        index={2} 
                        onDragEnd={this.onDragEnd} 
                        items={this.state.layers[2].items}
                        isActive={activeLayer === 2}
                    />
                </div>
                <ToolHud {...toolHudProps}/>
                <Settings {...settingsProps} />
                <LayerSettings {...layerSettingsProps} />
            </div>
        );
    }
}