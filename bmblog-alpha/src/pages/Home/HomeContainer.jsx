import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './Home';

class HomeContainer extends Component {

    render() {

        const { posts, style, settings } = this.props;

        const homeProps = {
            data: posts.filter(post=>post.isPublished),
            style,
            settings
        }

        return (
            <Fragment>
                {posts.length > 0 ? <Home {...homeProps}/> : <h2>Потрібні Пости!!!</h2>}
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);