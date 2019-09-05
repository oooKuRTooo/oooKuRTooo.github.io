import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, Input, Switch, Slider, Radio, InputNumber, Checkbox } from 'antd';
import UploadImage from '../../components/Uploads/UploadImage';

export default function(props) {

    const { visible, close, onSave, defaultValue } = props;

    console.log(props);

    const justifyChange = e => {
        props.save({
            justifyClass: e.target.value
        });
    }

    const widthChange = e => {
        props.save({
            imgWidthClass: e.target.value
        });
    }

    const paddingTopChange = value => {
        props.save({
            paddingTop: value
        });
    }

    const assetSave = asset => {
        props.save({
            asset: asset
        });
    }

    const closeDrawer = () => {
        onSave();
        close();
    }

    const heightChange = e => {
        props.save({
            height: e
        });
    }
    
    return (
        <Drawer
          title="Block Settings"
          placement="bottom"
          closable={false}
          onClose={closeDrawer}
          visible={visible}
          className='image-settings'
        >
            <div className="image-settings">
                <div className="col">
                    <h3 style={{marginTop: 0}}>Justify</h3>
                    <Radio.Group onChange={justifyChange} defaultValue="a">
                        <Radio.Button value="justify-center">Center</Radio.Button>
                        <Radio.Button value="justify-left">Left</Radio.Button>
                        <Radio.Button value="justify-right">Right</Radio.Button>
                    </Radio.Group>
                    <h3>Width</h3>
                    <Radio.Group onChange={widthChange} defaultValue="a">
                        <Radio.Button value="default-width">Default</Radio.Button>
                        <Radio.Button value="full-width">Full Width</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="col">
                    <h3 style={{marginTop: 0}}>Image Path</h3>
                    <UploadImage defaultValue={defaultValue} save={assetSave}/>
                </div>
                <div className="col">
                    <h3 style={{marginTop: 0}}>Padding Top</h3>
                    <InputNumber
                        defaultValue={100}
                        min={0}
                        max={100}
                        formatter={value => `${value}%`}
                        parser={value => value}
                        onChange={paddingTopChange}
                    />
                </div>
                <div className="col">
                    <h3 style={{marginTop: 0}}>Height</h3>
                    <Checkbox onChange={()=>{}}>Auto</Checkbox>
                    <InputNumber
                        defaultValue={300}
                        min={0}
                        max={1000}
                        step={50}
                        onChange={heightChange}
                    />
                </div>
            </div>
        </Drawer>
    );
}