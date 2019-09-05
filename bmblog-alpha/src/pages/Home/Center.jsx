import React from 'react';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Paragraph } = Typography;

export default function(props) {
    const { activePost: { slug, preview, backview, title, category, excerpt }, postsCount, currentNumber, anim, parallax } = props.data;

    const stylePreview = { backgroundImage: `url(${preview.fullPath})`, transform: `translate(${parallax.mid.x}px, ${parallax.mid.y}px)` };
    const styleBackview = { backgroundImage: `url(${backview.fullPath})`, transform: `translate(${parallax.slow.x}px, ${parallax.slow.y}px)` };
    const styleText = { transform: `translate(${parallax.fast.x}px, ${parallax.fast.y}px)` }

    return (
        <div className={`center ${anim}`}>
                <div className="preview" style={stylePreview}></div>
                <div className="backview" style={styleBackview}></div>
                <div className="text" style={styleText}>
                    <div className="title-wrapper">
                        <div className="category"><h3>{category}</h3></div>   
                        <div className="title"><h1>{title}</h1></div>
                    </div>
                    <div className="num"><h3><span>{currentNumber}</span> / {postsCount}</h3></div>
                    <div className="excerpt">    
                        <Paragraph ellipsis={{ rows: 4, expandable: false }}>
                            {excerpt}
                        </Paragraph></div>
                    <div className="btn"><span><Link Link to={`/post/${slug}`}>далі</Link></span></div>
                </div>
        </div>
    );
}