import React, { Component, Fragment } from 'react';
import Trumbowyg from 'react-trumbowyg';
import 'trumbowyg/dist/plugins/emoji/trumbowyg.emoji.min';
import 'trumbowyg/dist/plugins/pasteembed/trumbowyg.pasteembed.min';
import 'trumbowyg/dist/plugins/fontfamily/trumbowyg.fontfamily';
import 'trumbowyg/dist/plugins/giphy/trumbowyg.giphy';
import 'trumbowyg/dist/plugins/emoji/ui/trumbowyg.emoji.css';
import 'trumbowyg/dist/plugins/giphy/ui/trumbowyg.giphy.min.css';
import 'trumbowyg/dist/ui/sass/trumbowyg.scss';
import './text.scss';
import uniqid from 'uniqid';
import Settings from './Settings';
import { Icon } from 'antd';
import { Radio } from 'antd';

export default class Text extends Component {

    state = {
        text: 'text',
        isFocus: false,
        btns: [
            ['formatting'],
            'btnGrp-semantic',
            ['fontfamily'],
            ['link'],
            ['emoji'],
            ['giphy'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull']
        ],
        disabled: false,
        initData: (this.props.data && this.props.data.text) || null,
        wrapperSettingsVisible: false,
        settings: (this.props.data && this.props.data.settings) || {
            justifyClass: 'center',
        }
    }

    static getInfo() {
        return {
            name: 'text',
            icon: 'font-size'
        }
    }

    onBlur = e => {
        const { id, save } = this.props;
        const { settings } = this.state;
        save(id, {
            text: e.target.innerHTML,
            settings
        });
        this.setState({ isFocus: false });
    }

    onRefrash = () => {
        this.setState({
            disabled: true
        });
        setTimeout(()=>{
            this.setState({
                disabled: false
            });
        }, 1000);
    }

    saveSettings = settings => {
        this.setState({
            settings: {...this.state.settings, ...settings}
        });
        const { id, save } = this.props;
        save(id, {
            settings: {...this.state.settings, ...settings}
        });
    }

    render() {

        const { settings, isFocus } = this.state;

        const wrapperProps = {
            className: `text-wrapper ${isFocus ? 'focus' : ''} ${this.props.isEditMode ? 'edit' : ''} ${settings.justifyClass}`,
            style: {
                padding: (settings.padding && `${settings.padding}vh 0`) || '5vh 0'
            }
        }

        const settingsProps = {
            save: this.saveSettings,
            visible: this.state.wrapperSettingsVisible,
            close: ()=>{this.setState({ wrapperSettingsVisible: false})},
            data: {...settings}
        }

        const readMode = () => {
            return (
                <div {...wrapperProps}>
                    <div className='text-block' dangerouslySetInnerHTML={{ __html: this.state.initData }}/>
                </div>
            );
        }

        const editMode = () => {
            return (
                <div {...wrapperProps}>
                    <div className='trumbowyg-dark'>
                        {!this.state.disabled ?
                        <Trumbowyg 
                            placeholder='Enter the text here'
                            data={ this.state.initData }
                            onFocus={()=>{this.setState({ isFocus: true })}}
                            onBlur={this.onBlur}
                            buttons={ this.state.btns}
                            plugins={
                                {
                                    giphy: {
                                        apiKey: 'x2vNzZiicyVDtCyEVULl6yCL8ADKoubm'
                                    },
                                    fontfamily: {
                                        fontList: [
                                            {name: 'Arial', family: 'Arial, Helvetica, sans-serif'},
                                            {name: 'Open Sans', family: '\'Open Sans\', sans-serif'},
                                            {name: 'Avenir Next Cyr', family: 'Avenir Next Cyr, sans-serif'}
                                        ]
                                    }
                                }
                            }
                            onChange={this.onContentStateChange}
                            id={uniqid()}
                            className='text-block'
                            removeformatPasted = {true}
                            disabled={this.state.disabled}
                        /> : null }
                    </div>
                    <Icon className='block-delete-btn' onClick={()=>{ if (!this.state.isFocus) this.props.remove()}} type="delete" />
                    <Icon className='block-settings-btn' onClick={()=>{this.setState({ wrapperSettingsVisible: true})}} type="setting" />
                    <Settings {...settingsProps}/>
                </div>);
        }

        return (
            <Fragment>
                { this.props.isEditMode ? editMode() : readMode() }
            </Fragment>
        );
    }
}