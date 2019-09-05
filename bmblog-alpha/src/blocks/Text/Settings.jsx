import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, Input, Switch, Slider, Radio } from 'antd';

export default function(props) {

    const style = {
        height: 100
    };

    const { visible, close } = props;

    const justifyChange = e => {
        props.save({
            justifyClass: e.target.value
        });
    }
    
    return (
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          closable={false}
          onClose={close}
          visible={visible}
        >
            <Radio.Group onChange={justifyChange} defaultValue="a">
                <Radio.Button value="justify-center">Center</Radio.Button>
                <Radio.Button value="justify-left">Left</Radio.Button>
                <Radio.Button value="justify-right">Right</Radio.Button>
                <Radio.Button value="justify-full">Full</Radio.Button>
            </Radio.Group>
        </Drawer>
    );
}