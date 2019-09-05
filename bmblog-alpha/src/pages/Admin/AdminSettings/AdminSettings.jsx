import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCollectionItem } from '../../../plugins/cockpitRequests';
import { CMS_URL, QUEST_TOKEN } from '../../../constants';
import { Input, Button } from 'antd';


class AdminSettings extends Component {

    state = this.props.settings;

    onSave = () => {
        addCollectionItem(CMS_URL, QUEST_TOKEN, 'settings', this.state).then(console.log);
    }

    onChangeSiteName = e => {
        this.setState({ siteName: e.currentTarget.value });
    }

    onChangeFacebook = e => {
        const socials = { ...this.state.socials, facebook: "http://" + e.currentTarget.value }
        this.setState({ socials });
    }
    onChangeTwitter = e => {
        const socials = { ...this.state.socials, twitter: "http://" + e.currentTarget.value }
        this.setState({ socials });
    }
    onChangeInstagram = e => {
        const socials = { ...this.state.socials, instagram: "http://" + e.currentTarget.value }
        this.setState({ socials });
    }
    onChangeYoutube = e => {
        const socials = { ...this.state.socials, youtube: "http://" + e.currentTarget.value }
        this.setState({ socials });
    }

    render() {

        console.log(this.state);

        return (
            <Fragment>
                <h3>Site name</h3>
                <Input defaultValue={this.state.siteName} onChange={this.onChangeSiteName} placeholder="Site name" />
                <h3>facebook url</h3>
                <Input defaultValue={this.state.socials.facebook.replace('http://','')} onChange={this.onChangeFacebook} addonBefore="Http://" placeholder="facebook" />
                <h3>twitter url</h3>
                <Input defaultValue={this.state.socials.twitter.replace('http://','')} onChange={this.onChangeTwitter} addonBefore="Http://" placeholder="twitter" />
                <h3>instagram url</h3>
                <Input defaultValue={this.state.socials.instagram.replace('http://','')} onChange={this.onChangeInstagram} addonBefore="Http://" placeholder="instagram" />
                <h3>youtube url</h3>
                <Input defaultValue={this.state.socials.youtube.replace('http://','')} onChange={this.onChangeYoutube} addonBefore="Http://" placeholder="youtube" />
                <Button className='admin-settings-item' onClick={this.onSave}>Save</Button>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        settings: state.global.settings
    }
}

const mapDispatchToProps = (dispath) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSettings);