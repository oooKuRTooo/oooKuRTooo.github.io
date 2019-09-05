import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initApp } from './store/global/actions';
import Preloader from './components/Preloader';
import './App.scss';
import App from './App';

class AppContainer extends Component {

    componentDidMount() {
        this.props.init();
    }

    render() {

        const { isReady } = this.props;

        return (
            <Fragment>
                { isReady ? <App/> : <Preloader/> }
            </Fragment> 
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isReady: state.global.isReady
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        init: bindActionCreators(initApp, dispath),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);