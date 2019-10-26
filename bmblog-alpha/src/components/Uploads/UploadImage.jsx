import React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { getAssets, addAsset } from '../../plugins/cockpitRequests';
import { CMS_URL, QUEST_TOKEN, SITE_URL } from '../../constants';
import AssetsList from './AssetsList';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    return isJpgOrPng;
}

class UploadImage extends React.Component {

    state = {
        loading: false,
        assetsVisible: false,
        assets: [],
        imageUrl: this.props.defaultValue.fullPath || '',
        token: this.props.token || QUEST_TOKEN
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            const formData = new FormData;
            formData.append("files[]", info.file.originFileObj);
            addAsset(CMS_URL, this.state.token, formData).then(res => {
                const asset = { 
                    path: `/cockpit/storage/uploads${res.assets[0].path}`,
                    fullPath: `${SITE_URL}/cockpit/storage/uploads${res.assets[0].path}`
                };
                this.setState({ loading: false, imageUrl: asset.fullPath });
                this.props.save(asset);
            });
        }
    };

    openAssets = () => {
        getAssets(CMS_URL, QUEST_TOKEN).then(obj=>{
            this.setState({
                assets: obj.assets,
                assetsVisible: true
            });
            console.log('here');
            console.log(obj);
        });
    }

    onChange = res => {
        this.setState({
            imageUrl: res.fullPath
        });
        this.props.save(res);
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl, assetsVisible, assets } = this.state;

        const assetsListProps = {
            assets: assets,
            visible: assetsVisible,
            close: ()=>this.setState({ assetsVisible: false }),
            onChange: this.onChange
        }
        
        return (
            <>
                <Button onClick={this.openAssets}>Get from lib</Button>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <AssetsList {...assetsListProps}/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.admin.token
    }
}

const mapDispatchToProps = (dispath) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);