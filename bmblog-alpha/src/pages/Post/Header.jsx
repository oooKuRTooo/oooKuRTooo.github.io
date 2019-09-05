import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {

    return (
        <div className="header">
            <div className="logo"><Link Link to='/'>{props.data.siteName}</Link></div>
        </div>
    );
}