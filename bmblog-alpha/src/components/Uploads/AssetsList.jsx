import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import uniqid from 'uniqid';
import { SITE_URL } from '../../constants';

export default function(props) {

    const onClick = itemsPath => {
        props.onChange({ 
            path: `/cockpit/storage/uploads${itemsPath}`,
            fullPath: `${SITE_URL}/cockpit/storage/uploads${itemsPath}`
        });
    }

    const list = props.assets.map( item => <img onClick={()=>onClick(item.path)} style={{width: '100px'}} key={uniqid()} src={`${SITE_URL}/cockpit/storage/uploads${item.path}`}/>);

    return (
        <Modal
            title="Basic Modal"
            visible={props.visible}
            onOk={props.close}
            onCancel={props.close}
        >
            {list}
        </Modal>);
}
