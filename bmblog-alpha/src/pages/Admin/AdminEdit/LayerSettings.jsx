import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, Input, Switch, Slider } from 'antd';

export default function(props) {

    const style = {
        height: 100,
    };

    const { visible, close, save } = props;

    const saveOpacity = e => {
        save({
            opacity: e
        });
    }

    const saveSpeed = e => {
        save({
            speed: e
        });
    }
    
    return (
        <Drawer
            title="Layer Settings"
            placement="bottom"
            closable={false}
            onClose={close}
            visible={visible}
        >
            <div className="layer-settings">
                <div className="layer-settings-slider">
                    <Icon type="eye" />
                    <Slider 
                        onChange={saveOpacity} 
                        vertical 
                        defaultValue={100}
                        min={0}
                        max={1}
                        step={0.1} />
                </div>
                <div className="layer-settings-slider">
                    <Icon type="dashboard" />
                    <Slider 
                        onChange={saveSpeed} 
                        vertical 
                        defaultValue={0}
                        min={0.01}
                        max={0.1}
                        step={0.01} />
                </div>
            </div>
        </Drawer>
    );
}