import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, InputNumber, Switch, Slider, Radio } from 'antd';

export default function(props) {

    const style = {
        height: 100
    };

    const { visible, close, data } = props;

    const justifyChange = e => {
        props.save({
            justifyClass: e.target.value
        });
    }


    const paddingTopChange = e => {
        props.save({
            padding: e
        })
    }
    
    return (
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          closable={false}
          onClose={close}
          visible={visible}
        >
            <Radio.Group onChange={justifyChange} defaultValue={data.justifyClass || "justify-center"}>
                <Radio.Button value="justify-center">Center</Radio.Button>
                <Radio.Button value="justify-left">Left</Radio.Button>
                <Radio.Button value="justify-right">Right</Radio.Button>
                <Radio.Button value="justify-full">Full</Radio.Button>
            </Radio.Group>
            <div className="blockwr-settings-input">
                <Icon type="vertical-align-top" />
                <InputNumber
                    defaultValue={data.padding || 5}
                    min={0}
                    max={100}
                    step={1}
                    onChange={paddingTopChange}
                />
            </div>
        </Drawer>
    );
}