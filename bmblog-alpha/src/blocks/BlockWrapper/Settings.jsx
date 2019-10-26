import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, Input, Switch, Slider, Radio, InputNumber } from 'antd';

export default function(props) {

    const { visible, close, save, setColCount, data } = props;

    const widthChange = e => {
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

    const paddingChange = e => {
        save({
            padding: e
        })
    }

    const widthOffsetChange = e => {
        save({
            widthOffset: e
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
            <div className="blockwr-settings">
                <div className="blockwr-settings-input">
                    <Icon type="ellipsis" />
                    <InputNumber
                        defaultValue={data.columnWidth || 2}
                        min={0}
                        max={6}
                        step={1}
                        onChange={widthChange}
                    />
                </div>
                <div className="blockwr-settings-input">
                    <Icon type="border-horizontal" />
                    <InputNumber
                        defaultValue={data.gutterHeight || 0}
                        min={0}
                        max={100}
                        step={10}
                        onChange={gutterChange}
                    />
                </div>
                <div className="blockwr-settings-input">
                    <Icon type="diff" />
                    <InputNumber
                        defaultValue={data.colCount || 2}
                        min={2}
                        max={6}
                        step={1}
                        onChange={colCountChange}
                    />
                </div>
                <div className="blockwr-settings-input">
                    <Icon type="vertical-align-top" />
                    <InputNumber
                        defaultValue={data.padding || 5}
                        min={0}
                        max={100}
                        step={1}
                        onChange={paddingChange}
                    />
                </div>
                <div className="blockwr-settings-input">
                    <Icon type="column-width" />
                    <InputNumber
                        defaultValue={data.widthOffset || 0}
                        min={-10}
                        max={10}
                        step={1}
                        onChange={widthOffsetChange}
                    />
                </div>
            </div>
        </Drawer>
    );
}