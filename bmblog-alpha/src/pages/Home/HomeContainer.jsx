import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './Home';

class HomeContainer extends Component {

    render() {

        const { posts, style, settings } = this.props;

        console.log(posts);

        return (
            <Fragment>
                {posts.length > 0 ? <Home data={posts} settings={settings} style={style}/> : <h2>Потрібні Пости!!!</h2>}
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