import React from "react";
import { Drawer, InputNumber } from 'antd';
import UploadImages from '../../components/Uploads/UploadImages';

export default function(props) {

    const { visible, close, save, initData } = props;

    const assetSave = assets => {
        save({ assets });
    }

    const closeDrawer = () => {
        close();
    }

    const paddingTopChange = value => {
        save({
            padding: `${value}vh 0`
        });
    }
    const uploadInitData = initData.assets.length > 0 ? initData.assets.map(asset => asset.file) : [];
    
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
                <div className="col">
                    <h3 style={{marginTop: 0}}>Padding (top/bottom)</h3>
                    <InputNumber
                        defaultValue={5}
                        min={0}
                        max={100}
                        step={1}
                        onChange={paddingTopChange}
                    />
                </div>
            </div>
        </Drawer>
    );
}