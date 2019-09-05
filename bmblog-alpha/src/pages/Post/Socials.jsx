import React from 'react';
import { SocialIcon } from 'react-social-icons';

export default function(props) {

    return (
        <div className="post-socials">
            <SocialIcon url={props.data.facebook} />
            <SocialIcon url={props.data.twitter} />
            <SocialIcon url={props.data.instagram} />
            <SocialIcon url={props.data.youtube} />
        </div>
    );
}