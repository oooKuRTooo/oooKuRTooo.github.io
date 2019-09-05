import React, { useState } from "react";
import { Menu, Dropdown, Button, Icon, Drawer, Input, Switch } from 'antd';
import uniqid from 'uniqid';
import { getBlocks } from '../../../blocks/index';
import { Link } from 'react-router-dom';
import UploadImage from '../../../components/Uploads/UploadImage';

const { TextArea } = Input;

export default function(props) {

    const { visible, close, initData } = props;

    const previewSave = asset => {
        props.save({
            preview: asset
        });
    }

    const backviewSave = asset => {
        props.save({
            backview: asset
        });
    }

    const titleSave = e => {
        props.save({
            title: e.target.value
        });
    }

    const categorySave = e => {
        props.save({
            category: e.target.value
        });
    }

    const excerptSave = e => {
        props.save({
            excerpt: e.target.value
        });
    }

    const publishedSave = e => {
        props.save({
            isPublished: e
        });
    }
    return (
        <Drawer
          title="Post Settings"
          placement="right"
          closable={false}
          onClose={close}
          visible={visible}
        >
            Published <Switch onChange={publishedSave} defaultChecked={initData.isPublished} className='settings-item'/>
            <Input defaultValue={initData.title} onChange={titleSave} placeholder="Title" className='settings-item' />
            <Input defaultValue={initData.category} onChange={categorySave} placeholder="Category" className='settings-item' />
            <TextArea defaultValue={initData.excerpt} onChange={excerptSave} rows={4} placeholder="Excerpt" className='settings-item'/>
            <h3>Preview</h3>
            <UploadImage defaultValue={initData.preview} save={previewSave}/>
            <h3>Backview</h3>
            <UploadImage defaultValue={initData.backview} save={backviewSave}/>
        </Drawer>
    );
}