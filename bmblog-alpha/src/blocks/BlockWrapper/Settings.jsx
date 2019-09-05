import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, Input, Switch, Slider, Radio, InputNumber } from 'antd';

export default function(props) {

    const { visible, close, save, setColCount } = props;

    const widthChange = e => {
        console.log(e);
        save({
            columnWidth: e
        });
    }

    const gutterChange = e => {
        console.log(e);
        save({
            gutterWidth: e,
            gutterHeight: e
        });
    }

    const colCountChange = e => {
        setColCount(e);
    }
    
    return (
        <Drawer
          title="Basic Drawer"
          placement="bottom"
          closable={false}
          onClose={close}
          visible={visible}
        >
            <div className="blockwr-settings">
                <div className="blockwr-settings-input">
                    <Icon type="column-width" />
                    <InputNumber
                        defaultValue={600}
                        min={0}
                        max={1000}
                        step={100}
                        onChange={widthChange}
                    />
                </div>
                <div className="blockwr-settings-input">
                    <Icon type="border-horizontal" />
                    <InputNumber
                        defaultValue={0}
                        min={0}
                        max={100}
                        step={10}
                        onChange={gutterChange}
                    />
                </div>
                <div className="blockwr-settings-input">
                    <Icon type="diff" />
                    <InputNumber
                        defaultValue={0}
                        min={2}
                        max={6}
                        step={1}
                        onChange={colCountChange}
                    />
                </div>
            </div>
        </Drawer>
    );
}