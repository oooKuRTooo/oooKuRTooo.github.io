import React, { Component, Fragment } from 'react';
import Trumbowyg from 'react-trumbowyg';
import 'trumbowyg/dist/plugins/emoji/trumbowyg.emoji.min';
import 'trumbowyg/dist/plugins/pasteembed/trumbowyg.pasteembed.min';
import 'trumbowyg/dist/plugins/giphy/trumbowyg.giphy';
import 'trumbowyg/dist/plugins/fontfamily/trumbowyg.fontfamily.min';
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
        settings: {
            justifyClass: 'center'
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
        save(id, {
            text: e.target.innerHTML
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
    }

    render() {

        const wrapperClass = `text-wrapper ${this.state.isFocus ? 'focus' : ''} ${this.props.isEditMode ? 'edit' : ''} ${this.state.settings.justifyClass}`

        const readMode = () => {
            return (
                <div className={wrapperClass}>
                    <div className='text-block' dangerouslySetInnerHTML={{ __html: this.state.initData }}/>
                </div>
            );
        }

        const editMode = () => {
            return (
                <div className={wrapperClass}>
                    <div className='trumbowyg-dark' style={{width: '50%', padding: '20px 0'}}>
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
                    <Icon className='block-delete-btn' onClick={()=>{ this.props.remove()}} type="delete" />
                    <Icon className='block-settings-btn' onClick={()=>{this.setState({ wrapperSettingsVisible: true})}} type="setting" />
                    <Settings save={this.saveSettings} visible={this.state.wrapperSettingsVisible} close={()=>{this.setState({ wrapperSettingsVisible: false})}}/>
                </div>);
        }

        return (
            <Fragment>
                { this.props.isEditMode ? editMode() : readMode() }
            </Fragment>
        );
    }
}