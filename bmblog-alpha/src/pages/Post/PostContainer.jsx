import React, { Component } from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import { Transition } from 'react-spring/renderprops';

class PostContainer extends Component {

    state = {
        post: null,
        isReady: false 
    }

    componentDidMount() {

        const { posts } = this.props;
        const { slug } = this.props.match.params;
        let nextPost = posts[0];
        const post = posts.find((post, index) => { if (post.slug === slug) {
                nextPost = posts[index + 1] ||  posts[0];
                return true
            } 
        });
        
        if (post) this.setState({ post, nextPost, isReady: true });
    }

    render() {
        const { post, isReady, nextPost } = this.state;

        return (
            <Transition
                items={isReady}
                from={{ position: 'absolute', opacity: 0 }}
                enter={{ opacity: 1 }}
                leave={{ opacity: 0 }}>
                {isReady =>
                    isReady
                    ? props => <Post style={props} data={{ post, nextPost }} settings={this.props.settings} />
                    : props => <div style={props}>🤪</div>
                }
            </Transition>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.global.posts,
        settings: state.global.settings
    }
}

const mapDispatchToProps = (dispath) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer);