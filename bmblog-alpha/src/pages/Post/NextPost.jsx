import React from 'react';
import { Link } from 'react-router-dom';

export default function(props) {

    const { title, category, preview, slug } = props;

    const wrapperStyle = {
        backgroundImage: `url(${preview.fullPath})`
    }

    return (
        <Link to={`/post/${slug}`}>
            <div className="next-post" style={wrapperStyle}>
                <div className="category">{category}</div>
                <div className="title">{title}</div>
            </div>
        </Link>
    );
}