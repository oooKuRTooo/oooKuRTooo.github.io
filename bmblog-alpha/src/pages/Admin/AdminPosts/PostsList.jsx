import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drop from './Drop';
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './admin-posts.scss';
import { deleteCollectionItem } from '../../../plugins/cockpitRequests';
import { CMS_URL, QUEST_TOKEN } from '../../../constants';
import { updatePosts } from '../../../store/global/actions';


// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

class PostsList extends Component {

    state = {
        posts: this.props.posts,
        token: this.props.token || QUEST_TOKEN
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.posts !== this.state.posts) {
          this.setState({ posts: nextProps.posts });
        }
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const posts = reorder(
            this.state.posts,
            result.source.index,
            result.destination.index
        );

        this.setState({ posts });
    }

    removePost = id => {
        deleteCollectionItem(CMS_URL, this.state.token, 'posts', id).then(()=>{
            this.props.updatePosts();
        });
    }

    render() {

        return (
            <div className="posts-list">
                <div className="btns">
                    <Link Link to="/admin/edit/new"><Button type="primary">Add Post</Button></Link>
                    <Button type="primary" disabled={true}>Save</Button>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Drop items={this.state.posts} remove={this.removePost}/>
                </DragDropContext>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.global.posts,
        token: state.admin.token
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        updatePosts: bindActionCreators(updatePosts, dispath),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);