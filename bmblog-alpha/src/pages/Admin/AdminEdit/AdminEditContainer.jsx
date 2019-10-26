import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AdminEdit from './AdminEdit';
import { addCollectionItem } from '../../../plugins/cockpitRequests';
import { CMS_URL, QUEST_TOKEN } from '../../../constants';
import { updatePosts } from '../../../store/global/actions'


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

    savePost = (data, callback) => {
        addCollectionItem(CMS_URL, this.props.token, 'posts', data).then(callback || null);
    }

    updatePost = slug => {
        this.props.updatePosts(()=>this.props.history.push(`/admin/edit/${slug}`));
    }

    render() {
        const { post, isReady } = this.state;

        return (
            <Fragment>
                { isReady && this.props.isAuth ? <AdminEdit data={post} savePost={this.savePost} updatePost={this.updatePost} /> : null}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.global.posts,
        isAuth: state.admin.isAuth,
        token: state.admin.token
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        updatePosts: bindActionCreators(updatePosts, dispath)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditContainer);