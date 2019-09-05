import React from 'react';
import './cursor-progress.scss';

export default function(props) {
    return (    <svg class="progress-ring" width='60px' height="60px">
                    <circle class='progress-ring__circle' stroke="black" stroke-width="4px" cx="30px" cy="30px" r="21px" fill="transparent"></circle>
                </svg>
    );
}