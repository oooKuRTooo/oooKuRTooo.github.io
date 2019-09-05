import React, { useState } from "react";
import { Drawer } from 'antd';
import UploadImages from '../../components/Uploads/UploadImages';

export default function(props) {

    const { visible, close, save, initData } = props;

    const assetSave = assets => {
        save({ assets });
    }

    const closeDrawer = () => {
        close();
    }
    
    const uploadInitData = initData.assets.length > 0 ? initData.assets.map(asset => asset.file) : [];

    console.log(uploadInitData);

    
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
                    <h3 style={{marginTop: 0}}>Image Path</h3>
                    <UploadImages initData={uploadInitData} save={assetSave}/>
                </div>
            </div>
        </Drawer>
    );
}