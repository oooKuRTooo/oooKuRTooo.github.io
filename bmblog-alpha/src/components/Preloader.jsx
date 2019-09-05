import React from 'react';
import './preloader.scss';
import { Icon } from 'antd';
export default function() {
    return (
        <div className="preloader">
            <Icon type="loading" style={{ fontSize: 24 }} spin />
        </div>
    );
}