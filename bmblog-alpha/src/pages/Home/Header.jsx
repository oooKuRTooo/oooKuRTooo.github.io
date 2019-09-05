import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function(props) {

    const [toggle, setToggle] = useState(false);

    const classLi = toggle ? 'active' : '';

    const { siteName, socials: { facebook, twitter, youtube, instagram }} = props.data;

    return (
        <div className="header">
            <div className="nav">
                <ul>
                    <li onClick={()=>{setToggle(!toggle)}}>socials</li>
                    <li className={classLi}><a href={facebook}>facebook</a></li>
                    <li className={classLi}><a href={twitter}>twitter</a></li>
                    <li className={classLi}><a href={youtube}>facebook</a></li>
                    <li className={classLi}><a href={instagram}>twitter</a></li>
                </ul>
            </div>
            <div className="logo"><Link Link to='/'>{siteName}</Link></div>
        </div>
    );
}