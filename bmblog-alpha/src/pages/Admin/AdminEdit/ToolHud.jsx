import React, { Fragment } from "react";
import { Menu, Dropdown, Button, Icon } from 'antd';
import uniqid from 'uniqid';
import { getBlocks } from '../../../blocks/index';
import { Link } from 'react-router-dom';

export default function(props) {

    const { changeLayer, addBlock, savePost, openSettings, openLayerSettings } = props;

    const blocksList = getBlocks().map(blockInfo => (
        <Menu.Item 
            key={uniqid()} 
            onClick={()=>{addBlock(blockInfo.name)}}>
            <Icon type={blockInfo.icon} />
        </Menu.Item>
    ));

    const blocksMenu = (
        <Menu>
            { blocksList }
        </Menu>
    );

    const layersMenu = (
        <Menu>
          <Menu.Item onClick={ () => {changeLayer(0)} }>
            <span>Layer 1<Icon onClick={openLayerSettings} type="setting" /></span>
          </Menu.Item>
          <Menu.Item onClick={ () => {changeLayer(1)} }>
            <span>Layer 2<Icon onClick={openLayerSettings} type="setting" /></span>
          </Menu.Item>
          <Menu.Item onClick={ () => {changeLayer(2)} }>
            <span>Layer Base<Icon onClick={openLayerSettings} type="setting" /></span>
          </Menu.Item>
        </Menu>
    );
    
    return (
        <Fragment>
            <Dropdown overlay={blocksMenu} placement="topLeft">
                <Button size='large' shape="circle" icon="plus" className='collapse-btn-plus'/>
            </Dropdown>
            <Dropdown overlay={layersMenu} placement="topRight">
                <Button size='large' shape="circle" icon="switcher" className='collapse-btn-layers'/>
            </Dropdown>
            <Button onClick={savePost} size='large' shape="circle" icon="save" className='collapse-btn-save'/>
            <Link Link to="/admin/posts"><Button size='large' shape="circle" icon="logout" className='collapse-btn-exit'/></Link>
            <Button onClick={openSettings} size='large' shape="circle" icon="setting" className='collapse-btn-settings'/>
        </Fragment>
    );
}