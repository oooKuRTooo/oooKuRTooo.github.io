import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, Input, Switch, Slider, Radio, InputNumber, Checkbox } from 'antd';
import UploadImage from '../../components/Uploads/UploadImage';

export default function(props) {

    const { visible, close, save, data, onSave } = props;

    console.log(data);

    console.log(props);

    const justifyChange = e => {
        save({
            justifyClass: e.target.value
        });
    }

    const widthChange = e => {
        save({
            imgWidthClass: e.target.value
        });
    }

    const paddingTopChange = value => {
        save({
            padding: value
        });
    }

    const assetSave = asset => {
        save({
            asset: asset
        });
    }

    const closeDrawer = () => {
        onSave();
        close();
    }

    const heightChange = e => {
        save({
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
                    <Radio.Group onChange={justifyChange} defaultValue={data.justifyClass || "justify-center"}>
                        <Radio.Button value="justify-center">Center</Radio.Button>
                        <Radio.Button value="justify-left">Left</Radio.Button>
                        <Radio.Button value="justify-right">Right</Radio.Button>
                    </Radio.Group>
                    <h3>Width</h3>
                    <Radio.Group onChange={widthChange} defaultValue={data.imgWidthClass || "default-width"}>
                        <Radio.Button value="default-width">Default</Radio.Button>
                        <Radio.Button value="full-width">Full Width</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="col">
                    <h3 style={{marginTop: 0}}>Image Path</h3>
                    <UploadImage defaultValue={data && data.asset} save={assetSave}/>
                </div>
                <div className="col">
                    <h3 style={{marginTop: 0}}>Padding (top/bottom)</h3>
                    <InputNumber
                        defaultValue={data.padding}
                        min={0}
                        max={100}
                        step={1}
                        onChange={paddingTopChange}
                    />
                </div>
                <div className="col">
                    <h3 style={{marginTop: 0}}>Height</h3>
                    <Button onClick={()=>{heightChange('auto')}}>Auto</Button>
                    <InputNumber
                        defaultValue={(data.height && (data.height instanceof Number)) || 0}
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