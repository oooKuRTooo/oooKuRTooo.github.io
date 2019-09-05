import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Admin from './Admin';
import Auth from './Auth';
import { auth } from '../../store/admin/actions';

class AdminContainer extends Component {

    render() {

        const { auth, admin: { isAuth }, page } = this.props;

        return (
            <Fragment>
                { isAuth ? <Admin page={page} /> : <Auth authorize={auth}/>}
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        admin: state.admin
    }
}

const mapDispatchToProps = (dispath) => {
    return {
        auth: bindActionCreators(auth, dispath),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);