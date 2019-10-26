import React, { Component, Fragment } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from 'antd';
import Settings from './Settings';
import "./slick-slider.scss";

export default class SlickSlider extends Component {

    state = {        
        initData: (this.props.data && this.props.data.text) || null,
        wrapperSettingsVisible: false,
        settings: {
            assets: (this.props.data && this.props.data.settings.assets) || [],
            padding: (this.props.data && this.props.data.settings.paddingTop) || '5vh 0'
        }
    }

    static getInfo() {
        return {
            name: 'slickslider',
            icon: 'pic-center'
        }
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

        const settings = {
            centerPadding: "60px",
            slidesToShow: this.state.settings.assets.length < 3 ? this.state.settings.assets.length : 3 ,
            speed: 500,
            infinite: false,
            responsive: [
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 2,
                  }
                }
            ]
        };

        const slideList = this.state.settings.assets.map(asset => <img style={{ margin: '20px 0'}} src={asset.fullPath}/>);

        const wrapperProps = {
            className: `block-slick-slider ${this.props.isEditMode ? 'edit' : ''} ${this.state.settings.justifyClass}`,
            style: {
                padding: this.state.settings.padding
            }
        }

        const readMode = () => {
            return (
                <div {...wrapperProps}>
                    <Slider {...settings}>
                        {slideList.length > 0 ? slideList : <div className="empty-slick-slide"></div>}
                    </Slider>
                </div>
            );
        }

        const editMode = () => {
            return (
                <div {...wrapperProps}>
                    <Slider {...settings}>
                        {slideList.length > 0 ? slideList : <div className="empty-slick-slide"></div>}
                    </Slider>
                    <Icon className='block-delete-btn' onClick={this.props.remove} type="delete" />
                    <Icon className='block-settings-btn' onClick={()=>{this.setState({ wrapperSettingsVisible: true})}} type="setting" />
                    <Settings initData={this.state.settings} save={this.saveSettings} visible={this.state.wrapperSettingsVisible} close={()=>{this.setState({ wrapperSettingsVisible: false})}}/>
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