import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminEdit from './AdminEdit';
import { addCollectionItem } from '../../../plugins/cockpitRequests';
import { CMS_URL, QUEST_TOKEN } from '../../../constants';


class AdminEditContainer extends Component {

    state = {
        post: null,
        isReady: false 
    }

    componentDidMount() {

        const { posts } = this.props;
        const { slug } = this.props.match.params;
        const post = posts.find(post => post.slug === slug);
        
        if (post) this.setState({ post });

        this.setState({ isReady: true });
    }

    savePost = data => {
        addCollectionItem(CMS_URL, QUEST_TOKEN, 'posts', data);
    }

    updatePost = slug => {
        this.props.history.push(`/admin/edit/${slug}`);
    }

    render() {
        const { post, isReady } = this.state;

        return (
            <Fragment>
                { isReady ? <AdminEdit data={post} savePost={this.savePost} updatePost={this.updatePost} /> : null}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.global.posts
    }
}

const mapDispatchToProps = (dispath) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditContainer);