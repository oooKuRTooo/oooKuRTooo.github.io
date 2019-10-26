import React from 'react';
import { Upload, Icon, message, Button } from 'antd';
import { getAssets, addAsset } from '../../plugins/cockpitRequests';
import { CMS_URL, QUEST_TOKEN, SITE_URL } from '../../constants';
import AssetsList from './AssetsList';
import { Modal } from 'antd';
import uniqid from 'uniqid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UploadImages extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: this.props.initData || [],
        assetsVisible: false,
        assets: [],
        token: this.props.token || QUEST_TOKEN
    };

    handleChange = ({ fileList }) => {
        this.setState({ fileList });
    };

    async onChange (res) {
        if (!res) return;
        console.log('save');
        let response = await fetch(res.fullPath, {mode: "no-cors"});
        let data = await response.blob();
        let metadata = {
            type: 'image/jpeg'
        };
        let file = new File([data], "test.jpg", metadata);
        file.uid = uniqid();
        file.isAsset = true;
        file.asset = res;
        file.thumbUrl = res.fullPath;
        this.setState({ fileList: [ ...this.state.fileList, file ] });
    }

    async save() {
        const formData = new FormData;

        let result = this.state.fileList.filter( file => !file.isAsset).map( file => {
            formData.append("files[]", file.originFileObj);
            return { file };
        });

        const resultsResponse = await addAsset(CMS_URL, this.state.token, formData);

        resultsResponse.assets.map( (item, index) => {
            result[index] = { 
                ...result[index],
                path: `/cockpit/storage/uploads${item.path}`,
                fullPath: `${SITE_URL}/cockpit/storage/uploads${item.path}`
            }
        });

        const resultAssets = this.state.fileList.filter( file => file.isAsset).map( file => {
            return { ...file.asset, file };
        });

        this.props.save([...result, ...resultAssets]);

        this.setState({
            fileList: []
        });

        resultAssets.forEach(item => this.onChange(item));
        result.forEach(item => this.onChange(item));
    }

    openAssets = () => {
        getAssets(CMS_URL, QUEST_TOKEN).then(obj=>{
            this.setState({
                assets: obj.assets,
                assetsVisible: true
            });
        });
    }

    render() {

        const { previewVisible, previewImage, fileList, assetsVisible, assets } = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        const assetsListProps = {
            assets: assets,
            visible: assetsVisible,
            close: ()=>this.setState({ assetsVisible: false }),
            onChange: this.onChange.bind(this)
        }

        return (
            <div className='upload-images' style={{display: 'flex'}}> 
                <Button onClick={this.openAssets}>Get from lib</Button>
                <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={this.handleChange}
                onPreview={console.log}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                <AssetsList {...assetsListProps}/>
                <Button onClick={this.save.bind(this)}>Save</Button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImages);