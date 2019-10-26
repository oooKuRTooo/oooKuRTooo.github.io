import React, { Component, Fragment } from 'react';
import './image.scss';
import Settings from './Settings';
import { Icon } from 'antd';

export default class Image extends Component {

    state = {
        initData: (this.props.data && this.props.data.text) || null,
        wrapperSettingsVisible: false,
        settings: {
            justifyClass:  (this.props.data && this.props.data.settings.justifyClass) || 'justify-center',
            imgWidthClass: (this.props.data && this.props.data.settings.imgWidthClass) || 'default-width',
            asset: (this.props.data && this.props.data.settings.asset) || { path: '', fullPath: '' },
            padding: this.props.data !== null ? this.props.data.settings.padding : 5,
            height: (this.props.data && this.props.data.settings.height) || 'auto',
        }
    }

    static getInfo() {
        return {
            name: 'image',
            icon: 'picture'
        }
    }

    saveSettings = settings => {
        this.setState({
            settings: {...this.state.settings, ...settings}
        });
        console.log('adaaada');
        console.log({...this.state.settings, ...settings});

    }

    onSave = () => {
        const { id, save } = this.props;
        save(id, {
            settings: this.state.settings
        });
    }

    render() {

        const { settings } = this.state;

        console.log(settings);

        const wrapperClass = `image-wrapper ${this.props.isEditMode ? 'edit' : ''} ${this.state.settings.justifyClass}`;
        const wrapperStyle = {
            padding: (`${settings.padding}vh 0`)
        }

        const settingsProps = {
            data: {...this.state.settings},
            save: this.saveSettings,
            onSave: this.onSave,
            visible: this.state.wrapperSettingsVisible,
            close: ()=>{this.setState({ wrapperSettingsVisible: false})}
        }

        const imgProps = {
            className: `block-image ${this.state.settings.imgWidthClass}`,
            src: this.state.settings.asset.fullPath,
            style: {
                height: settings.height || 'auto'
            }
        }

        const emptyImgProps = {
            className: `empty-image ${this.state.settings.imgWidthClass}`,
        }

        const readMode = () => {
            return (
                <div className={wrapperClass} style={wrapperStyle}>
                    { this.state.settings.asset.path ? <img {...imgProps}/> : <div {...emptyImgProps}/>}
                </div>
            );
        }

        const editMode = () => {
            return (
                <div className={wrapperClass} style={wrapperStyle}>
                    { this.state.settings.asset.path ? <img {...imgProps}/> : <div {...emptyImgProps}/>}
                    <Icon className='block-delete-btn' onClick={this.props.remove} type="delete" />
                    <Icon className='block-settings-btn' onClick={()=>{this.setState({ wrapperSettingsVisible: true})}} type="setting" />
                    <Settings {...settingsProps}/>
                </div>
            );
        }

        return (
            <Fragment>
                { this.props.isEditMode ? editMode() : readMode() }
            </Fragment>
        );
    }
}